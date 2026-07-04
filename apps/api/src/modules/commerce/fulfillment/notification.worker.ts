import { Worker, Job, Queue } from "bullmq";
import { config } from "../../../config";
import { logger } from "../../../lib/logger";
import { mailService } from "../../mail/mail.service";
import { fulfillmentEvents } from "./fulfillment.events";

export const notificationQueue = new Queue("notification-queue", {
  connection: { url: config.redis.url },
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

export class NotificationWorker {
  private worker: Worker;

  constructor() {
    this.worker = new Worker(
      "notification-queue",
      async (job: Job) => {
        const startTime = Date.now();
        const {
          correlationId,
          orderId,
          userId,
          email,
          customerName,
          courseTitle = "your purchased course",
        } = job.data;

        logger.info(
          `[Notification Worker] Queueing confirmation emails for User: ${userId} | Correlation: ${correlationId}`
        );

        try {
          // 1. Payment Success Email
          await mailService.send({
            to: email,
            subject: "Payment Received Successfully - PragyaOS",
            html: `<p>Hello ${customerName},</p><p>We have successfully received your payment for order <strong>${orderId}</strong>.</p><p>Thank you for learning with us!</p>`,
          });

          // 2. Enrollment Email
          await mailService.send({
            to: email,
            subject: `Enrolled in: ${courseTitle} - PragyaOS`,
            html: `<p>Hello ${customerName},</p><p>You have been enrolled in the course: <strong>${courseTitle}</strong>.</p><p>Head over to your dashboard to start learning.</p>`,
          });

          // 3. Purchase Confirmation Email
          await mailService.send({
            to: email,
            subject: "Purchase Confirmation - PragyaOS",
            html: `<p>Hello ${customerName},</p><p>This email confirms your purchase for order <strong>${orderId}</strong>.</p><p>Invoice details are logged on your student portal.</p>`,
          });

          logger.info(`✅ [Notification Worker] All emails queued successfully for User: ${userId}`);

          fulfillmentEvents.emitNotificationQueued({
            version: 1,
            timestamp: new Date().toISOString(),
            correlationId,
            orderId,
            userId,
            email,
            jobTypes: ["PAYMENT_SUCCESS_EMAIL", "ENROLLMENT_EMAIL", "PURCHASE_CONFIRMATION"],
          });

          // Emit health metrics
          const duration = Date.now() - startTime;
          logger.info(
            `📊 [Worker Metrics] [NotificationWorker] Duration: ${duration}ms | Retries: ${job.attemptsMade} | Status: SUCCESS`
          );
        } catch (err: any) {
          const duration = Date.now() - startTime;
          logger.error(
            `❌ [Notification Worker] Failed: ${err.message} | Metrics: duration=${duration}ms, attempts=${job.attemptsMade}`
          );
          throw err;
        }
      },
      { connection: { url: config.redis.url } }
    );
  }

  public async close(): Promise<void> {
    await this.worker.close();
  }
}

export const notificationWorker = new NotificationWorker();
export default notificationWorker;
