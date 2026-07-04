import { Notification, NotificationPreference } from "@prisma/client";

export class NotificationsMapper {
  public static toNotificationDTO(n: Notification) {
    return {
      id: n.id,
      title: n.title,
      body: n.body,
      category: n.category,
      priority: n.priority,
      channel: n.channel,
      status: n.status,
      payload: n.payload,
      correlationId: n.correlationId,
      scheduledAt: n.scheduledAt,
      deliveredAt: n.deliveredAt,
      readAt: n.readAt,
      expiresAt: n.expiresAt,
      createdAt: n.createdAt,
    };
  }

  public static toNotificationDTOs(items: Notification[]) {
    return items.map((n) => this.toNotificationDTO(n));
  }

  public static toPreferenceDTO(p: any) {
    return {
      userId: p.userId,
      channelPreferences: p.channelPreferences,
      categoryPreferences: p.categoryPreferences,
      marketingOptIn: p.marketingOptIn,
      digestEnabled: p.digestEnabled,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    };
  }
}
