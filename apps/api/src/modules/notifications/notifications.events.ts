import { EventEmitter } from "events";
import { logger } from "../../lib/logger";

export interface NotificationDispatchedPayload {
  version: 1;
  eventId: string;
  timestamp: string;
  notificationId: string;
  userId: string;
  channel: string;
  templateSlug: string;
  correlationId?: string;
}

export interface NotificationReadPayload {
  version: 1;
  eventId: string;
  timestamp: string;
  notificationId: string;
  userId: string;
}

export class NotificationsEventEmitter extends EventEmitter {
  public emitNotificationDispatched(payload: NotificationDispatchedPayload): void {
    logger.info(`[Notifications Event] Dispatched notificationId: ${payload.notificationId} → channel: ${payload.channel}`);
    this.emit("notification.dispatched", payload);
  }

  public emitNotificationRead(payload: NotificationReadPayload): void {
    logger.info(`[Notifications Event] Read notificationId: ${payload.notificationId} by userId: ${payload.userId}`);
    this.emit("notification.read", payload);
  }
}

export const notificationsEvents = new NotificationsEventEmitter();
export default notificationsEvents;
