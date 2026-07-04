import { config } from "./index";

export const SEARCH_CONFIG = {
  host: config.search.host,
  apiKey: config.search.apiKey,
  indexPrefix: config.search.indexPrefix,
  batchSize: 100,
  queueName: "search-indexer-queue",
  deadLetterQueueName: "search-indexer-dlq",

  indexes: {
    COURSES: `${config.search.indexPrefix}courses`,
    CATEGORIES: `${config.search.indexPrefix}categories`,
    INSTRUCTORS: `${config.search.indexPrefix}instructors`,
    TAGS: `${config.search.indexPrefix}tags`,
  },

  /**
   * Meilisearch ranking rules — tuned for learning content.
   * words, typo, proximity ensure full-text quality.
   * sort is listed last so explicit sorts always win.
   */
  rankingRules: ["words", "typo", "proximity", "attribute", "sort", "exactness"],

  /**
   * Retry policy (mirrors BullMQ queue policy)
   */
  retry: {
    attempts: 3,
    backoffDelay: 5000,
  },
} as const;
