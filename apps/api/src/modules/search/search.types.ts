import { Prisma, SearchSyncLog, SearchSyncStatus } from "@prisma/client";

export interface RepositoryContext {
  tx?: Prisma.TransactionClient;
}

export type IndexOperation = "CREATE" | "UPDATE" | "DELETE" | "FULL_REINDEX";

export interface SearchSyncLogRepository {
  createLog(data: Prisma.SearchSyncLogUncheckedCreateInput, ctx?: RepositoryContext): Promise<SearchSyncLog>;
  updateStatus(id: string, status: SearchSyncStatus, attempts: number, lastError?: string | null, ctx?: RepositoryContext): Promise<SearchSyncLog>;
  findPending(limit: number, ctx?: RepositoryContext): Promise<SearchSyncLog[]>;
  findByEntity(entityType: string, entityId: string, ctx?: RepositoryContext): Promise<SearchSyncLog | null>;
}

export interface SearchDocument {
  id: string;
  entityType: string;
  version: number; // For document versioning and out-of-order execution prevention
  updatedAt: string;
  [key: string]: any;
}

export interface SearchFilters {
  [key: string]: string | string[] | boolean | undefined;
}

export interface SearchSortOption {
  field: string;
  order: "asc" | "desc";
}

export interface SearchResult<T extends SearchDocument = SearchDocument> {
  hits: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  facets?: Record<string, Record<string, number>>;
  processingTimeMs: number;
}

export interface SearchSuggestion {
  text: string;
  index: string;
}

export interface SearchProvider {
  createIndex(indexName: string, config: { searchable: string[]; filterable: string[]; sortable: string[] }): Promise<void>;
  deleteIndex(indexName: string): Promise<void>;
  getDocument(indexName: string, id: string): Promise<SearchDocument | null>;
  addDocuments(indexName: string, documents: SearchDocument[]): Promise<void>;
  updateDocuments(indexName: string, documents: SearchDocument[]): Promise<void>;
  deleteDocuments(indexName: string, documentIds: string[]): Promise<void>;
  search<T extends SearchDocument = SearchDocument>(
    indexName: string,
    query: string,
    options: {
      page?: number;
      limit?: number;
      filters?: string;
      sort?: string[];
      highlightAttributes?: string[];
    }
  ): Promise<SearchResult<T>>;
  autocomplete(indexName: string, query: string, limit?: number): Promise<SearchSuggestion[]>;
  health(): Promise<{ status: string; details?: any }>;
}

export interface SearchIndexJobPayload {
  logId: string;
  entityType: string;
  entityId: string;
  operation: IndexOperation;
  correlationId?: string;
}
