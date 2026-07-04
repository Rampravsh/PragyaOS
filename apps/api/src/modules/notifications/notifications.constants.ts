import { NotificationCategory } from "@prisma/client";

export const NOTIFICATION_PERMISSIONS = {
  READ: "notification:read",
  TEMPLATE_CREATE: "notification:template:create",
  TEMPLATE_UPDATE: "notification:template:update",
  PREFERENCES_UPDATE: "notification:preferences:update",
} as const;

export const NOTIFICATION_QUEUE_NAMES = {
  IN_APP: "notification-inapp-queue",
} as const;

/**
 * Categories that cannot be disabled by user preferences.
 * Security and payment notifications are always delivered.
 */
export const UNCANCELLABLE_CATEGORIES = new Set<NotificationCategory>([
  "SECURITY",
  "PAYMENT",
]);

/**
 * Maps domain event names to template slugs and metadata.
 */
export const EVENT_TEMPLATE_MAP = {
  "credential.issued": {
    templateSlug: "credential-issued",
    category: "CREDENTIAL" as NotificationCategory,
    priority: "NORMAL",
  },
  "credential.revoked": {
    templateSlug: "credential-revoked",
    category: "CREDENTIAL" as NotificationCategory,
    priority: "HIGH",
  },
  "payment.captured": {
    templateSlug: "payment-success",
    category: "PAYMENT" as NotificationCategory,
    priority: "HIGH",
  },
  "payment.failed": {
    templateSlug: "payment-failed",
    category: "PAYMENT" as NotificationCategory,
    priority: "CRITICAL",
  },
  "order.created": {
    templateSlug: "order-created",
    category: "PAYMENT" as NotificationCategory,
    priority: "NORMAL",
  },
  "enrollment.granted": {
    templateSlug: "enrollment-success",
    category: "COURSE" as NotificationCategory,
    priority: "NORMAL",
  },
  "account.locked": {
    templateSlug: "account-locked",
    category: "SECURITY" as NotificationCategory,
    priority: "CRITICAL",
  },
} as const;

export const NOTIFICATION_IN_APP_PROVIDER = "in-app";
export const NOTIFICATION_MAIL_PROVIDER = "mail";
