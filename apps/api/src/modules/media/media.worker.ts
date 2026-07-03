import { Worker, Job } from "bullmq";
import { config } from "../../config";
import { MediaRepository, mediaRepository } from "./media.repository";
import { MediaStatus } from "@prisma/client";
import { logger } from "../../lib/logger";
import { MediaJobPayload } from "./media.queue";

export class MediaWorker {
  private worker: Worker<MediaJobPayload>;

  constructor(private readonly repo: MediaRepository = mediaRepository) {
    this.worker = new Worker<MediaJobPayload>(
      "media-queue",
      async (job: Job<MediaJobPayload>) => {
        const { mediaId, action } = job.data;
        logger.info(`🔄 [Media Worker] Processing job ${job.id} | Action: ${action} | MediaId: ${mediaId}`);

        const media = await this.repo.findById(mediaId);
        if (!media) {
          logger.warn(`⚠️ [Media Worker] Media record ${mediaId} not found in database.`);
          return;
        }

        // Keep the lifecycle realistic: Transition state to PROCESSING
        await this.repo.updateStatus(mediaId, MediaStatus.PROCESSING);
        logger.info(`🔄 [Media Worker] Media ${mediaId} transitioned to PROCESSING.`);

        try {
          // Perform stub processing tasks here (e.g. metadata extraction hooks)
          // In the future, this is where FFmpeg, Sharp, and AI processing will reside.
          await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate async work

          const currentMetadata = (media.metadata as Record<string, any>) || {};
          const updatedMetadata = {
            ...currentMetadata,
            processedAt: new Date().toISOString(),
            processedSuccess: true,
          };

          // Successfully processed -> Transition status to READY
          await this.repo.updateStatus(mediaId, MediaStatus.READY, updatedMetadata);
          logger.info(`✅ [Media Worker] Media ${mediaId} processing completed successfully and is READY.`);
        } catch (error: any) {
          logger.error(`❌ [Media Worker] Failed processing media ${mediaId}: ${error.message}`);
          await this.repo.updateStatus(mediaId, MediaStatus.FAILED, {
            failureReason: error.message,
            failedAt: new Date().toISOString(),
          });
          throw error;
        }
      },
      {
        connection: {
          url: config.redis.url,
        },
        concurrency: 2, // Concurrent media processors
      }
    );

    this.setupListeners();
  }

  private setupListeners(): void {
    this.worker.on("completed", (job) => {
      logger.info(`✅ [Media Worker] Job ${job.id} completed successfully.`);
    });

    this.worker.on("failed", (job, err) => {
      logger.error(`❌ [Media Worker] Job ${job?.id} failed with error: ${err.message}`);
    });

    this.worker.on("error", (err) => {
      logger.error(`🚨 [Media Worker] Critical error: ${err.message}`);
    });
  }

  /**
   * Gracefully closes the worker connection.
   */
  public async close(): Promise<void> {
    await this.worker.close();
  }
}

export const mediaWorker = new MediaWorker();
export default mediaWorker;
