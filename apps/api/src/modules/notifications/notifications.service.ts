import { AppError } from "../../common/errors/appError";
import { logger } from "../../lib/logger";
import {
  notificationRepository,
  notificationPreferenceRepository,
  PrismaNotificationRepository,
  PrismaNotificationPreferenceRepository,
} from "./notifications.repository";
import { ListNotificationsQuery, UpdatePreferencesInput } from "./notifications.schemas";

export class NotificationService {
  constructor(
    private readonly notifications: PrismaNotificationRepository = notificationRepository,
    private readonly preferences: PrismaNotificationPreferenceRepository = notificationPreferenceRepository
  ) {}

  public async getUserNotifications(userId: string, query: ListNotificationsQuery) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const { items, total } = await this.notifications.findByUser(userId, { page, limit, status: query.status });

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  public async getUnreadCount(userId: string): Promise<number> {
    return this.notifications.countUnread(userId);
  }

  public async markAsRead(notificationId: string, userId: string) {
    const notification = await this.notifications.findById(notificationId);
    if (!notification) {
      throw AppError.notFound(`Notification '${notificationId}' not found.`);
    }
    if (notification.userId !== userId) {
      throw AppError.forbidden("You do not have permission to access this notification.");
    }
    if (notification.status === "READ") {
      return notification; // Already read — idempotent
    }
    return this.notifications.markRead(notificationId, userId);
  }

  public async markAllAsRead(userId: string): Promise<{ count: number }> {
    const count = await this.notifications.markAllRead(userId);
    logger.info(`[NotificationService] Marked ${count} notifications as read for user ${userId}`);
    return { count };
  }

  public async getPreferences(userId: string) {
    const prefs = await this.preferences.findByUser(userId);
    if (prefs) return prefs;

    // Return sensible defaults without writing to DB
    return {
      userId,
      channelPreferences: {},
      categoryPreferences: {},
      marketingOptIn: true,
      digestEnabled: false,
    };
  }

  public async updatePreferences(userId: string, input: UpdatePreferencesInput) {
    return this.preferences.upsert(userId, input);
  }
}

export const notificationService = new NotificationService();
export default notificationService;
