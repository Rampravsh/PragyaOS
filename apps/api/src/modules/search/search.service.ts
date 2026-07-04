import { randomUUID } from "crypto";
import { SearchSyncStatus } from "@prisma/client";
import { SEARCH_INDEX_NAMES } from "./search.constants";
import { SearchQueryInput, AutocompleteInput, ReindexEntityInput } from "./search.schemas";
import { SearchProvider, SearchResult, SearchSuggestion } from "./search.types";
import { meilisearchProvider } from "./meilisearch.provider";
import { searchSyncLogRepository } from "./search.repository";
import { searchIndexerQueue } from "./search.queue";
import { courseRepository } from "../courses/course.repository";
import { categoryRepository } from "../categories/category.repository";
import { userRepository } from "../users/user.repository";
import { logger } from "../../lib/logger";

export class SearchService {
  constructor(
    private readonly provider: SearchProvider = meilisearchProvider,
    private readonly logs = searchSyncLogRepository,
    private readonly queue = searchIndexerQueue
  ) {}

  /**
   * Performs full-text search across courses with filtering and sorting.
   */
  public async search(input: SearchQueryInput): Promise<SearchResult> {
    const filters: string[] = [];

    if (input.category) {
      filters.push(`category.slug = "${input.category}"`);
    }
    if (input.difficulty) {
      filters.push(`difficulty = "${input.difficulty}"`);
    }
    if (input.language) {
      filters.push(`language = "${input.language}"`);
    }
    if (input.tags) {
      const tagList = input.tags
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);
      tagList.forEach((tag) => {
        filters.push(`tags.slug = "${tag}"`);
      });
    }

    // Default to only search PUBLISHED courses
    filters.push(`status = "PUBLISHED"`);

    const filterString = filters.join(" AND ");

    // Map sort fields
    let sort: string[] | undefined = undefined;
    if (input.sort === "newest") {
      sort = ["createdAt:desc"];
    } else if (input.sort === "popularity") {
      sort = ["popularity:desc"];
    } else if (input.sort === "rating") {
      sort = ["rating:desc"];
    }

    return this.provider.search(SEARCH_INDEX_NAMES.COURSES, input.q ?? "", {
      page: input.page,
      limit: input.limit,
      filters: filterString || undefined,
      sort,
    });
  }

  /**
   * Fetches autocomplete search suggestions.
   */
  public async autocomplete(input: AutocompleteInput): Promise<SearchSuggestion[]> {
    const indexName = this.resolveIndexName(input.index);
    return this.provider.autocomplete(indexName, input.q, input.limit);
  }

  /**
   * Reports search service connectivity, queue status, and index statistics.
   */
  public async health() {
    const providerHealth = await this.provider.health();
    const activeCount = await this.queue.getActiveCount();
    const waitingCount = await this.queue.getWaitingCount();
    const failedCount = await this.queue.getFailedCount();

    return {
      provider: providerHealth,
      queue: {
        active: activeCount,
        waiting: waitingCount,
        failed: failedCount,
      },
    };
  }

  /**
   * Enqueues manual reindexing for a single entity.
   */
  public async reindexEntity(input: ReindexEntityInput): Promise<void> {
    const correlationId = randomUUID();
    const log = await this.logs.createLog({
      entityType: input.entityType,
      entityId: input.entityId,
      operation: "UPDATE",
      status: SearchSyncStatus.PENDING,
      correlationId,
    });

    await this.queue.add(
      `reindex-${input.entityType}`,
      {
        logId: log.id,
        entityType: input.entityType,
        entityId: input.entityId,
        operation: "UPDATE",
        correlationId,
      },
      { jobId: `reindex:${input.entityType}:${input.entityId}:${correlationId}` }
    );
  }

  /**
   * Reindexes all entities across courses, categories, tags, and instructors.
   */
  public async reindexAll(): Promise<{ enqueued: number }> {
    let enqueued = 0;
    const correlationId = randomUUID();

    // 1. Get all published courses
    const { courses } = await courseRepository.findManyAndCount({ status: "PUBLISHED", limit: 1000 });
    for (const c of courses) {
      await this.createAndEnqueueLog("courses", c.id, "FULL_REINDEX", correlationId);
      enqueued++;
    }

    // 2. Get all categories
    const categories = await categoryRepository.findAll();
    for (const cat of categories) {
      await this.createAndEnqueueLog("categories", cat.id, "FULL_REINDEX", correlationId);
      enqueued++;
    }

    // 3. Get all instructors
    const instructors = await userRepository.findInstructors();
    for (const inst of instructors) {
      await this.createAndEnqueueLog("instructors", inst.id, "FULL_REINDEX", correlationId);
      enqueued++;
    }

    // 4. Get all tags
    const tags = await courseRepository.findAllTags();
    for (const tag of tags) {
      await this.createAndEnqueueLog("tags", tag.id, "FULL_REINDEX", correlationId);
      enqueued++;
    }

    logger.info(`[SearchService] Full reindex triggered. Enqueued ${enqueued} synchronization jobs.`);
    return { enqueued };
  }

  private async createAndEnqueueLog(
    entityType: string,
    entityId: string,
    operation: "UPDATE" | "FULL_REINDEX",
    correlationId: string
  ): Promise<void> {
    const log = await this.logs.createLog({
      entityType,
      entityId,
      operation,
      status: SearchSyncStatus.PENDING,
      correlationId,
    });

    await this.queue.add(
      `full-reindex-${entityType}`,
      {
        logId: log.id,
        entityType,
        entityId,
        operation,
        correlationId,
      },
      { jobId: `full-reindex:${entityType}:${entityId}:${correlationId}` }
    );
  }

  private resolveIndexName(type: string): string {
    switch (type.toLowerCase()) {
      case "courses":
        return SEARCH_INDEX_NAMES.COURSES;
      case "categories":
        return SEARCH_INDEX_NAMES.CATEGORIES;
      case "instructors":
        return SEARCH_INDEX_NAMES.INSTRUCTORS;
      case "tags":
        return SEARCH_INDEX_NAMES.TAGS;
      default:
        throw new Error(`Unknown index type: ${type}`);
    }
  }
}

export const searchService = new SearchService();
export default searchService;
