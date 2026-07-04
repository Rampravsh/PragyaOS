import { Worker, Job } from "bullmq";
import { config } from "../../config";
import { SEARCH_CONFIG } from "../../config/search";
import { SEARCH_QUEUE_NAMES, SEARCH_INDEX_NAMES } from "./search.constants";
import { SearchIndexJobPayload, SearchDocument, SearchProvider } from "./search.types";
import { searchSyncLogRepository } from "./search.repository";
import { courseRepository } from "../courses/course.repository";
import { categoryRepository } from "../categories/category.repository";
import { userRepository } from "../users/user.repository";
import { SearchMapper } from "./search.mapper";
import { searchIndexer } from "./search.indexer";
import { meilisearchProvider } from "./meilisearch.provider";
import { logger } from "../../lib/logger";
import { SearchSyncStatus } from "@prisma/client";

export class SearchIndexWorker {
  private worker: Worker<SearchIndexJobPayload>;

  constructor(
    private readonly logs = searchSyncLogRepository,
    private readonly indexer = searchIndexer,
    private readonly provider: SearchProvider = meilisearchProvider
  ) {
    this.worker = new Worker<SearchIndexJobPayload>(
      SEARCH_QUEUE_NAMES.INDEXER,
      async (job: Job<SearchIndexJobPayload>) => {
        const { logId, entityType, entityId, operation } = job.data;
        logger.info(`[SearchWorker] Executing job ${job.id} for ${entityType}:${entityId}`);

        // 1. Update log status to INDEXING
        await this.logs.updateStatus(logId, SearchSyncStatus.INDEXING, job.attemptsMade);

        const indexName = this.resolveIndexName(entityType);

        // 2. Handle DELETE operation
        if (operation === "DELETE") {
          await this.indexer.deleteDocuments(indexName, [entityId]);
          await this.logs.updateStatus(logId, SearchSyncStatus.INDEXED, job.attemptsMade);
          return;
        }

        // 3. Retrieve entity from DB and map to SearchDocument
        const doc = await this.fetchAndMapEntity(entityType, entityId);
        if (!doc) {
          logger.warn(`[SearchWorker] Entity ${entityType}:${entityId} not found in DB. Marking as FAILED.`);
          await this.logs.updateStatus(
            logId,
            SearchSyncStatus.FAILED,
            job.attemptsMade,
            "Entity not found in database."
          );
          return;
        }

        // 4. Version check: prevent out-of-order execution
        const existing = await this.provider.getDocument(indexName, entityId);
        if (existing && existing.version >= doc.version) {
          logger.info(
            `[SearchWorker] Skipping stale update. Indexed version (${existing.version}) >= Job version (${doc.version})`
          );
          await this.logs.updateStatus(logId, SearchSyncStatus.INDEXED, job.attemptsMade);
          return;
        }

        // 5. Index document
        await this.indexer.indexDocument(indexName, doc);

        // 6. Update log status to INDEXED
        await this.logs.updateStatus(logId, SearchSyncStatus.INDEXED, job.attemptsMade);
      },
      {
        connection: { url: config.redis.url },
        concurrency: 5,
      }
    );

    this.setupListeners();
  }

  private resolveIndexName(entityType: string): string {
    switch (entityType.toLowerCase()) {
      case "courses":
        return SEARCH_INDEX_NAMES.COURSES;
      case "categories":
        return SEARCH_INDEX_NAMES.CATEGORIES;
      case "instructors":
        return SEARCH_INDEX_NAMES.INSTRUCTORS;
      case "tags":
        return SEARCH_INDEX_NAMES.TAGS;
      default:
        throw new Error(`Unknown entity type: ${entityType}`);
    }
  }

  private async fetchAndMapEntity(entityType: string, entityId: string): Promise<SearchDocument | null> {
    switch (entityType.toLowerCase()) {
      case "courses": {
        const course = await courseRepository.findById(entityId);
        if (!course) return null;
        return SearchMapper.courseToDocument(course);
      }
      case "categories": {
        const category = await categoryRepository.findById(entityId);
        if (!category) return null;
        return SearchMapper.categoryToDocument(category);
      }
      case "instructors": {
        const user = await userRepository.findById(entityId);
        if (!user) return null;
        return SearchMapper.instructorToDocument(user);
      }
      case "tags": {
        const tag = await courseRepository.findTagById(entityId);
        if (!tag) return null;
        return SearchMapper.tagToDocument(tag);
      }
      default:
        return null;
    }
  }

  private setupListeners(): void {
    this.worker.on("completed", (job) => {
      logger.info(`✅ [SearchWorker] Job ${job.id} completed successfully.`);
    });

    this.worker.on("failed", (job, err) => {
      logger.error(`❌ [SearchWorker] Job ${job?.id} failed with error: ${err.message}`);
      if (job?.data?.logId) {
        this.logs
          .updateStatus(job.data.logId, SearchSyncStatus.FAILED, job.attemptsMade, err.message)
          .catch((e) => logger.error(`[SearchWorker] Failed to update fail status for log: ${e.message}`));
      }
    });

    this.worker.on("error", (err) => {
      logger.error(`🚨 [SearchWorker] Critical error: ${err.message}`);
    });
  }

  public async close(): Promise<void> {
    await this.worker.close();
  }
}

export const searchIndexWorker = new SearchIndexWorker();
export default searchIndexWorker;
