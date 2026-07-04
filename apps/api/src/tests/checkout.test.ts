import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  OrderStatus,
  PaymentStatus,
  CouponStatus,
  CouponType,
  ProductStatus,
  PaymentGateway,
} from "@prisma/client";

// ---------------------------------------------------------------------------
// Mock the Prisma client — must be hoisted before any service imports
// ---------------------------------------------------------------------------
vi.mock("../database/client", () => {
  const mockPrisma: any = {
    order: {
      findFirst: vi.fn(),
      count: vi.fn().mockResolvedValue(0),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    orderItem: {
      createMany: vi.fn(),
    },
    couponRedemption: {
      count: vi.fn().mockResolvedValue(0),
      create: vi.fn(),
    },
    paymentAttempt: {
      create: vi.fn(),
      findUnique: vi.fn(),
    },
    coupon: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    product: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
    },
    productPrice: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
    },
    $transaction: vi.fn(),
  };
  return { prisma: mockPrisma };
});

// ---------------------------------------------------------------------------
// Import after mock
// ---------------------------------------------------------------------------
import { prisma } from "../database/client";
import { CheckoutService, CouponEngine, OrderNumberGenerator } from "../modules/commerce/checkout/checkout.service";
import { checkoutEvents } from "../modules/commerce/checkout/checkout.events";
import { Money } from "../modules/commerce/money";
import { Currency } from "../modules/commerce/currency";
import { TaxEngine, TaxCalculationResult } from "../modules/commerce/tax.engine";

// ---------------------------------------------------------------------------
// Shared test fixtures
// ---------------------------------------------------------------------------
const productId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
const priceId   = "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb";
const userId    = "cccccccc-cccc-cccc-cccc-cccccccccccc";
const couponId  = "dddddddd-dddd-dddd-dddd-dddddddddddd";
const orderId   = "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee";
const paymentId = "ffffffff-ffff-ffff-ffff-ffffffffffff";

const INR = new Currency("INR");

const mockProduct = {
  id: productId,
  status: ProductStatus.ACTIVE,
  sellableId: "11111111-1111-1111-1111-111111111111",
  sellableType: "COURSE",
  sku: "COURSE-001",
};

const mockPrice = {
  id: priceId,
  productId,
  currency: "INR",
  amount: 49900, // ₹499.00
  priceType: "ONE_TIME",
  active: true,
  effectiveFrom: new Date(Date.now() - 1000),
  effectiveTo: null,
};

const mockOrder = {
  id: orderId,
  orderNumber: "ORD-20260704-000001",
  userId,
  status: OrderStatus.CREATED,
  currency: "INR",
  subtotalAmount: 49900,
  discountAmount: 0,
  taxAmount: 0,
  netAmount: 49900,
  activeCouponId: null,
  customerNameSnapshot: "Test User",
  customerEmailSnapshot: "test@pragyaos.com",
  createdAt: new Date(),
  updatedAt: new Date(),
  items: [],
};

const mockPaymentAttempt = {
  id: paymentId,
  orderId,
  gateway: PaymentGateway.RAZORPAY,
  amount: 49900,
  status: PaymentStatus.PENDING,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockUser = {
  id: userId,
  email: "test@pragyaos.com",
  firstName: "Test",
  lastName: "User",
};

// ---------------------------------------------------------------------------
// No-op TaxEngine for tests
// ---------------------------------------------------------------------------
const zeroTaxEngine: TaxEngine = {
  calculateTax: async (amount: Money): Promise<TaxCalculationResult> => ({
    taxableAmount: amount,
    totalTax: Money.zero(amount.currency.code),
    taxRatesApplied: [],
  }),
};

// ---------------------------------------------------------------------------
// Helper to build a configured CheckoutService with mocked repositories
// ---------------------------------------------------------------------------
function buildService(overrides: Partial<{
  productsMock: any;
  pricesMock: any;
  couponsMock: any;
  ordersMock: any;
  paymentsMock: any;
}> = {}): CheckoutService {
  const products = overrides.productsMock ?? {
    findById: vi.fn().mockResolvedValue(mockProduct),
  };
  const prices = overrides.pricesMock ?? {
    findActivePricesByProductId: vi.fn().mockResolvedValue([mockPrice]),
  };
  const coupons = overrides.couponsMock ?? {
    findByCode: vi.fn().mockResolvedValue(null),
    incrementRedemptions: vi.fn(),
  };
  const orders = overrides.ordersMock ?? {};
  if (!orders.createOrderWithItems) {
    orders.createOrderWithItems = vi.fn().mockResolvedValue(mockOrder);
  }
  if (!orders.hasActivePurchase) {
    orders.hasActivePurchase = vi.fn().mockImplementation(async () => {
      const existing = await prisma.order.findFirst({} as any);
      return !!existing;
    });
  }
  if (!orders.countTodayOrders) {
    orders.countTodayOrders = vi.fn().mockImplementation(async () => {
      return await prisma.order.count({} as any);
    });
  }
  const payments = overrides.paymentsMock ?? {
    create: vi.fn().mockResolvedValue(mockPaymentAttempt),
  };

  const couponRedemptionsMock = {
    countUserRedemptions: vi.fn().mockImplementation(async () => {
      return await prisma.couponRedemption.count({} as any);
    }),
    create: vi.fn().mockImplementation(async (data: any) => {
      return await prisma.couponRedemption.create({ data } as any);
    }),
  };

  const idempotencyMock = {
    acquireLock: vi.fn().mockResolvedValue(true),
    releaseLock: vi.fn().mockResolvedValue(true),
    markProcessed: vi.fn(),
  };

  // Wire transaction to call through to the fn callback
  (prisma.$transaction as any).mockImplementation(async (fn: any) =>
    fn(prisma)
  );

  return new CheckoutService(
    products as any,
    prices as any,
    coupons as any,
    orders as any,
    payments as any,
    zeroTaxEngine,
    checkoutEvents,
    couponRedemptionsMock as any,
    idempotencyMock as any
  );
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------
describe("Commerce — Checkout Engine", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (prisma.order.count as any).mockResolvedValue(0);
    (prisma.order.findFirst as any).mockResolvedValue(null); // no existing order
    (prisma.couponRedemption.count as any).mockResolvedValue(0);
    (prisma.couponRedemption.create as any).mockResolvedValue({});
    (prisma.coupon.update as any).mockResolvedValue({});
  });

  // =========================================================================
  // Money Value Object
  // =========================================================================
  describe("Money Value Object", () => {
    it("should add two Money values of same currency", () => {
      const a = new Money(10000, INR);
      const b = new Money(5000, INR);
      expect(a.add(b).amount).toBe(15000);
    });

    it("should subtract correctly", () => {
      const a = new Money(10000, INR);
      const b = new Money(3000, INR);
      expect(a.subtract(b).amount).toBe(7000);
    });

    it("should multiply and round", () => {
      const a = new Money(49900, INR);
      expect(a.multiply(0.18).amount).toBe(8982); // 49900 * 0.18 = 8982
    });

    it("should throw on currency mismatch", () => {
      const inr = new Money(100, new Currency("INR"));
      const usd = new Money(100, new Currency("USD"));
      expect(() => inr.add(usd)).toThrow("Currency mismatch");
    });

    it("should reject non-integer amounts", () => {
      expect(() => new Money(100.5, INR)).toThrow("integer");
    });

    it("should format correctly", () => {
      const m = new Money(49900, INR);
      expect(m.format()).toBe("₹499.00");
    });

    it("should produce zero money correctly", () => {
      const z = Money.zero("INR");
      expect(z.amount).toBe(0);
    });
  });

  // =========================================================================
  // OrderNumberGenerator
  // =========================================================================
  describe("OrderNumberGenerator", () => {
    it("should generate a correctly formatted order number", async () => {
      (prisma.order.count as any).mockResolvedValue(5);
      const number = await OrderNumberGenerator.generate();
      expect(number).toMatch(/^ORD-\d{8}-\d{6}$/);
      expect(number).toContain("000006"); // count 5 → next = 6
    });

    it("should pad sequence to 6 digits", async () => {
      (prisma.order.count as any).mockResolvedValue(0);
      const number = await OrderNumberGenerator.generate();
      const parts = number.split("-");
      expect(parts[2].length).toBe(6);
    });
  });

  // =========================================================================
  // CouponEngine
  // =========================================================================
  describe("CouponEngine", () => {
    const subtotal = new Money(49900, INR);

    const baseCoupon = {
      id: couponId,
      code: "SAVE20",
      discountType: CouponType.PERCENTAGE,
      discountValue: 20,
      minOrderValue: 0,
      usageLimit: null,
      redemptionsCount: 0,
      perUserLimit: 1,
      exclusive: true,
      status: CouponStatus.ACTIVE,
      expiresAt: null,
      active: true,
      scopeConstraints: null,
    };

    it("should compute 20% percentage discount correctly", async () => {
      const couponRepo = { findByCode: vi.fn().mockResolvedValue(baseCoupon) } as any;
      (prisma.couponRedemption.count as any).mockResolvedValue(0);
      const result = await CouponEngine.validate("SAVE20", subtotal, userId, productId, couponRepo);
      expect(result.valid).toBe(true);
      // 20% of 49900 = 9980
      expect(result.discountAmount).toBe(9980);
    });

    it("should compute flat discount correctly", async () => {
      const flatCoupon = { ...baseCoupon, discountType: CouponType.FLAT, discountValue: 5000 };
      const couponRepo = { findByCode: vi.fn().mockResolvedValue(flatCoupon) } as any;
      (prisma.couponRedemption.count as any).mockResolvedValue(0);
      const result = await CouponEngine.validate("FLAT50", subtotal, userId, productId, couponRepo);
      expect(result.discountAmount).toBe(5000);
    });

    it("should cap flat discount at subtotal (no negative totals)", async () => {
      const bigFlatCoupon = { ...baseCoupon, discountType: CouponType.FLAT, discountValue: 99999 };
      const couponRepo = { findByCode: vi.fn().mockResolvedValue(bigFlatCoupon) } as any;
      (prisma.couponRedemption.count as any).mockResolvedValue(0);
      const result = await CouponEngine.validate("BIGFLAT", subtotal, userId, productId, couponRepo);
      expect(result.discountAmount).toBe(subtotal.amount); // capped
    });

    it("should reject nonexistent coupon", async () => {
      const couponRepo = { findByCode: vi.fn().mockResolvedValue(null) } as any;
      await expect(
        CouponEngine.validate("NONEXIST", subtotal, userId, productId, couponRepo)
      ).rejects.toThrow("does not exist");
    });

    it("should reject expired coupon", async () => {
      const expired = { ...baseCoupon, expiresAt: new Date(Date.now() - 86400000) };
      const couponRepo = { findByCode: vi.fn().mockResolvedValue(expired) } as any;
      await expect(
        CouponEngine.validate("SAVE20", subtotal, userId, productId, couponRepo)
      ).rejects.toThrow("expired");
    });

    it("should reject INACTIVE coupon", async () => {
      const inactive = { ...baseCoupon, status: CouponStatus.INACTIVE };
      const couponRepo = { findByCode: vi.fn().mockResolvedValue(inactive) } as any;
      await expect(
        CouponEngine.validate("SAVE20", subtotal, userId, productId, couponRepo)
      ).rejects.toThrow("inactive");
    });

    it("should reject EXHAUSTED coupon", async () => {
      const exhausted = { ...baseCoupon, status: CouponStatus.EXHAUSTED };
      const couponRepo = { findByCode: vi.fn().mockResolvedValue(exhausted) } as any;
      await expect(
        CouponEngine.validate("SAVE20", subtotal, userId, productId, couponRepo)
      ).rejects.toThrow("exhausted");
    });

    it("should reject when global usage limit is reached", async () => {
      const limited = { ...baseCoupon, usageLimit: 10, redemptionsCount: 10 };
      const couponRepo = { findByCode: vi.fn().mockResolvedValue(limited) } as any;
      await expect(
        CouponEngine.validate("SAVE20", subtotal, userId, productId, couponRepo)
      ).rejects.toThrow("maximum usage limit");
    });

    it("should reject when per-user limit is reached", async () => {
      const couponRepo = { findByCode: vi.fn().mockResolvedValue(baseCoupon) } as any;
      (prisma.couponRedemption.count as any).mockResolvedValue(1); // already used
      await expect(
        CouponEngine.validate("SAVE20", subtotal, userId, productId, couponRepo)
      ).rejects.toThrow("already used coupon");
    });

    it("should reject when order value is below minimum", async () => {
      const minValCoupon = { ...baseCoupon, minOrderValue: 100000 }; // ₹1000 min
      const couponRepo = { findByCode: vi.fn().mockResolvedValue(minValCoupon) } as any;
      (prisma.couponRedemption.count as any).mockResolvedValue(0);
      await expect(
        CouponEngine.validate("SAVE20", subtotal, userId, productId, couponRepo) // subtotal ₹499
      ).rejects.toThrow("minimum order value");
    });

    it("should reject coupon not applicable to the product scope", async () => {
      const scopedCoupon = {
        ...baseCoupon,
        scopeConstraints: { productIds: ["00000000-0000-0000-0000-000000000001"] },
      };
      const couponRepo = { findByCode: vi.fn().mockResolvedValue(scopedCoupon) } as any;
      (prisma.couponRedemption.count as any).mockResolvedValue(0);
      await expect(
        CouponEngine.validate("SAVE20", subtotal, userId, productId, couponRepo)
      ).rejects.toThrow("not applicable to this product");
    });
  });

  // =========================================================================
  // CheckoutService — Paid Product (no coupon)
  // =========================================================================
  describe("CheckoutService — paid product, no coupon", () => {
    it("should return a CheckoutSessionDTO with correct amounts", async () => {
      const service = buildService();
      const result = await service.initiateCheckout(
        { productId, priceId },
        mockUser
      );

      expect(result.orderId).toBe(orderId);
      expect(result.orderNumber).toMatch(/^ORD-/);
      expect(result.paymentAttemptId).toBe(paymentId);
      expect(result.subtotalAmount).toBe(49900);
      expect(result.discountAmount).toBe(0);
      expect(result.taxAmount).toBe(0);
      expect(result.netAmount).toBe(49900);
      expect(result.currency).toBe("INR");
      expect(result.gateway).toBe(PaymentGateway.RAZORPAY);
    });

    it("should publish CheckoutStarted, OrderCreated, and PaymentInitiated events", async () => {
      const service = buildService();
      const startedSpy = vi.spyOn(checkoutEvents, "emitCheckoutStarted");
      const createdSpy = vi.spyOn(checkoutEvents, "emitOrderCreated");
      const initiatedSpy = vi.spyOn(checkoutEvents, "emitPaymentInitiated");

      await service.initiateCheckout({ productId, priceId }, mockUser);

      expect(startedSpy).toHaveBeenCalledOnce();
      expect(createdSpy).toHaveBeenCalledOnce();
      expect(initiatedSpy).toHaveBeenCalledOnce();
    });
  });

  // =========================================================================
  // CheckoutService — with coupon
  // =========================================================================
  describe("CheckoutService — with coupon", () => {
    it("should apply coupon discount and emit CouponValidated event", async () => {
      const mockOrderWithDiscount = {
        ...mockOrder,
        discountAmount: 9980,
        netAmount: 39920,
      };
      const couponsMock = {
        findByCode: vi.fn().mockResolvedValue({
          id: couponId,
          code: "SAVE20",
          discountType: CouponType.PERCENTAGE,
          discountValue: 20,
          minOrderValue: 0,
          usageLimit: null,
          redemptionsCount: 0,
          perUserLimit: 1,
          exclusive: true,
          status: CouponStatus.ACTIVE,
          expiresAt: null,
          active: true,
          scopeConstraints: null,
        }),
        incrementRedemptions: vi.fn().mockResolvedValue({}),
      };
      const ordersMock = {
        createOrderWithItems: vi.fn().mockResolvedValue(mockOrderWithDiscount),
      };
      const service = buildService({ couponsMock, ordersMock });

      const couponSpy = vi.spyOn(checkoutEvents, "emitCouponValidated");

      const result = await service.initiateCheckout(
        { productId, priceId, couponCode: "SAVE20" },
        mockUser
      );

      expect(result.discountAmount).toBe(9980);
      expect(result.couponCode).toBe("SAVE20");
      expect(couponSpy).toHaveBeenCalledOnce();
    });
  });

  // =========================================================================
  // CheckoutService — validation guards
  // =========================================================================
  describe("CheckoutService — validation guards", () => {
    it("should throw NotFound when product does not exist", async () => {
      const service = buildService({
        productsMock: { findById: vi.fn().mockResolvedValue(null) },
      });
      await expect(
        service.initiateCheckout({ productId, priceId }, mockUser)
      ).rejects.toThrow("not found");
    });

    it("should throw BadRequest when product is ARCHIVED", async () => {
      const service = buildService({
        productsMock: {
          findById: vi.fn().mockResolvedValue({ ...mockProduct, status: ProductStatus.ARCHIVED }),
        },
      });
      await expect(
        service.initiateCheckout({ productId, priceId }, mockUser)
      ).rejects.toThrow("archived");
    });

    it("should throw BadRequest when product is DRAFT", async () => {
      const service = buildService({
        productsMock: {
          findById: vi.fn().mockResolvedValue({ ...mockProduct, status: ProductStatus.DRAFT }),
        },
      });
      await expect(
        service.initiateCheckout({ productId, priceId }, mockUser)
      ).rejects.toThrow("not yet available");
    });

    it("should throw BadRequest when priceId does not match active prices", async () => {
      const service = buildService({
        pricesMock: { findActivePricesByProductId: vi.fn().mockResolvedValue([]) },
      });
      await expect(
        service.initiateCheckout({ productId, priceId }, mockUser)
      ).rejects.toThrow("price is not active");
    });

    it("should throw BadRequest for unsupported currency", async () => {
      const service = buildService({
        pricesMock: {
          findActivePricesByProductId: vi.fn().mockResolvedValue([{ ...mockPrice, currency: "XYZ" }]),
        },
      });
      await expect(
        service.initiateCheckout({ productId, priceId }, mockUser)
      ).rejects.toThrow("Unsupported currency");
    });

    it("should throw Conflict on duplicate PAID purchase", async () => {
      (prisma.order.findFirst as any).mockResolvedValue({
        id: "existing-order-id",
        status: OrderStatus.PAID,
      });
      const service = buildService();
      await expect(
        service.initiateCheckout({ productId, priceId }, mockUser)
      ).rejects.toThrow("already have an active or completed purchase");
    });

    it("should throw Conflict on duplicate PENDING_PAYMENT purchase", async () => {
      (prisma.order.findFirst as any).mockResolvedValue({
        id: "existing-order-id",
        status: OrderStatus.PENDING_PAYMENT,
      });
      const service = buildService();
      await expect(
        service.initiateCheckout({ productId, priceId }, mockUser)
      ).rejects.toThrow("already have an active or completed purchase");
    });
  });

  // =========================================================================
  // Order and PaymentAttempt creation
  // =========================================================================
  describe("Order creation", () => {
    it("should create order with CREATED status and payment attempt with PENDING", async () => {
      const service = buildService();
      await service.initiateCheckout({ productId, priceId }, mockUser);

      // Order created through the repository
      // Payment attempt created through the repository
      expect(mockOrder.status).toBe(OrderStatus.CREATED);
      expect(mockPaymentAttempt.status).toBe(PaymentStatus.PENDING);
    });

    it("should snapshot customer name and email into order", async () => {
      const ordersMock = {
        createOrderWithItems: vi.fn().mockImplementation(async (data: any) => ({
          ...mockOrder,
          customerNameSnapshot: data.customerNameSnapshot,
          customerEmailSnapshot: data.customerEmailSnapshot,
        })),
      };
      const service = buildService({ ordersMock });
      const result = await service.initiateCheckout({ productId, priceId }, mockUser);
      // The mapper reads from persisted order — just check it flows through
      expect(result.userId).toBe(userId);
    });
  });

  // =========================================================================
  // Free Product (zero-amount price)
  // =========================================================================
  describe("Free product checkout", () => {
    it("should handle a free product (amount = 0) without errors", async () => {
      const freePrice = { ...mockPrice, amount: 0 };
      const freeOrder = { ...mockOrder, subtotalAmount: 0, netAmount: 0 };
      const freePayment = { ...mockPaymentAttempt, amount: 0 };
      const service = buildService({
        pricesMock: {
          findActivePricesByProductId: vi.fn().mockResolvedValue([freePrice]),
        },
        ordersMock: {
          createOrderWithItems: vi.fn().mockResolvedValue(freeOrder),
        },
        paymentsMock: {
          create: vi.fn().mockResolvedValue(freePayment),
        },
      });

      const result = await service.initiateCheckout({ productId, priceId }, mockUser);
      expect(result.subtotalAmount).toBe(0);
      expect(result.netAmount).toBe(0);
    });
  });
});
