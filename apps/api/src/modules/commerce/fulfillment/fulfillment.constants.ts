export const FULFILLMENT_QUEUES = {
  FULFILLMENT: "fulfillment-queue",
  ENROLLMENT: "enrollment-queue",
  INVOICE: "invoice-queue",
  NOTIFICATION: "notification-queue",
  ANALYTICS: "analytics-queue",
} as const;

export const FULFILLMENT_EVENTS = {
  FULFILLMENT_STARTED: "fulfillment.started",
  ENROLLMENT_GRANTED: "fulfillment.enrollment.granted",
  INVOICE_GENERATED: "fulfillment.invoice.generated",
  NOTIFICATION_QUEUED: "fulfillment.notification.queued",
  ANALYTICS_QUEUED: "fulfillment.analytics.queued",
  FULFILLMENT_COMPLETED: "fulfillment.completed",
  FULFILLMENT_FAILED: "fulfillment.failed",
} as const;

export const FULFILLMENT_STEPS = {
  ENROLLMENT: "ENROLLMENT",
  INVOICE: "INVOICE",
  NOTIFICATION: "NOTIFICATION",
  ANALYTICS: "ANALYTICS",
} as const;

export const FULFILLMENT_CONFIG = {
  MAX_RETRIES: 3,
};
