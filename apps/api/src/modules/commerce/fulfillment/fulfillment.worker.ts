import { Worker, Job } from "bullmq";
import { config } from "../../../config";
import { logger } from "../../../lib/logger";
import { FulfillmentStatus } from "@prisma/client";
import { FULFILLMENT_QUEUES, FULFILLMENT_STEPS } from "./fulfillment.constants";
import { FulfillmentJobData } from "./fulfillment.types";
import { fulfillmentService } from "./fulfillment.service";
import { fulfillmentEvents } from "./fulfillment.events";
import { randomUUID } from "crypto";

import { enrollmentQueue } from "./enrollment.worker";
import { invoiceQueue } from "./invoice.worker";
import { notificationQueue } from "./notification.worker";
import { analyticsQueue } from "./analytics.worker";
import { userRepository } from "../../users/user.repository";
import { courseRepository } from "../../courses/course.repository";

export class FulfillmentWorker {
  private worker: Worker<FulfillmentJobData>;

  constructor() {
    this.worker = new Worker<FulfillmentJobData>(
      FULFILLMENT_QUEUES.FULFILLMENT,
      async (job: Job<FulfillmentJobData>) => {
        const startTime = Date.now();
        const { correlationId, orderId, paymentAttemptId, userId, amount, currency, courseId } = job.data;

        logger.info(
          `🔄 [Fulfillment Worker] Starting fulfillment for Order: ${orderId} | Correlation: ${correlationId}`
        );

        try {
          // 1. Transition execution status to STARTED
          await fulfillmentService.startFulfillment(orderId, FULFILLMENT_STEPS.ENROLLMENT);

          // 2. Emit FulfillmentStarted event
          fulfillmentEvents.emitFulfillmentStarted({
            version: 1,
            timestamp: new Date().toISOString(),
            correlationId,
            orderId,
            paymentAttemptId,
            userId,
          });

          // Fetch user details to pass to notification worker using repository
          const user = await userRepository.findById(userId);
          const email = user?.email || "student@pragyaos.com";
          const customerName = user ? `${user.firstName} ${user.lastName}`.trim() : "Student";

          // Fetch course details using repository
          let courseTitle = "your purchased course";
          if (courseId) {
            const course = await courseRepository.findById(courseId);
            if (course) courseTitle = course.title;
          }

          // 3. Dispatch Downstream Jobs with correlation IDs and trace payloads
          logger.info(`📥 [Fulfillment Worker] Enqueuing downstream jobs for Order: ${orderId}`);

          if (courseId) {
            await enrollmentQueue.add("grant-enrollment", {
              correlationId,
              orderId,
              paymentAttemptId,
              userId,
              courseId,
            });
          }

          await invoiceQueue.add("generate-invoice", {
            correlationId,
            orderId,
            paymentAttemptId,
            userId,
            amount,
            currency,
            courseId,
          });

          await notificationQueue.add("send-notifications", {
            correlationId,
            orderId,
            paymentAttemptId,
            userId,
            email,
            customerName,
            courseTitle,
          });

          await analyticsQueue.add("track-purchase", {
            correlationId,
            orderId,
            paymentAttemptId,
            userId,
            amount,
            currency,
          });

          // 4. Update status to COMPLETED (delegated successfully)
          await fulfillmentService.completeFulfillment(orderId);

          fulfillmentEvents.emitFulfillmentCompleted({
            version: 1,
            timestamp: new Date().toISOString(),
            correlationId,
            orderId,
            userId,
            durationMs: Date.now() - startTime,
          });

          // Emit health metrics
          const duration = Date.now() - startTime;
          logger.info(
            `📊 [Worker Metrics] [FulfillmentWorker] Duration: ${duration}ms | Retries: ${job.attemptsMade} | Status: SUCCESS`
          );
        } catch (err: any) {
          const duration = Date.now() - startTime;
          logger.error(
            `❌ [Fulfillment Worker] Core workflow failed: ${err.message} | Metrics: duration=${duration}ms`
          );
          
          await fulfillmentService.failFulfillment(orderId, err.message, "ORCHESTRATION");
          
          fulfillmentEvents.emitFulfillmentFailed({
            version: 1,
            timestamp: new Date().toISOString(),
            correlationId,
            orderId,
            userId,
            failedStep: "ORCHESTRATION",
            errorMessage: err.message,
          });
          
          throw err;
        }
      },
      {
        connection: { url: config.redis.url },
        concurrency: 2,
      }
    );

    this.setupListeners();
  }

  private setupListeners(): void {
    this.worker.on("completed", (job) => {
      logger.info(`✅ [Fulfillment Worker] Job ${job.id} completed successfully.`);
    });

    this.worker.on("failed", (job, err) => {
      logger.error(`❌ [Fulfillment Worker] Job ${job?.id} failed with error: ${err.message}`);
    });

    this.worker.on("error", (err) => {
      logger.error(`🚨 [Fulfillment Worker] Critical error: ${err.message}`);
    });
  }

  public async close(): Promise<void> {
    await this.worker.close();
  }
}

export const fulfillmentWorker = new FulfillmentWorker();
export default fulfillmentWorker;
