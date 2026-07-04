import { randomUUID } from "crypto";
import { logger } from "../../lib/logger";
import { searchSyncLogRepository } from "./search.repository";
import { searchIndexerQueue } from "./search.queue";
import { courseEvents } from "../courses/course.events";
import { categoryEvents } from "../categories/category.events";
import { userEventBus } from "../users/user.events";
import { USER_CONSTANTS } from "../users/user.constants";
import { SearchSyncStatus } from "@prisma/client";

/**
 * SearchEventConsumer listens to domain events and creates search sync logs,
 * pushing indexing tasks onto the BullMQ search-indexer-queue.
 */
export class SearchEventConsumer {
  constructor(
    private readonly logs = searchSyncLogRepository,
    private readonly queue = searchIndexerQueue
  ) {
    this.registerListeners();
  }

  private registerListeners(): void {
    // ── Courses Event Listeners ────────────────────────────────────
    courseEvents.on("course.published", async (payload: any) => {
      await this.enqueueJob("courses", payload.courseId, "CREATE");
    });

    courseEvents.on("course.updated", async (payload: any) => {
      await this.enqueueJob("courses", payload.courseId, "UPDATE");
    });

    courseEvents.on("course.archived", async (payload: any) => {
      await this.enqueueJob("courses", payload.courseId, "DELETE");
    });

    // ── Categories Event Listeners ─────────────────────────────────
    categoryEvents.on("category.updated", async (payload: any) => {
      await this.enqueueJob("categories", payload.categoryId, "UPDATE");
    });

    categoryEvents.on("category.deleted", async (payload: any) => {
      await this.enqueueJob("categories", payload.categoryId, "DELETE");
    });

    // ── Users (Instructors) Event Listeners ────────────────────────
    userEventBus.on(USER_CONSTANTS.EVENTS.USER_UPDATED, async (payload: any) => {
      // UserUpdated matches instructors
      await this.enqueueJob("instructors", payload.userId, "UPDATE");
    });

    logger.info("🔌 [SearchEventConsumer] Subscribed to course, category, and user events successfully.");
  }

  private async enqueueJob(entityType: string, entityId: string, operation: "CREATE" | "UPDATE" | "DELETE"): Promise<void> {
    try {
      const correlationId = randomUUID();

      // 1. Create SearchSyncLog record
      const log = await this.logs.createLog({
        entityType,
        entityId,
        operation,
        status: SearchSyncStatus.PENDING,
        correlationId,
      });

      // 2. Enqueue BullMQ job
      await this.queue.add(
        `index-${entityType}`,
        {
          logId: log.id,
          entityType,
          entityId,
          operation,
          correlationId,
        },
        { jobId: `${entityType}:${entityId}:${operation}:${correlationId}` }
      );

      logger.info(`[SearchEventConsumer] Enqueued indexing job for ${entityType}:${entityId} (${operation})`);
    } catch (err: any) {
      logger.error(`[SearchEventConsumer] Failed to enqueue search sync job for ${entityType}:${entityId}: ${err.message}`);
    }
  }
}

export const searchEventConsumer = new SearchEventConsumer();
export default searchEventConsumer;
