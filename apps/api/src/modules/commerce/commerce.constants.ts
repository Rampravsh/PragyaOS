import { PaymentGateway, OrderStatus, CouponStatus } from "@prisma/client";

export const COMMERCE_DEFAULTS = {
  CURRENCY: "INR",
  PAYMENT_RETRY_LIMIT: 3,
  INVOICE_PREFIX: "INV-",
  COUPON_PER_USER_LIMIT: 1,
};

export const PAYMENT_GATEWAY_NAMES = {
  RAZORPAY: PaymentGateway.RAZORPAY,
  STRIPE: PaymentGateway.STRIPE,
  MANUAL: PaymentGateway.MANUAL,
};

export const ORDER_LIFECYCLE = {
  CREATED: OrderStatus.CREATED,
  PENDING_PAYMENT: OrderStatus.PENDING_PAYMENT,
  PAID: OrderStatus.PAID,
  FAILED: OrderStatus.FAILED,
  CANCELLED: OrderStatus.CANCELLED,
  REFUNDED: OrderStatus.REFUNDED,
};

export const COUPON_STATES = {
  ACTIVE: CouponStatus.ACTIVE,
  EXPIRED: CouponStatus.EXPIRED,
  EXHAUSTED: CouponStatus.EXHAUSTED,
  INACTIVE: CouponStatus.INACTIVE,
};
