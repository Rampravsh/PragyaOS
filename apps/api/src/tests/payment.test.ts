import { describe, it, expect, vi, beforeEach } from "vitest";
import crypto from "crypto";
import { OrderStatus, PaymentStatus, WebhookEventStatus, PaymentGateway } from "@prisma/client";

// Mock prisma and BullMQ queues
vi.mock("../database/client", () => {
  const mockPrisma: any = {
    order: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    paymentAttempt: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    webhookEvent: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    $transaction: vi.fn(),
  };
  return { prisma: mockPrisma };
});

vi.mock("bullmq", () => {
  class MockQueue {
    public add = vi.fn().mockResolvedValue({ id: "mock-job-id" });
  }
  class MockWorker {
    public on = vi.fn();
    public close = vi.fn().mockResolvedValue(undefined);
  }
  return {
    Queue: MockQueue,
    Worker: MockWorker,
  };
});

vi.mock("../lib/redis", () => {
  const mockRedis = {
    get: vi.fn(),
    set: vi.fn(),
    setNX: vi.fn(),
    del: vi.fn(),
  };
  return {
    redisClient: mockRedis,
    default: mockRedis,
  };
});

import { prisma } from "../database/client";
import { redisClient } from "../lib/redis";
import { paymentService } from "../modules/commerce/payment/payment.service";
import { paymentEvents } from "../modules/commerce/payment/payment.events";
import { webhookVerifier, webhookParser, webhookDispatcher } from "../modules/commerce/payment/payment.webhook";
import { paymentIdempotencyService } from "../modules/commerce/payment/payment-idempotency.service";
import { webhookEventRepository } from "../modules/commerce/payment/webhook-event.repository";
import { enrollmentQueue, invoiceQueue, notificationQueue, analyticsQueue } from "../modules/commerce/fulfillment";

describe("Payment Processing Platform tests", () => {
  const webhookSecret = "rzp_test_placeholder_webhook_secret";

  beforeEach(() => {
    vi.clearAllMocks();
    (prisma.$transaction as any).mockImplementation(async (fn: any) => fn(prisma));
  });

  // =========================================================================
  // Webhook Signature Verification
  // =========================================================================
  describe("WebhookVerifier", () => {
    it("should successfully verify a valid HMAC signature", () => {
      const rawBody = JSON.stringify({ event: "payment.captured", id: "evt_123" });
      const signature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      const result = webhookVerifier.verifySignature(rawBody, signature, webhookSecret);
      expect(result).toBe(true);
    });

    it("should fail validation for incorrect signature", () => {
      const rawBody = JSON.stringify({ event: "payment.captured", id: "evt_123" });
      const result = webhookVerifier.verifySignature(rawBody, "wrong_signature", webhookSecret);
      expect(result).toBe(false);
    });

    it("should reject expired webhook events (replay attack protection)", () => {
      const pastTimestamp = Math.floor(Date.now() / 1000) - 400; // 400 seconds ago (> 300)
      expect(() => webhookVerifier.validateTimestamp(pastTimestamp)).toThrow(
        "Webhook payload expired"
      );
    });

    it("should accept valid webhook events (within 300s window)", () => {
      const recentTimestamp = Math.floor(Date.now() / 1000) - 50; // 50 seconds ago
      expect(() => webhookVerifier.validateTimestamp(recentTimestamp)).not.toThrow();
    });
  });

  // =========================================================================
  // Payment Idempotency Service
  // =========================================================================
  describe("PaymentIdempotencyService", () => {
    it("should acquire lock when key is new in Redis", async () => {
      (redisClient.setNX as any).mockResolvedValue(true);
      const locked = await paymentIdempotencyService.acquireLock("lock_key", 100);
      expect(locked).toBe(true);
      expect(redisClient.setNX).toHaveBeenCalledWith("lock_key", "locked", 100);
    });

    it("should return false when lock already exists", async () => {
      (redisClient.setNX as any).mockResolvedValue(false);
      const locked = await paymentIdempotencyService.acquireLock("lock_key", 100);
      expect(locked).toBe(false);
    });

    it("should identify processed events", async () => {
      (redisClient.get as any).mockResolvedValue("processed");
      const hasProcessed = await paymentIdempotencyService.hasProcessed("lock_key");
      expect(hasProcessed).toBe(true);
    });
  });

  // =========================================================================
  // Payment State Machine & Centralized Transitions
  // =========================================================================
  describe("Payment State Machine", () => {
    it("should allow transition from PENDING to CAPTURED", async () => {
      const attempt = {
        id: "att_123",
        orderId: "ord_123",
        status: PaymentStatus.PENDING,
        amount: 5000,
        gateway: PaymentGateway.RAZORPAY,
      };

      (prisma.paymentAttempt.findUnique as any).mockResolvedValue(attempt);
      (prisma.paymentAttempt.update as any).mockResolvedValue({
        ...attempt,
        status: PaymentStatus.SUCCESS,
      });

      const spy = vi.spyOn(paymentEvents, "emitPaymentCaptured");

      const result = await paymentService.transitionPaymentAttempt(
        "att_123",
        "CAPTURED",
        "pay_gateway_123"
      );

      expect(result.status).toBe(PaymentStatus.SUCCESS);
      expect(spy).toHaveBeenCalled();
    });

    it("should reject invalid transition (e.g. FAILED directly to CAPTURED)", async () => {
      const attempt = {
        id: "att_123",
        orderId: "ord_123",
        status: PaymentStatus.FAILED,
        amount: 5000,
        gateway: PaymentGateway.RAZORPAY,
      };

      (prisma.paymentAttempt.findUnique as any).mockResolvedValue(attempt);

      await expect(
        paymentService.transitionPaymentAttempt("att_123", "CAPTURED")
      ).rejects.toThrow("Invalid state transition");
    });
  });

  // =========================================================================
  // Webhook Dispatcher & Persistence
  // =========================================================================
  describe("WebhookDispatcher", () => {
    it("should store webhook payload, check lock, and dispatch job on success", async () => {
      const rawBody = JSON.stringify({
        id: "evt_999",
        event: "payment.captured",
        created_at: Math.floor(Date.now() / 1000),
        payload: {
          payment: {
            entity: {
              id: "pay_999",
              order_id: "order_999",
              amount: 5000,
              currency: "INR",
              status: "captured",
            },
          },
        },
      });

      const signature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      (redisClient.get as any).mockResolvedValue(null);
      (redisClient.setNX as any).mockResolvedValue(true);
      const repoCreateSpy = vi.spyOn(webhookEventRepository, "create").mockResolvedValue({} as any);

      // Webhook dispatch
      await webhookDispatcher.dispatch(rawBody, signature, JSON.parse(rawBody));

      expect(repoCreateSpy).toHaveBeenCalled();
      expect(redisClient.setNX).toHaveBeenCalledWith("webhook:idempotency:evt_999", "locked", 3600);
      expect(enrollmentQueue.add).not.toHaveBeenCalled(); // Webhook parser doesn't grant enrollments, it only enqueues work
    });
  });
});
