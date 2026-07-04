import { PaymentGateway } from "@prisma/client";

/**
 * Input DTO submitted by the consumer to initiate checkout.
 */
export interface InitiateCheckoutInput {
  productId: string;
  priceId: string;
  couponCode?: string;
  billingRegion?: string;   // ISO country code, e.g. "IN"
  gateway?: PaymentGateway; // Defaults to CHECKOUT_DEFAULTS.GATEWAY
}

/**
 * Contextual information about the authenticated user.
 */
export interface CheckoutUserContext {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
}

/**
 * Line item resolved during checkout before the order is persisted.
 */
export interface CheckoutLineItem {
  productId: string;
  priceId: string;
  priceSnapshot: number;   // Immutable copy of ProductPrice.amount (integer)
  discountSnapshot: number; // Per-item discount applied (integer)
  quantity: number;
}

/**
 * Tax breakdown returned from TaxEngine.
 */
export interface CheckoutTaxBreakdown {
  taxableAmount: number;
  totalTax: number;
  rates: Array<{ label: string; rate: number; amount: number }>;
}

/**
 * The full Checkout Session DTO returned to the caller.
 * Contains everything needed to call a payment gateway.
 */
export interface CheckoutSessionDTO {
  orderId: string;
  orderNumber: string;
  paymentAttemptId: string;
  userId: string;
  currency: string;
  subtotalAmount: number; // minor units
  discountAmount: number; // minor units
  taxAmount: number;      // minor units
  netAmount: number;      // minor units
  couponCode?: string;
  taxBreakdown: CheckoutTaxBreakdown;
  gateway: PaymentGateway;
  createdAt: string;
}

/**
 * Coupon validation result (internal use within service).
 */
export interface CouponValidationResult {
  valid: true;
  couponId: string;
  discountAmount: number; // minor units — already computed
}
