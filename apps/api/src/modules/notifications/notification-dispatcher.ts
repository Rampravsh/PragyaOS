import { createHash } from "crypto";
import { randomUUID } from "crypto";
import {
  NotificationChannel,
  NotificationCategory,
  NotificationPriority,
  NotificationStatus,
} from "@prisma/client";
import { logger } from "../../lib/logger";
import {
  DispatchContext,
  InAppPublisher,
  NotificationTemplateRepository,
  NotificationRepository,
  NotificationPreferenceRepository,
  NotificationDeliveryRepository,
} from "./notifications.types";
import {
  notificationTemplateRepository,
  notificationRepository,
  notificationPreferenceRepository,
  notificationDeliveryRepository,
  PrismaNotificationTemplateRepository,
  PrismaNotificationRepository,
  PrismaNotificationPreferenceRepository,
  PrismaNotificationDeliveryRepository,
} from "./notifications.repository";
import { NotificationRenderer, notificationRenderer } from "./notification-renderer";
import { notificationInAppQueue } from "./notification-inapp.queue";
import { NotificationTemplate } from "@prisma/client";
import {
  UNCANCELLABLE_CATEGORIES,
  NOTIFICATION_IN_APP_PROVIDER,
} from "./notifications.constants";

/**
 * Default InAppPublisher — writes DELIVERED status directly to DB.
 * Swap in a WebSocket/SSE publisher in a future milestone by injecting
 * a different implementation.
 */
class DbInAppPublisher implements InAppPublisher {
  constructor(private readonly notifications: PrismaNotificationRepository) {}

  public async publish(notificationId: string, userId: string): Promise<void> {
    await this.notifications.update(notificationId, {
      status: "DELIVERED" as NotificationStatus,
      deliveredAt: new Date(),
      revision: { increment: 1 },
    });
    logger.info(`[InAppPublisher] Delivered notification ${notificationId} to user ${userId}`);
  }
}

/**
 * In-memory template cache to avoid repeated DB lookups.
 * Keyed by "slug:channel:locale".
 */
class TemplateCache {
  private cache = new Map<string, NotificationTemplate>();

  public get(slug: string, channel: string, locale: string): NotificationTemplate | undefined {
    return this.cache.get(`${slug}:${channel}:${locale}`);
  }

  public set(slug: string, channel: string, locale: string, template: NotificationTemplate): void {
    this.cache.set(`${slug}:${channel}:${locale}`, template);
  }

  public invalidate(slug: string): void {
    for (const key of this.cache.keys()) {
      if (key.startsWith(`${slug}:`)) this.cache.delete(key);
    }
  }

  public clear(): void {
    this.cache.clear();
  }
}

export const templateCache = new TemplateCache();

/**
 * NotificationDispatcher — the core orchestrator that turns a DispatchContext
 * into a persisted Notification + queued delivery job.
 */
export class NotificationDispatcher {
  constructor(
    private readonly templates: NotificationTemplateRepository = notificationTemplateRepository,
    private readonly notifications: PrismaNotificationRepository = notificationRepository,
    private readonly preferences: NotificationPreferenceRepository = notificationPreferenceRepository,
    private readonly deliveries: NotificationDeliveryRepository = notificationDeliveryRepository,
    private readonly renderer: NotificationRenderer = notificationRenderer,
    private readonly inAppPublisher: InAppPublisher = new DbInAppPublisher(notificationRepository)
  ) {}

  /**
   * Dispatches a notification from a domain event context.
   */
  public async dispatch(ctx: DispatchContext): Promise<void> {
    try {
      // 1. Deduplication check
      const dedupeKey = this.buildDedupeKey(ctx.userId, ctx.eventId, ctx.templateSlug);
      const existing = await this.notifications.findByDedupeKey(dedupeKey);
      if (existing) {
        logger.info(
          `[Dispatcher] Skipping duplicate notification. dedupeKey=${dedupeKey} existingId=${existing.id}`
        );
        return;
      }

      // 2. Preference check (bypass for uncancellable categories)
      if (!this.isUncancellable(ctx.category)) {
        const allowed = await this.isChannelEnabled(ctx.userId, ctx.channel, ctx.category);
        if (!allowed) {
          logger.info(
            `[Dispatcher] Skipping suppressed notification. userId=${ctx.userId} category=${ctx.category} channel=${ctx.channel}`
          );
          return;
        }
      }

      // 3. Resolve and render template (with cache)
      const template = await this.resolveTemplate(ctx.templateSlug, ctx.channel);
      if (!template) {
        logger.warn(
          `[Dispatcher] Template not found: slug=${ctx.templateSlug} channel=${ctx.channel}. Skipping dispatch.`
        );
        return;
      }

      const rendered = this.renderer.render(template, ctx.variables);

      // 4. Persist Notification record
      const notification = await this.notifications.create({
        userId: ctx.userId,
        templateId: template.id,
        dedupeKey,
        title: rendered.title,
        body: rendered.body,
        category: ctx.category,
        priority: ctx.priority,
        channel: ctx.channel,
        status: "QUEUED" as NotificationStatus,
        payload: (ctx.payload ?? {}) as any,
        correlationId: ctx.correlationId ?? null,
        scheduledAt: ctx.scheduledAt ?? null,
      });

      // 5. Create initial delivery audit record
      const delivery = await this.deliveries.create({
        notificationId: notification.id,
        provider: NOTIFICATION_IN_APP_PROVIDER,
        retryCount: 0,
      });

      // 6. Enqueue job with optional delay for scheduled notifications
      const delay = ctx.scheduledAt
        ? Math.max(0, ctx.scheduledAt.getTime() - Date.now())
        : undefined;

      await notificationInAppQueue.add(
        "deliver-inapp",
        { notificationId: notification.id, userId: ctx.userId, deliveryId: delivery.id },
        { jobId: notification.id, ...(delay ? { delay } : {}) }
      );

      logger.info(
        `[Dispatcher] Queued in-app notification ${notification.id} for user ${ctx.userId}${delay ? ` (delayed ${delay}ms)` : ""}`
      );
    } catch (error: any) {
      logger.error(`[Dispatcher] Failed to dispatch notification: ${error.message}`, {
        userId: ctx.userId,
        templateSlug: ctx.templateSlug,
        error: error.stack,
      });
      // Dispatcher never throws — failures are logged but do not crash event consumers
    }
  }

  private buildDedupeKey(userId: string, eventId: string, templateSlug: string): string {
    return createHash("sha256")
      .update(`${userId}:${eventId}:${templateSlug}`)
      .digest("hex");
  }

  private isUncancellable(category: NotificationCategory): boolean {
    return UNCANCELLABLE_CATEGORIES.has(category);
  }

  private async isChannelEnabled(
    userId: string,
    channel: NotificationChannel,
    category: NotificationCategory
  ): Promise<boolean> {
    const prefs = await this.preferences.findByUser(userId);
    if (!prefs) return true; // Default: all enabled

    const categoryPrefs = prefs.categoryPreferences as Record<string, boolean>;
    if (category in categoryPrefs && categoryPrefs[category] === false) return false;

    const channelPrefs = prefs.channelPreferences as Record<string, boolean>;
    if (channel in channelPrefs && channelPrefs[channel] === false) return false;

    return true;
  }

  private async resolveTemplate(
    slug: string,
    channel: NotificationChannel,
    locale = "en"
  ): Promise<NotificationTemplate | null> {
    // Check in-memory cache first
    const cached = templateCache.get(slug, channel, locale);
    if (cached) return cached;

    // DB lookup with locale fallback
    const template = await this.templates.findActiveBySlug(slug, channel, locale);
    if (template) {
      templateCache.set(slug, channel, locale, template);
    }
    return template;
  }
}

export const notificationDispatcher = new NotificationDispatcher();
export default notificationDispatcher;
