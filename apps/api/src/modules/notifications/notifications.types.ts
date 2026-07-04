import {
  Prisma,
  NotificationTemplate,
  Notification,
  NotificationPreference,
  NotificationDelivery,
  NotificationChannel,
  NotificationCategory,
  NotificationPriority,
} from "@prisma/client";

export interface RepositoryContext {
  tx?: Prisma.TransactionClient;
}

// ──────────────────────────────────────────────────────────────────
// Repository interfaces
// ──────────────────────────────────────────────────────────────────

export interface NotificationTemplateRepository {
  findActiveBySlug(slug: string, channel: NotificationChannel, locale?: string, ctx?: RepositoryContext): Promise<NotificationTemplate | null>;
  create(data: Prisma.NotificationTemplateCreateInput, ctx?: RepositoryContext): Promise<NotificationTemplate>;
}

export interface NotificationRepository {
  findByUser(userId: string, query: NotificationListQuery, ctx?: RepositoryContext): Promise<{ items: Notification[]; total: number }>;
  findById(id: string, ctx?: RepositoryContext): Promise<Notification | null>;
  findByDedupeKey(dedupeKey: string, ctx?: RepositoryContext): Promise<Notification | null>;
  countUnread(userId: string, ctx?: RepositoryContext): Promise<number>;
  create(data: Prisma.NotificationUncheckedCreateInput, ctx?: RepositoryContext): Promise<Notification>;
  update(id: string, data: Prisma.NotificationUpdateInput, ctx?: RepositoryContext): Promise<Notification>;
  markRead(id: string, userId: string, ctx?: RepositoryContext): Promise<Notification>;
  markAllRead(userId: string, ctx?: RepositoryContext): Promise<number>;
}

export interface NotificationPreferenceRepository {
  findByUser(userId: string, ctx?: RepositoryContext): Promise<NotificationPreference | null>;
  upsert(userId: string, data: Partial<NotificationPreferenceInput>, ctx?: RepositoryContext): Promise<NotificationPreference>;
}

export interface NotificationDeliveryRepository {
  create(data: Prisma.NotificationDeliveryUncheckedCreateInput, ctx?: RepositoryContext): Promise<NotificationDelivery>;
  update(id: string, data: Prisma.NotificationDeliveryUpdateInput, ctx?: RepositoryContext): Promise<NotificationDelivery>;
}

// ──────────────────────────────────────────────────────────────────
// Domain types
// ──────────────────────────────────────────────────────────────────

export interface DispatchContext {
  userId: string;
  eventId: string;
  templateSlug: string;
  channel: NotificationChannel;
  category: NotificationCategory;
  priority: NotificationPriority;
  variables: Record<string, string>;
  correlationId?: string;
  scheduledAt?: Date;
  payload?: Record<string, any>;
}

export interface RenderedNotification {
  title: string;
  body: string;
}

export interface InAppNotificationJob {
  notificationId: string;
  userId: string;
  deliveryId: string;
}

export interface NotificationListQuery {
  page?: number;
  limit?: number;
  status?: string;
}

export interface NotificationPreferenceInput {
  channelPreferences?: Record<string, boolean>;
  categoryPreferences?: Record<string, boolean>;
  marketingOptIn?: boolean;
  digestEnabled?: boolean;
}

/**
 * Abstraction for in-app delivery — swap in WebSocket/SSE in a later milestone.
 */
export interface InAppPublisher {
  publish(notificationId: string, userId: string): Promise<void>;
}
