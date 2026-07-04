import { describe, it, expect, vi, beforeEach } from "vitest";
import { OrderStatus, PaymentStatus, FulfillmentStatus, EnrollmentStatus, ProductStatus } from "@prisma/client";
import { randomUUID } from "crypto";

// ---------------------------------------------------------------------------
// Hoisted mock definitions
// ---------------------------------------------------------------------------
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
    fulfillmentExecution: {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    enrollment: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    invoice: {
      findUnique: vi.fn(),
      create: vi.fn(),
      count: vi.fn().mockResolvedValue(0),
    },
    user: {
      findUnique: vi.fn(),
    },
    course: {
      findUnique: vi.fn(),
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

vi.mock("../modules/mail/mail.service", () => {
  const mockMail = {
    send: vi.fn().mockResolvedValue(undefined),
  };
  return {
    mailService: mockMail,
    default: mockMail,
  };
});

import { prisma } from "../database/client";
import { redisClient } from "../lib/redis";
import { mailService } from "../modules/mail/mail.service";
import { enrollmentRepo } from "../modules/learning-engine/learning-engine.repository";
import { invoiceRepository } from "../modules/commerce/invoice.repository";
import { fulfillmentOrchestrator } from "../modules/commerce/fulfillment/fulfillment.orchestrator";
import { fulfillmentService } from "../modules/commerce/fulfillment/fulfillment.service";
import { paymentIdempotencyService } from "../modules/commerce/payment/payment-idempotency.service";

describe("Fulfillment Platform tests", () => {
  const orderId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
  const paymentAttemptId = "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb";
  const userId = "cccccccc-cccc-cccc-cccc-cccccccccccc";
  const courseId = "dddddddd-dddd-dddd-dddd-dddddddddddd";
  const correlationId = "corr-123456";

  beforeEach(() => {
    vi.clearAllMocks();
    (prisma.$transaction as any).mockImplementation(async (fn: any) => fn(prisma));
  });

  // =========================================================================
  // Idempotency & Orchestrator Validation
  // =========================================================================
  describe("FulfillmentOrchestrator", () => {
    it("should reject orchestrating if order is not in PAID state", async () => {
      const mockOrder = { id: orderId, status: OrderStatus.CREATED };
      const mockAttempt = { id: paymentAttemptId, status: PaymentStatus.SUCCESS };

      (prisma.order.findUnique as any).mockResolvedValue(mockOrder);
      (prisma.paymentAttempt.findUnique as any).mockResolvedValue(mockAttempt);

      const spy = vi.spyOn(redisClient, "setNX");
      await fulfillmentOrchestrator.handlePaymentCaptured({
        paymentAttemptId,
        orderId,
        gatewayPaymentId: "pay_xyz",
        amount: 5000,
        correlationId,
      });

      // Shuts down immediately, lock is not acquired
      expect(spy).not.toHaveBeenCalled();
    });

    it("should acquire lock and create execution record on valid event", async () => {
      const mockOrder = { id: orderId, status: OrderStatus.PAID, userId, items: [] };
      const mockAttempt = { id: paymentAttemptId, status: PaymentStatus.SUCCESS };

      (prisma.order.findUnique as any).mockResolvedValue(mockOrder);
      (prisma.paymentAttempt.findUnique as any).mockResolvedValue(mockAttempt);
      (redisClient.get as any).mockResolvedValue(null);
      (redisClient.setNX as any).mockResolvedValue(true);

      const dbCreateSpy = vi.spyOn(prisma.fulfillmentExecution, "create").mockResolvedValue({} as any);

      await fulfillmentOrchestrator.handlePaymentCaptured({
        paymentAttemptId,
        orderId,
        gatewayPaymentId: "pay_xyz",
        amount: 5000,
        correlationId,
      });

      expect(dbCreateSpy).toHaveBeenCalled();
      expect(redisClient.setNX).toHaveBeenCalledWith(`fulfillment:lock:${orderId}`, "locked", 3600);
    });

    it("should prevent duplicate fulfillment if lock is already marked processed", async () => {
      const mockOrder = { id: orderId, status: OrderStatus.PAID, userId };
      const mockAttempt = { id: paymentAttemptId, status: PaymentStatus.SUCCESS };

      (prisma.order.findUnique as any).mockResolvedValue(mockOrder);
      (prisma.paymentAttempt.findUnique as any).mockResolvedValue(mockAttempt);
      (redisClient.get as any).mockResolvedValue("processed");

      const spy = vi.spyOn(redisClient, "setNX");

      await fulfillmentOrchestrator.handlePaymentCaptured({
        paymentAttemptId,
        orderId,
        gatewayPaymentId: "pay_xyz",
        amount: 5000,
        correlationId,
      });

      expect(spy).not.toHaveBeenCalled(); // Skipped
    });
  });

  // =========================================================================
  // Compensation Rollback Logic
  // =========================================================================
  describe("FulfillmentService Compensation", () => {
    it("should roll back enrollment by setting state to CANCELLED", async () => {
      const enrollment = { id: "enr_123", userId, courseId, status: EnrollmentStatus.ACTIVE };
      vi.spyOn(enrollmentRepo, "findByUserAndCourse").mockResolvedValue(enrollment as any);
      const updateSpy = vi.spyOn(enrollmentRepo, "update").mockResolvedValue({} as any);

      await fulfillmentService.rollbackEnrollment(userId, courseId);

      expect(updateSpy).toHaveBeenCalledWith("enr_123", { status: "CANCELLED" });
    });

    it("should delete generated draft invoices on invoice rollback", async () => {
      const invoice = { id: "inv_123", orderId, invoiceNumber: "INV-001" };
      vi.spyOn(invoiceRepository, "findByOrderId").mockResolvedValue(invoice as any);
      const deleteSpy = vi.spyOn(invoiceRepository, "delete").mockResolvedValue({} as any);

      await fulfillmentService.rollbackInvoice(orderId);

      expect(deleteSpy).toHaveBeenCalledWith("inv_123");
    });
  });

  // =========================================================================
  // DLQ & State machine updates
  // =========================================================================
  describe("FulfillmentStateTransitions", () => {
    it("should update step and status to STARTED on startFulfillment", async () => {
      const exec = { id: "exec_123", orderId, status: FulfillmentStatus.PENDING };
      (prisma.fulfillmentExecution.findFirst as any).mockResolvedValue(exec);
      const updateSpy = vi.spyOn(prisma.fulfillmentExecution, "update").mockResolvedValue({} as any);

      await fulfillmentService.startFulfillment(orderId, "ENROLLMENT");

      expect(updateSpy).toHaveBeenCalledWith({
        where: { id: "exec_123" },
        data: {
          status: FulfillmentStatus.STARTED,
          currentStep: "ENROLLMENT",
        },
      });
    });

    it("should record DLQ state with failure message on moveToDeadLetter", async () => {
      const exec = { id: "exec_123", orderId, status: FulfillmentStatus.STARTED };
      (prisma.fulfillmentExecution.findFirst as any).mockResolvedValue(exec);
      const updateSpy = vi.spyOn(prisma.fulfillmentExecution, "update").mockResolvedValue({} as any);

      await fulfillmentService.moveToDeadLetter(orderId, "Core failure");

      expect(updateSpy).toHaveBeenCalledWith({
        where: { id: "exec_123" },
        data: {
          status: FulfillmentStatus.DEAD_LETTER,
          errorMessage: "DLQ: Core failure",
        },
      });
    });
  });

  // =========================================================================
  // Concurrency Controls & Architecture Hardening
  // =========================================================================
  describe("Checkout Lock & Concurrency Control", () => {
    it("should abort checkout with conflict if Redis lock is already held", async () => {
      const { checkoutService } = await import("../modules/commerce/checkout/checkout.service");
      const { productRepository } = await import("../modules/commerce/product.repository");
      const { productPriceRepository } = await import("../modules/commerce/product-price.repository");
      const { orderRepository } = await import("../modules/commerce/order.repository");

      vi.spyOn(productRepository, "findById").mockResolvedValue({ id: courseId, status: ProductStatus.ACTIVE } as any);
      vi.spyOn(productPriceRepository, "findActivePricesByProductId").mockResolvedValue([{ id: "price_123", amount: 1000, currency: "INR" }] as any);
      vi.spyOn(orderRepository, "hasActivePurchase").mockResolvedValue(false);

      // Simulate lock held (setNX returns false)
      vi.spyOn(redisClient, "setNX").mockResolvedValue(false);

      await expect(
        checkoutService.initiateCheckout(
          { productId: courseId, priceId: "price_123", gateway: "RAZORPAY" } as any,
          { id: userId, email: "student@pragyaos.com" } as any
        )
      ).rejects.toThrow("Checkout is already in progress for this product. Please try again.");
    });

    it("should enforce repository isolation (no direct static prisma imports in services or workers)", async () => {
      const fs = await import("fs");
      const path = await import("path");

      const filesToCheck = [
        "src/modules/commerce/checkout/checkout.service.ts",
        "src/modules/commerce/payment/payment.worker.ts",
        "src/modules/commerce/fulfillment/fulfillment.worker.ts",
        "src/modules/commerce/fulfillment/fulfillment.orchestrator.ts",
      ];

      for (const relPath of filesToCheck) {
        const fullPath = path.resolve(__dirname, "../../", relPath);
        const content = fs.readFileSync(fullPath, "utf-8");

        const hasPrismaImport = content.includes('import { prisma } from "../../../database/client"');
        const hasPrismaImportAlt = content.includes('import { prisma } from "../../database/client"');
        expect(hasPrismaImport).toBe(false);
        expect(hasPrismaImportAlt).toBe(false);
      }
    });
  });
});
