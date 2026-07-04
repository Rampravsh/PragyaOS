export interface BaseCommerceEvent {
  eventId: string;
  timestamp: string;
  version: number; // For event consumer backwards-compatibility
}

export interface OrderCreatedEvent extends BaseCommerceEvent {
  orderId: string;
  orderNumber: string;
  userId: string;
  subtotalAmount: number;
  netAmount: number;
  currency: string;
}

export interface PaymentInitiatedEvent extends BaseCommerceEvent {
  paymentAttemptId: string;
  orderId: string;
  gateway: string;
  amount: number;
  currency: string;
}

export interface PaymentSucceededEvent extends BaseCommerceEvent {
  paymentAttemptId: string;
  orderId: string;
  gatewayPaymentId: string;
  amount: number;
  currency: string;
}

export interface PaymentFailedEvent extends BaseCommerceEvent {
  paymentAttemptId: string;
  orderId: string;
  gatewayPaymentId?: string;
  errorCode?: string;
  errorDescription?: string;
}

export interface RefundRequestedEvent extends BaseCommerceEvent {
  refundId: string;
  paymentAttemptId: string;
  amount: number;
  reason: string;
}

export interface RefundCompletedEvent extends BaseCommerceEvent {
  refundId: string;
  paymentAttemptId: string;
  gatewayRefundId: string;
  amount: number;
}

export interface InvoiceGeneratedEvent extends BaseCommerceEvent {
  invoiceId: string;
  invoiceNumber: string;
  orderId: string;
  issuedAt: string;
}

export interface CouponRedeemedEvent extends BaseCommerceEvent {
  couponId: string;
  userId: string;
  orderId: string;
  discountAmount: number;
}

export interface EnrollmentGrantedEvent extends BaseCommerceEvent {
  userId: string;
  courseId: string;
  orderId: string;
  source: string;
}
