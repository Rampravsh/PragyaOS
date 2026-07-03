import { Queue } from "bullmq";
import { config } from "../../config";
import { logger } from "../../lib/logger";

export interface MediaJobPayload {
  mediaId: string;
  action: "PROCESS" | "DEDUPLICATE" | "DELETE";
}

/**
 * BullMQ Queue Instance for Media Processing
 */
export const mediaQueue = new Queue<MediaJobPayload>(
  "media-queue",
  {
    connection: {
      url: config.redis.url,
    },
    defaultJobOptions: {
      attempts: 3, // Retry failed media processing 3 times
      backoff: {
        type: "exponential",
        delay: 5000, // Wait 5s before first retry
      },
      removeOnComplete: true, // Auto clean metadata upon completion
      removeOnFail: false, // Save failures for debugging
    },
  }
);

logger.info(`🚀 BullMQ media-queue initialized on Redis: ${config.redis.url}`);
