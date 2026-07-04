import { Worker, Job } from "bullmq";
import { config } from "../../config";
import { NOTIFICATION_QUEUE_NAMES } from "./notifications.constants";
import { InAppNotificationJob } from "./notifications.types";
import { notificationRepository, notificationDeliveryRepository } from "./notifications.repository";
import { logger } from "../../lib/logger";

export class NotificationInAppWorker {
  private worker: Worker<InAppNotificationJob>;

  constructor(
    private readonly notifications = notificationRepository,
    private readonly deliveries = notificationDeliveryRepository
  ) {
    this.worker = new Worker<InAppNotificationJob>(
      NOTIFICATION_QUEUE_NAMES.IN_APP,
      async (job: Job<InAppNotificationJob>) => {
        const { notificationId, userId, deliveryId } = job.data;
        logger.info(`[InAppWorker] Processing job ${job.id} for notification ${notificationId}`);

        // Check scheduledAt — job was already delayed by dispatcher, so this is a safety guard
        const notification = await this.notifications.findById(notificationId);
        if (!notification) {
          logger.warn(`[InAppWorker] Notification ${notificationId} not found. Skipping.`);
          return;
        }

        if (notification.scheduledAt && notification.scheduledAt > new Date()) {
          logger.info(`[InAppWorker] Notification ${notificationId} is scheduled for future. Re-queuing.`);
          throw new Error("Notification not yet due"); // BullMQ will retry with backoff
        }

        // Mark as DELIVERED
        await this.notifications.update(notificationId, {
          status: "DELIVERED",
          deliveredAt: new Date(),
          revision: { increment: 1 },
        });

        // Update delivery record
        await this.deliveries.update(deliveryId, {
          providerStatus: "delivered",
          deliveredAt: new Date(),
        });

        logger.info(`[InAppWorker] Delivered notification ${notificationId} to user ${userId}`);
      },
      {
        connection: { url: config.redis.url },
        concurrency: 10,
      }
    );

    this.setupListeners();
  }

  private setupListeners(): void {
    this.worker.on("completed", (job) => {
      logger.info(`✅ [InAppWorker] Job ${job.id} completed.`);
    });

    this.worker.on("failed", (job, err) => {
      logger.error(`❌ [InAppWorker] Job ${job?.id} failed: ${err.message}`);
      // Update delivery record with failure reason
      if (job?.data?.deliveryId) {
        this.deliveries
          .update(job.data.deliveryId, {
            failureReason: err.message,
            retryCount: job.attemptsMade,
          })
          .catch((e) => logger.error(`[InAppWorker] Failed to update delivery record: ${e.message}`));
      }
    });

    this.worker.on("error", (err) => {
      logger.error(`🚨 [InAppWorker] Critical error: ${err.message}`);
    });
  }

  public async close(): Promise<void> {
    await this.worker.close();
  }
}

export const notificationInAppWorker = new NotificationInAppWorker();
