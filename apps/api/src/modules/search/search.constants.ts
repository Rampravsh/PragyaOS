import { SEARCH_CONFIG } from "../../config/search";

export const SEARCH_PERMISSIONS = {
  REINDEX: "search:reindex",
} as const;

export const SEARCH_QUEUE_NAMES = {
  INDEXER: SEARCH_CONFIG.queueName,
  DEAD_LETTER: SEARCH_CONFIG.deadLetterQueueName,
} as const;

export const SEARCH_INDEX_NAMES = {
  COURSES: SEARCH_CONFIG.indexes.COURSES,
  CATEGORIES: SEARCH_CONFIG.indexes.CATEGORIES,
  INSTRUCTORS: SEARCH_CONFIG.indexes.INSTRUCTORS,
  TAGS: SEARCH_CONFIG.indexes.TAGS,
} as const;

export const SEARCH_ATTRIBUTES = {
  COURSES: {
    searchable: ["title", "subtitle", "description", "category.name", "tags.name", "instructors.name"],
    filterable: ["category.slug", "tags.slug", "difficulty", "language", "status"],
    sortable: ["createdAt", "popularity", "rating"],
  },
  CATEGORIES: {
    searchable: ["name", "description"],
    filterable: ["slug"],
    sortable: ["name"],
  },
  INSTRUCTORS: {
    searchable: ["name", "bio"],
    filterable: ["roles"],
    sortable: ["name"],
  },
  TAGS: {
    searchable: ["name"],
    filterable: ["slug"],
    sortable: ["name"],
  },
} as const;
