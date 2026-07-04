import { Queue } from "bullmq";
import { config } from "../../config";
import { SEARCH_CONFIG } from "../../config/search";
import { SearchIndexJobPayload } from "./search.types";
import { logger } from "../../lib/logger";

export const searchIndexerQueue = new Queue<SearchIndexJobPayload>(
  SEARCH_CONFIG.queueName,
  {
    connection: { url: config.redis.url },
    defaultJobOptions: {
      attempts: SEARCH_CONFIG.retry.attempts,
      backoff: {
        type: "exponential",
        delay: SEARCH_CONFIG.retry.backoffDelay,
      },
      removeOnComplete: true, // Auto clean metadata upon delivery
      removeOnFail: false, // Save failures for admin debugging / dead-letter
    },
  }
);

logger.info(`🚀 BullMQ ${SEARCH_CONFIG.queueName} initialized on Redis: ${config.redis.url}`);
