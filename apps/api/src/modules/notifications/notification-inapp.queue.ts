import { Queue } from "bullmq";
import { config } from "../../config";
import { NOTIFICATION_QUEUE_NAMES } from "./notifications.constants";
import { InAppNotificationJob } from "./notifications.types";
import { logger } from "../../lib/logger";

export const notificationInAppQueue = new Queue<InAppNotificationJob>(
  NOTIFICATION_QUEUE_NAMES.IN_APP,
  {
    connection: { url: config.redis.url },
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: "exponential", delay: 5000 },
      removeOnComplete: true,
      removeOnFail: false,
    },
  }
);

logger.info(`🚀 BullMQ ${NOTIFICATION_QUEUE_NAMES.IN_APP} initialized on Redis: ${config.redis.url}`);
