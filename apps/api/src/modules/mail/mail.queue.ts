import { Queue } from "bullmq";
import { config } from "../../config";
import { MAIL_CONFIG } from "./mail.config";
import { SendEmailJobPayload } from "./mail.types";
import { logger } from "../../lib/logger";

// Parse redis URL or details for BullMQ
export const redisConnection = {
  connection: {
    url: config.redis.url,
  },
};

/**
 * BullMQ Queue Instance for Mail Dispatching
 */
export const mailQueue = new Queue<SendEmailJobPayload>(
  MAIL_CONFIG.queueName,
  {
    connection: {
      url: config.redis.url,
    },
    defaultJobOptions: {
      attempts: 3, // Retry failed emails 3 times
      backoff: {
        type: "exponential",
        delay: 5000, // Wait 5s before first retry
      },
      removeOnComplete: true, // Auto clean metadata upon delivery
      removeOnFail: false, // Save failures for admin debugging
    },
  }
);

logger.info(`🚀 BullMQ mail-queue initialized on Redis: ${config.redis.url}`);
