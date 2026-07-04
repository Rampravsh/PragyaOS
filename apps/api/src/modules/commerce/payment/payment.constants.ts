import { PaymentStatus } from "@prisma/client";

export const PAYMENT_EVENTS = {
  PAYMENT_INITIATED: "payment.initiated",
  PAYMENT_AUTHORIZED: "payment.authorized",
  PAYMENT_CAPTURED: "payment.captured",
  PAYMENT_FAILED: "payment.failed",
  WEBHOOK_RECEIVED: "payment.webhook.received",
  WEBHOOK_VERIFIED: "payment.webhook.verified",
  FULFILLMENT_QUEUED: "payment.fulfillment.queued",
} as const;

export const FULFILLMENT_QUEUE_NAME = "fulfillment-queue";

export type PaymentState =
  | "PENDING"
  | "AUTHORIZED"
  | "CAPTURED"
  | "FAILED"
  | "CANCELLED"
  | "REFUND_PENDING"
  | "REFUNDED";

export const PAYMENT_TRANSITIONS: Record<PaymentState, PaymentState[]> = {
  PENDING: ["AUTHORIZED", "CAPTURED", "FAILED", "CANCELLED"],
  AUTHORIZED: ["CAPTURED", "FAILED", "CANCELLED"],
  CAPTURED: ["REFUND_PENDING", "REFUNDED"],
  FAILED: [],
  CANCELLED: [],
  REFUND_PENDING: ["REFUNDED", "FAILED"],
  REFUNDED: [],
};

export const PAYMENT_STATUS_MAP: Record<PaymentState, PaymentStatus> = {
  PENDING: PaymentStatus.PENDING,
  AUTHORIZED: PaymentStatus.PENDING,
  CAPTURED: PaymentStatus.SUCCESS,
  FAILED: PaymentStatus.FAILED,
  CANCELLED: PaymentStatus.FAILED,
  REFUND_PENDING: PaymentStatus.SUCCESS,
  REFUNDED: PaymentStatus.SUCCESS,
};
