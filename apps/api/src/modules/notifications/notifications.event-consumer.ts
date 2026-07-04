import { randomUUID } from "crypto";
import { logger } from "../../lib/logger";
import { notificationDispatcher } from "./notification-dispatcher";
import { credentialsEvents } from "../credentials/credentials.events";
import { EVENT_TEMPLATE_MAP } from "./notifications.constants";
import { NotificationChannel, NotificationPriority } from "@prisma/client";

/**
 * NotificationEventConsumer subscribes to cross-domain EventEmitters at bootstrap.
 * It maps domain events → NotificationDispatcher.dispatch() calls.
 * No existing module is modified by this consumer.
 */
export class NotificationEventConsumer {
  constructor(
    private readonly dispatcher = notificationDispatcher
  ) {
    this.registerListeners();
  }

  private registerListeners(): void {
    // ── Credentials Domain ─────────────────────────────────────────
    credentialsEvents.on("credential.issued", (payload: any) => {
      this.handle("credential.issued", payload.userId, payload.eventId, {
        credentialNumber: payload.credentialNumber,
        courseId: payload.courseId,
      }, payload.credentialId);
    });

    credentialsEvents.on("credential.revoked", (payload: any) => {
      this.handle("credential.revoked", payload.revokedBy ?? payload.userId, payload.eventId, {
        credentialId: payload.credentialId,
        reason: payload.reason ?? "Administrative action",
      }, payload.credentialId);
    });

    logger.info("🔌 [NotificationEventConsumer] Registered listeners for: credentials domain");
  }

  private handle(
    eventName: keyof typeof EVENT_TEMPLATE_MAP,
    userId: string,
    eventId: string,
    variables: Record<string, string>,
    correlationId?: string
  ): void {
    const mapping = EVENT_TEMPLATE_MAP[eventName];
    if (!mapping) {
      logger.warn(`[NotificationEventConsumer] No template mapping for event: ${eventName}`);
      return;
    }

    this.dispatcher
      .dispatch({
        userId,
        eventId: eventId ?? randomUUID(),
        templateSlug: mapping.templateSlug,
        channel: NotificationChannel.IN_APP,
        category: mapping.category,
        priority: mapping.priority as NotificationPriority,
        variables,
        correlationId,
      })
      .catch((err) =>
        logger.error(`[NotificationEventConsumer] Unhandled dispatch error for ${eventName}: ${err.message}`)
      );
  }
}

export const notificationEventConsumer = new NotificationEventConsumer();
export default notificationEventConsumer;
