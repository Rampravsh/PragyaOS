import { Worker, Job, Queue } from "bullmq";
import { config } from "../../../config";
import { logger } from "../../../lib/logger";
import { fulfillmentEvents } from "./fulfillment.events";

export const analyticsQueue = new Queue("analytics-queue", {
  connection: { url: config.redis.url },
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

export class AnalyticsWorker {
  private worker: Worker;

  constructor() {
    this.worker = new Worker(
      "analytics-queue",
      async (job: Job) => {
        const startTime = Date.now();
        const { correlationId, orderId, userId, amount, currency } = job.data;
        logger.info(
          `[Analytics Worker] Processing purchase tracking for User: ${userId} | Correlation: ${correlationId}`
        );

        try {
          // Process tracking payload
          logger.info(
            `📈 [Analytics Worker] Track Purchase - Order: ${orderId} | User: ${userId} | Amount: ${amount} ${currency}`
          );

          fulfillmentEvents.emitAnalyticsQueued({
            version: 1,
            timestamp: new Date().toISOString(),
            correlationId,
            orderId,
            amount,
            currency,
          });

          // Emit health metrics
          const duration = Date.now() - startTime;
          logger.info(
            `📊 [Worker Metrics] [AnalyticsWorker] Duration: ${duration}ms | Retries: ${job.attemptsMade} | Status: SUCCESS`
          );
        } catch (err: any) {
          const duration = Date.now() - startTime;
          logger.error(
            `❌ [Analytics Worker] Failed: ${err.message} | Metrics: duration=${duration}ms, attempts=${job.attemptsMade}`
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

export const analyticsWorker = new AnalyticsWorker();
export default analyticsWorker;
