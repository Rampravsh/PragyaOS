import { PaymentGateway } from "@prisma/client";

/**
 * Checkout-specific constants.
 * Do not duplicate constants already in ../commerce.constants.ts.
 */
export const CHECKOUT_EVENTS = {
  CHECKOUT_STARTED: "checkout.started",
  ORDER_CREATED: "checkout.order.created",
  COUPON_VALIDATED: "checkout.coupon.validated",
  PAYMENT_INITIATED: "checkout.payment.initiated",
} as const;

export const ORDER_NUMBER_CONFIG = {
  PREFIX: "ORD",
  DATE_FORMAT: "YYYYMMDD", // used programmatically
  SEQUENCE_PAD: 6,         // e.g. 000001
};

export const CHECKOUT_DEFAULTS = {
  GATEWAY: PaymentGateway.RAZORPAY,
  BILLING_REGION: "IN",
  TAX_ENABLED: true,
};
