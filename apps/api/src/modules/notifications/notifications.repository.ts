import {
  Prisma,
  NotificationTemplate,
  Notification,
  NotificationPreference,
  NotificationDelivery,
  NotificationChannel,
  NotificationStatus,
} from "@prisma/client";
import { prisma } from "../../database/client";
import {
  NotificationTemplateRepository,
  NotificationRepository,
  NotificationPreferenceRepository,
  NotificationDeliveryRepository,
  NotificationListQuery,
  NotificationPreferenceInput,
  RepositoryContext,
} from "./notifications.types";

// ──────────────────────────────────────────────────────────────────
// Template Repository
// ──────────────────────────────────────────────────────────────────
export class PrismaNotificationTemplateRepository implements NotificationTemplateRepository {
  private getClient(ctx?: RepositoryContext) {
    return ctx?.tx || prisma;
  }

  public async findActiveBySlug(
    slug: string,
    channel: NotificationChannel,
    locale = "en",
    ctx?: RepositoryContext
  ): Promise<NotificationTemplate | null> {
    // Try exact locale first, then fallback to "en"
    const result = await this.getClient(ctx).notificationTemplate.findFirst({
      where: { slug, channel, active: true, locale },
      orderBy: { version: "desc" },
    });
    if (result || locale === "en") return result;

    return this.getClient(ctx).notificationTemplate.findFirst({
      where: { slug, channel, active: true, locale: "en" },
      orderBy: { version: "desc" },
    });
  }

  public async create(data: Prisma.NotificationTemplateCreateInput, ctx?: RepositoryContext): Promise<NotificationTemplate> {
    return this.getClient(ctx).notificationTemplate.create({ data });
  }
}

// ──────────────────────────────────────────────────────────────────
// Notification Repository
// ──────────────────────────────────────────────────────────────────
export class PrismaNotificationRepository implements NotificationRepository {
  private getClient(ctx?: RepositoryContext) {
    return ctx?.tx || prisma;
  }

  public async findByUser(
    userId: string,
    query: NotificationListQuery,
    ctx?: RepositoryContext
  ): Promise<{ items: Notification[]; total: number }> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const where: Prisma.NotificationWhereInput = {
      userId,
      ...(query.status ? { status: query.status as NotificationStatus } : {}),
    };

    const [items, total] = await Promise.all([
      this.getClient(ctx).notification.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.getClient(ctx).notification.count({ where }),
    ]);

    return { items, total };
  }

  public async findById(id: string, ctx?: RepositoryContext): Promise<Notification | null> {
    return this.getClient(ctx).notification.findUnique({ where: { id } });
  }

  public async findByDedupeKey(dedupeKey: string, ctx?: RepositoryContext): Promise<Notification | null> {
    return this.getClient(ctx).notification.findUnique({ where: { dedupeKey } });
  }

  public async countUnread(userId: string, ctx?: RepositoryContext): Promise<number> {
    return this.getClient(ctx).notification.count({
      where: { userId, status: { notIn: ["READ", "FAILED"] } },
    });
  }

  public async create(data: Prisma.NotificationUncheckedCreateInput, ctx?: RepositoryContext): Promise<Notification> {
    return this.getClient(ctx).notification.create({ data });
  }

  public async update(id: string, data: Prisma.NotificationUpdateInput, ctx?: RepositoryContext): Promise<Notification> {
    return this.getClient(ctx).notification.update({ where: { id }, data });
  }

  public async markRead(id: string, userId: string, ctx?: RepositoryContext): Promise<Notification> {
    return this.getClient(ctx).notification.update({
      where: { id, userId },
      data: { status: "READ", readAt: new Date(), revision: { increment: 1 } },
    });
  }

  public async markAllRead(userId: string, ctx?: RepositoryContext): Promise<number> {
    const result = await this.getClient(ctx).notification.updateMany({
      where: { userId, status: { notIn: ["READ", "FAILED"] } },
      data: { status: "READ", readAt: new Date() },
    });
    return result.count;
  }
}

// ──────────────────────────────────────────────────────────────────
// Preference Repository
// ──────────────────────────────────────────────────────────────────
export class PrismaNotificationPreferenceRepository implements NotificationPreferenceRepository {
  private getClient(ctx?: RepositoryContext) {
    return ctx?.tx || prisma;
  }

  public async findByUser(userId: string, ctx?: RepositoryContext): Promise<NotificationPreference | null> {
    return this.getClient(ctx).notificationPreference.findUnique({ where: { userId } });
  }

  public async upsert(userId: string, data: Partial<NotificationPreferenceInput>, ctx?: RepositoryContext): Promise<NotificationPreference> {
    return this.getClient(ctx).notificationPreference.upsert({
      where: { userId },
      create: {
        userId,
        channelPreferences: (data.channelPreferences ?? {}) as any,
        categoryPreferences: (data.categoryPreferences ?? {}) as any,
        marketingOptIn: data.marketingOptIn ?? true,
        digestEnabled: data.digestEnabled ?? false,
      },
      update: {
        ...(data.channelPreferences !== undefined ? { channelPreferences: data.channelPreferences as any } : {}),
        ...(data.categoryPreferences !== undefined ? { categoryPreferences: data.categoryPreferences as any } : {}),
        ...(data.marketingOptIn !== undefined ? { marketingOptIn: data.marketingOptIn } : {}),
        ...(data.digestEnabled !== undefined ? { digestEnabled: data.digestEnabled } : {}),
      },
    });
  }
}

// ──────────────────────────────────────────────────────────────────
// Delivery Repository
// ──────────────────────────────────────────────────────────────────
export class PrismaNotificationDeliveryRepository implements NotificationDeliveryRepository {
  private getClient(ctx?: RepositoryContext) {
    return ctx?.tx || prisma;
  }

  public async create(data: Prisma.NotificationDeliveryUncheckedCreateInput, ctx?: RepositoryContext): Promise<NotificationDelivery> {
    return this.getClient(ctx).notificationDelivery.create({ data });
  }

  public async update(id: string, data: Prisma.NotificationDeliveryUpdateInput, ctx?: RepositoryContext): Promise<NotificationDelivery> {
    return this.getClient(ctx).notificationDelivery.update({ where: { id }, data });
  }
}

// Singleton instances
export const notificationTemplateRepository = new PrismaNotificationTemplateRepository();
export const notificationRepository = new PrismaNotificationRepository();
export const notificationPreferenceRepository = new PrismaNotificationPreferenceRepository();
export const notificationDeliveryRepository = new PrismaNotificationDeliveryRepository();
