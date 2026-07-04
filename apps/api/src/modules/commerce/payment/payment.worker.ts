import { Worker, Job, Queue } from "bullmq";
import { config } from "../../../config";
import { logger } from "../../../lib/logger";
import { prisma } from "../../../database/client";
import { paymentService } from "./payment.service";
import { webhookEventRepository } from "./webhook-event.repository";
import { paymentIdempotencyService } from "./payment-idempotency.service";
import { WebhookEventStatus, OrderStatus, PaymentStatus } from "@prisma/client";
import { paymentEvents } from "./payment.events";
import { randomUUID } from "crypto";
import { NormalizedWebhookEvent } from "./payment.webhook";

// Declare downstream queues
export const enrollmentQueue = new Queue("enrollment-queue", {
  connection: { url: config.redis.url },
});

export const invoiceQueue = new Queue("invoice-queue", {
  connection: { url: config.redis.url },
});

export const notificationQueue = new Queue("notification-queue", {
  connection: { url: config.redis.url },
});

export const analyticsQueue = new Queue("analytics-queue", {
  connection: { url: config.redis.url },
});

export class PaymentWorker {
  private worker: Worker<NormalizedWebhookEvent>;

  constructor() {
    this.worker = new Worker<NormalizedWebhookEvent>(
      "payment-queue",
      async (job: Job<NormalizedWebhookEvent>) => {
        const {
          eventId,
          eventType,
          gatewayOrderId,
          gatewayPaymentId,
          errorCode,
          errorDescription,
        } = job.data;

        logger.info(
          `🔄 [Payment Worker] Processing job ${job.id} | EventType: ${eventType} | OrderNo: ${gatewayOrderId}`
        );

        // Fetch Order by receipt / orderNumber mapped on creation
        const order = await prisma.order.findUnique({
          where: { orderNumber: gatewayOrderId },
          include: { items: { include: { product: true } }, payments: true },
        });

        if (!order) {
          logger.error(`❌ [Payment Worker] Order ${gatewayOrderId} not found.`);
          throw new Error(`Order ${gatewayOrderId} not found.`);
        }

        // Locate pending payment attempt
        const attempt = order.payments.find((p) => p.status === PaymentStatus.PENDING);
        if (!attempt) {
          logger.warn(`⚠️ [Payment Worker] No pending payment attempt found for Order ${order.id}.`);
          return;
        }

        const webhookEvent = await webhookEventRepository.findByEventId(eventId);

        try {
          if (eventType === "payment.captured" || eventType === "order.paid") {
            await prisma.$transaction(async (tx) => {
              const ctx = { tx };
              // 1. Transition attempt status
              await paymentService.transitionPaymentAttempt(
                attempt.id,
                "CAPTURED",
                gatewayPaymentId,
                undefined,
                undefined,
                ctx
              );

              // 2. Transition order status
              await paymentService.updateOrderStatus(order.id, OrderStatus.PAID, OrderStatus.CREATED, ctx);

              // 3. Mark webhook as processed
              if (webhookEvent) {
                await webhookEventRepository.updateStatus(
                  webhookEvent.id,
                  WebhookEventStatus.PROCESSED,
                  new Date(),
                  ctx
                );
              }
            });

            // Mark lock key as processed permanently
            const lockKey = `webhook:idempotency:${eventId}`;
            await paymentIdempotencyService.markProcessed(lockKey, 86400 * 7);

            // 4. Enqueue downstream fulfillment jobs
            const courseItem = order.items.find((item) => item.product.sellableType === "COURSE");
            const courseId = courseItem?.product.sellableId;

            const jobsEnqueued: string[] = [];

            if (courseId) {
              await enrollmentQueue.add("grant-enrollment", {
                userId: order.userId,
                courseId,
                orderId: order.id,
                source: "PURCHASE",
              });
              jobsEnqueued.push("enrollment-queue");
            }

            await invoiceQueue.add("generate-invoice", {
              orderId: order.id,
            });
            jobsEnqueued.push("invoice-queue");

            await notificationQueue.add("send-payment-success-notification", {
              userId: order.userId,
              orderId: order.id,
            });
            jobsEnqueued.push("notification-queue");

            await analyticsQueue.add("track-purchase", {
              orderId: order.id,
              userId: order.userId,
              amount: order.netAmount,
              currency: order.currency,
            });
            jobsEnqueued.push("analytics-queue");

            paymentEvents.emitFulfillmentQueued({
              version: 1,
              eventId: randomUUID(),
              timestamp: new Date().toISOString(),
              orderId: order.id,
              userId: order.userId,
              jobsEnqueued,
            });
          } else if (eventType === "payment.failed") {
            await prisma.$transaction(async (tx) => {
              const ctx = { tx };
              // 1. Transition attempt status
              await paymentService.transitionPaymentAttempt(
                attempt.id,
                "FAILED",
                gatewayPaymentId,
                errorCode,
                errorDescription,
                ctx
              );

              // 2. Transition order status
              await paymentService.updateOrderStatus(order.id, OrderStatus.FAILED, OrderStatus.CREATED, ctx);

              // 3. Mark webhook as processed
              if (webhookEvent) {
                await webhookEventRepository.updateStatus(
                  webhookEvent.id,
                  WebhookEventStatus.PROCESSED,
                  new Date(),
                  ctx
                );
              }
            });

            // Mark lock key as processed permanently
            const lockKey = `webhook:idempotency:${eventId}`;
            await paymentIdempotencyService.markProcessed(lockKey, 86400 * 7);
          }
        } catch (err: any) {
          logger.error(`❌ [Payment Worker] Error processing payment for Order ${order.id}: ${err.message}`);
          if (webhookEvent) {
            await webhookEventRepository.updateStatus(webhookEvent.id, WebhookEventStatus.FAILED, new Date());
          }
          // Release the lock key to allow webhook retries
          const lockKey = `webhook:idempotency:${eventId}`;
          await paymentIdempotencyService.releaseLock(lockKey);
          throw err;
        }
      },
      {
        connection: {
          url: config.redis.url,
        },
        concurrency: 2,
      }
    );

    this.setupListeners();
  }

  private setupListeners(): void {
    this.worker.on("completed", (job) => {
      logger.info(`✅ [Payment Worker] Job ${job.id} completed successfully.`);
    });

    this.worker.on("failed", (job, err) => {
      logger.error(`❌ [Payment Worker] Job ${job?.id} failed with error: ${err.message}`);
    });

    this.worker.on("error", (err) => {
      logger.error(`🚨 [Payment Worker] Critical error: ${err.message}`);
    });
  }

  public async close(): Promise<void> {
    await this.worker.close();
  }
}

export const paymentWorker = new PaymentWorker();
export default paymentWorker;
