import {
  Coupon,
  CouponStatus,
  CouponType,
  OrderStatus,
  PaymentStatus,
  ProductStatus,
} from "@prisma/client";
import { randomUUID } from "crypto";
import { AppError } from "../../../common/errors/appError";
import { logger } from "../../../lib/logger";

import { Money } from "../money";
import { Currency } from "../currency";
import { TaxEngine, TaxCalculationResult } from "../tax.engine";
import { PaymentGateway as PaymentGatewayInterface } from "../payment.gateway";

import { productRepository, PrismaProductRepository } from "../product.repository";
import { productPriceRepository, PrismaProductPriceRepository } from "../product-price.repository";
import { couponRepository, PrismaCouponRepository } from "../coupon.repository";
import { orderRepository, PrismaOrderRepository } from "../order.repository";
import { paymentRepository, PrismaPaymentRepository } from "../payment.repository";
import { couponRedemptionRepository, PrismaCouponRedemptionRepository } from "../coupon-redemption.repository";
import { paymentIdempotencyService, PaymentIdempotencyService } from "../payment/payment-idempotency.service";

import {
  InitiateCheckoutInput,
  CheckoutUserContext,
  CheckoutSessionDTO,
  CouponValidationResult,
} from "./checkout.types";
import { CHECKOUT_DEFAULTS, ORDER_NUMBER_CONFIG } from "./checkout.constants";
import { CheckoutEventEmitter, checkoutEvents } from "./checkout.events";
import { CheckoutMapper } from "./checkout.mapper";

// ---------------------------------------------------------------------------
// OrderNumberGenerator
// ---------------------------------------------------------------------------

/**
 * Generates human-readable, sortable, unique order numbers.
 * Format: ORD-YYYYMMDD-NNNNNN  (e.g. ORD-20260704-000001)
 *
 * The counter is seeded from the current daily order count stored in the DB
 * to guarantee uniqueness across restarts without a dedicated sequence table.
 */
export class OrderNumberGenerator {
  public static async generate(orderRepo: PrismaOrderRepository = orderRepository): Promise<string> {
    const now = new Date();
    const datePart = now
      .toISOString()
      .slice(0, 10)           // "2026-07-04"
      .replace(/-/g, "");     // "20260704"

    const todayCount = await orderRepo.countTodayOrders();

    const sequence = String(todayCount + 1).padStart(
      ORDER_NUMBER_CONFIG.SEQUENCE_PAD,
      "0"
    );

    return `${ORDER_NUMBER_CONFIG.PREFIX}-${datePart}-${sequence}`;
  }
}

// ---------------------------------------------------------------------------
// CouponEngine
// ---------------------------------------------------------------------------

/**
 * Stateless coupon validation engine.
 * All rules are validated before a single database write occurs.
 */
export class CouponEngine {
  /**
   * Validates a coupon against all business rules and computes the discount.
   * Throws AppError on any validation failure.
   * Returns CouponValidationResult on success.
   */
  public static async validate(
    couponCode: string,
    subtotal: Money,
    userId: string,
    productId: string,
    couponRepo: PrismaCouponRepository = couponRepository,
    redemptionRepo: PrismaCouponRedemptionRepository = couponRedemptionRepository
  ): Promise<CouponValidationResult> {
    // 1. Resolve coupon record
    const coupon = await couponRepo.findByCode(couponCode);
    if (!coupon) {
      throw AppError.badRequest(`Coupon code '${couponCode}' does not exist.`);
    }

    // 2. Status check
    if (coupon.status !== CouponStatus.ACTIVE) {
      throw AppError.badRequest(
        `Coupon '${couponCode}' is ${coupon.status.toLowerCase()} and cannot be applied.`
      );
    }

    // 3. Active flag
    if (!coupon.active) {
      throw AppError.badRequest(`Coupon '${couponCode}' is not active.`);
    }

    // 4. Expiry check
    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      throw AppError.badRequest(`Coupon '${couponCode}' has expired.`);
    }

    // 5. Global usage limit
    if (
      coupon.usageLimit !== null &&
      coupon.redemptionsCount >= coupon.usageLimit
    ) {
      throw AppError.badRequest(
        `Coupon '${couponCode}' has reached its maximum usage limit.`
      );
    }

    // 6. Per-user limit — count this user's existing redemptions
    const userRedemptionCount = await redemptionRepo.countUserRedemptions(coupon.id, userId);
    if (userRedemptionCount >= coupon.perUserLimit) {
      throw AppError.badRequest(
        `You have already used coupon '${couponCode}' the maximum allowed times.`
      );
    }

    // 7. Minimum order value
    const minOrder = new Money(coupon.minOrderValue, subtotal.currency);
    if (subtotal.lessThan(minOrder)) {
      throw AppError.badRequest(
        `Coupon '${couponCode}' requires a minimum order value of ${minOrder.format()}.`
      );
    }

    // 8. Scope constraints — applicableProductIds
    if (coupon.scopeConstraints) {
      const scope = coupon.scopeConstraints as {
        productIds?: string[];
        categoryIds?: string[];
      };
      if (scope.productIds && scope.productIds.length > 0) {
        if (!scope.productIds.includes(productId)) {
          throw AppError.badRequest(
            `Coupon '${couponCode}' is not applicable to this product.`
          );
        }
      }
    }

    // 9. Compute discount using Money
    const discountAmount = CouponEngine.computeDiscount(coupon, subtotal);

    return {
      valid: true,
      couponId: coupon.id,
      discountAmount: discountAmount.amount,
    };
  }

  /**
   * Computes the discount amount using Money arithmetic.
   * Handles both PERCENTAGE and FLAT coupon types.
   */
  private static computeDiscount(coupon: Coupon, subtotal: Money): Money {
    if (coupon.discountType === CouponType.PERCENTAGE) {
      // discountValue is integer percent, e.g. 20 = 20%
      const rate = coupon.discountValue / 100;
      const discount = subtotal.multiply(rate);
      // Guard: discount cannot exceed subtotal (prevents negative totals)
      return discount.greaterThan(subtotal) ? subtotal : discount;
    }

    // FLAT
    const flatDiscount = new Money(coupon.discountValue, subtotal.currency);
    // Guard: flat discount cannot exceed subtotal
    return flatDiscount.greaterThan(subtotal) ? subtotal : flatDiscount;
  }
}

// ---------------------------------------------------------------------------
// NullTaxEngine — default no-op implementation used when TaxEngine is omitted
// ---------------------------------------------------------------------------

/**
 * A no-op TaxEngine used when no regional tax engine is configured.
 * Returns zero tax so checkout works without a real tax calculator.
 */
class NullTaxEngine implements TaxEngine {
  public async calculateTax(amount: Money): Promise<TaxCalculationResult> {
    return {
      taxableAmount: amount,
      totalTax: Money.zero(amount.currency.code),
      taxRatesApplied: [],
    };
  }
}

// ---------------------------------------------------------------------------
// CheckoutService
// ---------------------------------------------------------------------------

export class CheckoutService {
  constructor(
    private readonly products: PrismaProductRepository = productRepository,
    private readonly prices: PrismaProductPriceRepository = productPriceRepository,
    private readonly coupons: PrismaCouponRepository = couponRepository,
    private readonly orders: PrismaOrderRepository = orderRepository,
    private readonly payments: PrismaPaymentRepository = paymentRepository,
    private readonly taxEngine: TaxEngine = new NullTaxEngine(),
    private readonly events: CheckoutEventEmitter = checkoutEvents,
    private readonly couponRedemptions: PrismaCouponRedemptionRepository = couponRedemptionRepository,
    private readonly idempotency: PaymentIdempotencyService = paymentIdempotencyService
  ) {}

  /**
   * Orchestrates the entire checkout flow:
   *  1. Resolve & validate Product
   *  2. Resolve & validate active ProductPrice
   *  3. Validate Currency
   *  4. Validate Product Status
   *  5. Validate Product Availability
   *  6. Guard duplicate purchase (race-condition safe, DB-level unique check)
   *  7. Validate Coupon (if supplied)
   *  8. Calculate Discount via Money
   *  9. Calculate Tax via TaxEngine
   * 10. Calculate Final Amount via Money
   * 11. Generate Order Number
   * 12. Create Order + OrderItems in a transaction
   * 13. Create PaymentAttempt (PENDING)
   * 14. Record CouponRedemption (if coupon applied)
   * 15. Publish Domain Events
   * 16. Return CheckoutSessionDTO
   */
  public async initiateCheckout(
    input: InitiateCheckoutInput,
    user: CheckoutUserContext
  ): Promise<CheckoutSessionDTO> {
    const { productId, priceId, couponCode, billingRegion, gateway } = input;

    // Acquire lock to prevent duplicate concurrent checkouts
    const lockKey = `checkout:lock:${user.id}:${productId}`;
    const lockAcquired = await this.idempotency.acquireLock(lockKey, 30);
    if (!lockAcquired) {
      throw AppError.conflict("Checkout is already in progress for this product. Please try again.");
    }

    try {
      // -----------------------------------------------------------------------
      // Step 1 — Resolve Product
      // -----------------------------------------------------------------------
      const product = await this.products.findById(productId);
      if (!product) {
        throw AppError.notFound(`Product '${productId}' not found.`);
      }

      // Step 2 — Validate Product Status
      if (product.status === ProductStatus.ARCHIVED) {
        throw AppError.badRequest("This product has been archived and is no longer available.");
      }
      if (product.status === ProductStatus.DRAFT) {
        throw AppError.badRequest("This product is not yet available for purchase.");
      }

      // -----------------------------------------------------------------------
      // Step 3 — Resolve active ProductPrice
      // -----------------------------------------------------------------------
      const activePrices = await this.prices.findActivePricesByProductId(productId);
      const price = activePrices.find((p) => p.id === priceId);
      if (!price) {
        throw AppError.badRequest(
          "The requested price is not active or does not belong to this product."
        );
      }

      // -----------------------------------------------------------------------
      // Step 4 — Validate Currency
      // -----------------------------------------------------------------------
      let currency: Currency;
      try {
        currency = new Currency(price.currency);
      } catch {
        throw AppError.badRequest(`Unsupported currency '${price.currency}'.`);
      }

      // -----------------------------------------------------------------------
      // Step 5 — Guard Duplicate Purchase
      // Checks if the user already has a PAID or PENDING_PAYMENT order for this
      // exact product to prevent duplicate purchases.
      // -----------------------------------------------------------------------
      const hasActive = await this.orders.hasActivePurchase(user.id, productId);
      if (hasActive) {
        throw AppError.conflict(
          "You already have an active or completed purchase for this product."
        );
      }

      // -----------------------------------------------------------------------
      // Step 6 — Build subtotal using Money
      // Never trust client prices — always load from ProductPrice
      // -----------------------------------------------------------------------
      const subtotal = new Money(price.amount, currency);

      // -----------------------------------------------------------------------
      // Step 7 — Emit CheckoutStarted event (before mutations)
      // -----------------------------------------------------------------------
      this.events.emitCheckoutStarted({
        version: 1,
        eventId: randomUUID(),
        timestamp: new Date().toISOString(),
        userId: user.id,
        productId,
        priceId,
        currency: currency.code,
      });

      // -----------------------------------------------------------------------
      // Step 8 — Validate & Apply Coupon (if supplied)
      // -----------------------------------------------------------------------
      let couponValidation: CouponValidationResult | null = null;
      if (couponCode) {
        couponValidation = await CouponEngine.validate(
          couponCode,
          subtotal,
          user.id,
          productId,
          this.coupons,
          this.couponRedemptions
        );
        logger.info(
          `✅ Coupon '${couponCode}' validated. Discount: ${couponValidation.discountAmount}`
        );
      }

      // -----------------------------------------------------------------------
      // Step 9 — Compute discount
      // -----------------------------------------------------------------------
      const discountMoney = couponValidation
        ? new Money(couponValidation.discountAmount, currency)
        : Money.zero(currency.code);

      // -----------------------------------------------------------------------
      // Step 10 — Compute taxable amount = subtotal - discount
      // -----------------------------------------------------------------------
      const taxableAmountMoney = subtotal.subtract(discountMoney);

      // Guard: taxable amount cannot be negative
      if (taxableAmountMoney.amount < 0) {
        throw AppError.unprocessable("Discount cannot exceed the order subtotal.");
      }

      // -----------------------------------------------------------------------
      // Step 11 — Calculate Tax
      // -----------------------------------------------------------------------
      const region = billingRegion ?? CHECKOUT_DEFAULTS.BILLING_REGION;
      const taxResult = await this.taxEngine.calculateTax(taxableAmountMoney, region);

      // -----------------------------------------------------------------------
      // Step 12 — Compute net amount = taxable + tax
      // -----------------------------------------------------------------------
      const netMoney = taxableAmountMoney.add(taxResult.totalTax);

      // -----------------------------------------------------------------------
      // Step 13 — Generate Order Number (must happen before DB write)
      // -----------------------------------------------------------------------
      const orderNumber = await OrderNumberGenerator.generate(this.orders);

      // -----------------------------------------------------------------------
      // Step 14 — Persist Order + OrderItems + PaymentAttempt + CouponRedemption
      //            inside a single Prisma transaction
      // -----------------------------------------------------------------------
      const chosenGateway = gateway ?? CHECKOUT_DEFAULTS.GATEWAY;
      const customerName = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email;

      const orderData: any = {
        orderNumber,
        userId: user.id,
        status: OrderStatus.CREATED,
        currency: currency.code,
        subtotalAmount: subtotal.amount,
        discountAmount: discountMoney.amount,
        taxAmount: taxResult.totalTax.amount,
        netAmount: netMoney.amount,
        activeCouponId: couponValidation?.couponId ?? null,
        customerNameSnapshot: customerName,
        customerEmailSnapshot: user.email,
      };

      const lineItems = [
        {
          productId,
          priceId,
          priceSnapshot: price.amount,
          discountSnapshot: discountMoney.amount,
          quantity: 1,
        },
      ];

      // We use a prisma.$transaction to atomically create Order, OrderItems,
      // PaymentAttempt, and (optionally) CouponRedemption.
      // The transaction lives in the service layer per AGENTS.md policy.
      let paymentAttempt: any;
      let persistedOrder: any;

      const { prisma } = await import("../../../database/client");
      await prisma.$transaction(async (tx) => {
        const ctx = { tx };

        // 14a. Create Order + OrderItems
        persistedOrder = await this.orders.createOrderWithItems(orderData, lineItems, ctx);

        // 14b. Create PaymentAttempt (status: PENDING)
        paymentAttempt = await this.payments.create(
          {
            orderId: persistedOrder.id,
            gateway: chosenGateway,
            amount: netMoney.amount,
            status: PaymentStatus.PENDING,
          },
          ctx
        );

        // 14c. Record CouponRedemption if coupon was applied
        if (couponValidation) {
          await this.couponRedemptions.create(
            {
              couponId: couponValidation.couponId,
              userId: user.id,
              orderId: persistedOrder.id,
            },
            ctx
          );
          // Atomically increment redemption counter on the coupon
          await this.coupons.incrementRedemptions(couponValidation.couponId, ctx);
        }
      });

      // -----------------------------------------------------------------------
      // Step 15 — Publish Domain Events (after successful DB commit)
      // -----------------------------------------------------------------------
      this.events.emitOrderCreated({
        version: 1,
        eventId: randomUUID(),
        timestamp: new Date().toISOString(),
        orderId: persistedOrder.id,
        orderNumber: persistedOrder.orderNumber,
        userId: user.id,
        subtotalAmount: subtotal.amount,
        discountAmount: discountMoney.amount,
        taxAmount: taxResult.totalTax.amount,
        netAmount: netMoney.amount,
        currency: currency.code,
      });

      if (couponValidation && couponCode) {
        this.events.emitCouponValidated({
          version: 1,
          eventId: randomUUID(),
          timestamp: new Date().toISOString(),
          couponId: couponValidation.couponId,
          userId: user.id,
          orderId: persistedOrder.id,
          discountAmount: discountMoney.amount,
        });
      }

      this.events.emitPaymentInitiated({
        version: 1,
        eventId: randomUUID(),
        timestamp: new Date().toISOString(),
        paymentAttemptId: paymentAttempt.id,
        orderId: persistedOrder.id,
        gateway: chosenGateway,
        amount: netMoney.amount,
        currency: currency.code,
      });

      logger.info(
        `🛒 Checkout completed — orderNumber: ${orderNumber}, net: ${netMoney.format()}, userId: ${user.id}`
      );

      // -----------------------------------------------------------------------
      // Step 16 — Return CheckoutSessionDTO
      // -----------------------------------------------------------------------
      return CheckoutMapper.toCheckoutSessionDTO(
        persistedOrder,
        paymentAttempt,
        taxResult,
        couponCode
      );
    } finally {
      await this.idempotency.releaseLock(lockKey);
    }
  }
}

export const checkoutService = new CheckoutService();
export default checkoutService;
