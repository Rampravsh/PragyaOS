import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import app from "../app";
import jwt from "jsonwebtoken";
import { config } from "../config";

// Mock prisma and Redis
vi.mock("../database/client", () => {
  const mockPrisma: any = {
    user: {
      findUnique: vi.fn().mockResolvedValue({ id: "user-123", firstName: "John", lastName: "Doe" }),
    },
  };
  return { prisma: mockPrisma };
});

vi.mock("../lib/redis", () => {
  const mockRedis = {
    get: vi.fn(),
    set: vi.fn(),
    setNX: vi.fn().mockResolvedValue(true),
    del: vi.fn(),
  };
  return {
    redisClient: mockRedis,
    default: mockRedis,
  };
});

// Mock checkoutService
vi.mock("../modules/commerce/checkout/checkout.service", () => {
  return {
    checkoutService: {
      initiateCheckout: vi.fn().mockResolvedValue({
        orderId: "order-123",
        orderNumber: "ORD-2026-0001",
        gatewayOrderId: "pay_123",
        amount: 4999,
        currency: "INR",
      }),
    },
    default: {
      initiateCheckout: vi.fn().mockResolvedValue({
        orderId: "order-123",
        orderNumber: "ORD-2026-0001",
        gatewayOrderId: "pay_123",
        amount: 4999,
        currency: "INR",
      }),
    },
  };
});

describe("Checkout API Endpoint Integration Tests", () => {
  const secret = config.jwt.secret;
  let userToken = "";

  beforeEach(() => {
    vi.clearAllMocks();
    userToken = jwt.sign(
      { userId: "user-123", email: "student@pragyaos.com", roles: ["STUDENT"], permissions: [] },
      secret
    );
  });

  it("should fail to initiate checkout if unauthorized", async () => {
    const res = await request(app)
      .post("/api/v1/payments/checkout")
      .send({
        productId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        priceId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
      });

    expect(res.status).toBe(401);
  });

  it("should fail validation if required fields are missing", async () => {
    const res = await request(app)
      .post("/api/v1/payments/checkout")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        productId: "invalid-uuid",
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should successfully initiate checkout with valid payload", async () => {
    const res = await request(app)
      .post("/api/v1/payments/checkout")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        productId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        priceId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
        gateway: "RAZORPAY",
        billingRegion: "IN",
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.orderNumber).toBe("ORD-2026-0001");
  });
});
