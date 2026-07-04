// @ts-ignore
import { MeiliSearch } from "meilisearch";
import { logger } from "../../lib/logger";
import { SEARCH_CONFIG } from "../../config/search";
import { SearchProvider, SearchDocument, SearchResult, SearchSuggestion } from "./search.types";
import { SearchProviderError } from "./search.provider";

export class MeilisearchProvider implements SearchProvider {
  private client: any = null; // Use any to bypass strict type resolutions from typescript
  private isConnected = false;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    try {
      if (!SEARCH_CONFIG.host) {
        logger.warn("[MeilisearchProvider] Host is not configured. Search is disabled.");
        return;
      }
      this.client = new MeiliSearch({
        host: SEARCH_CONFIG.host,
        apiKey: SEARCH_CONFIG.apiKey || undefined,
      });
      // Ping check
      this.client
        .health()
        .then(() => {
          this.isConnected = true;
          logger.info(`🌐 [MeilisearchProvider] Connected successfully to Meilisearch at ${SEARCH_CONFIG.host}`);
        })
        .catch((err: any) => {
          logger.error(`🚨 [MeilisearchProvider] Health check failed: ${err.message}. Running in fail-open mode.`);
          this.isConnected = false;
        });
    } catch (err: any) {
      logger.error(`🚨 [MeilisearchProvider] Initialization error: ${err.message}`);
    }
  }

  public async createIndex(
    indexName: string,
    settings: { searchable: string[]; filterable: string[]; sortable: string[] }
  ): Promise<void> {
    if (!this.client || !this.isConnected) {
      logger.warn(`[MeilisearchProvider] Skipping createIndex for "${indexName}" - Meilisearch is offline.`);
      return;
    }
    try {
      // Get or create index
      await this.client.getOrCreateIndex(indexName, { primaryKey: "id" });
      const index = this.client.index(indexName);

      // Update settings in Meilisearch
      await Promise.all([
        index.updateSearchableAttributes(settings.searchable),
        index.updateFilterableAttributes(settings.filterable),
        index.updateSortableAttributes(settings.sortable),
        index.updateRankingRules([...SEARCH_CONFIG.rankingRules]),
      ]);

      logger.info(`✅ [MeilisearchProvider] Index settings updated for "${indexName}"`);
    } catch (err: any) {
      logger.error(`[MeilisearchProvider] Failed to setup index settings for "${indexName}": ${err.message}`);
      throw SearchProviderError.indexOperationFailed(indexName, err.message);
    }
  }

  public async deleteIndex(indexName: string): Promise<void> {
    if (!this.client || !this.isConnected) return;
    try {
      await this.client.deleteIndex(indexName);
      logger.info(`🗑️ [MeilisearchProvider] Deleted index "${indexName}"`);
    } catch (err: any) {
      logger.error(`[MeilisearchProvider] Failed to delete index "${indexName}": ${err.message}`);
    }
  }

  public async getDocument(indexName: string, id: string): Promise<SearchDocument | null> {
    if (!this.client || !this.isConnected) return null;
    try {
      const doc = await this.client.index(indexName).getDocument(id);
      return doc as SearchDocument;
    } catch (err: any) {
      // Meilisearch throws if document is not found, so return null
      return null;
    }
  }

  public async addDocuments(indexName: string, documents: SearchDocument[]): Promise<void> {
    if (!this.client || !this.isConnected) {
      logger.warn(`[MeilisearchProvider] Skipping addDocuments for "${indexName}" - Offline`);
      return;
    }
    try {
      const task = await this.client.index(indexName).addDocuments(documents);
      logger.info(`📥 [MeilisearchProvider] Queued indexing task in Meilisearch for ${documents.length} docs. Task UID: ${task.taskUid}`);
    } catch (err: any) {
      logger.error(`[MeilisearchProvider] Failed to add documents to "${indexName}": ${err.message}`);
      throw new SearchProviderError(err.message);
    }
  }

  public async updateDocuments(indexName: string, documents: SearchDocument[]): Promise<void> {
    await this.addDocuments(indexName, documents);
  }

  public async deleteDocuments(indexName: string, documentIds: string[]): Promise<void> {
    if (!this.client || !this.isConnected) return;
    try {
      const task = await this.client.index(indexName).deleteDocuments(documentIds);
      logger.info(`🗑️ [MeilisearchProvider] Queued delete task in Meilisearch for ${documentIds.length} docs. Task UID: ${task.taskUid}`);
    } catch (err: any) {
      logger.error(`[MeilisearchProvider] Failed to delete documents from "${indexName}": ${err.message}`);
      throw new SearchProviderError(err.message);
    }
  }

  public async search<T extends SearchDocument = SearchDocument>(
    indexName: string,
    query: string,
    options: {
      page?: number;
      limit?: number;
      filters?: string;
      sort?: string[];
      highlightAttributes?: string[];
    }
  ): Promise<SearchResult<T>> {
    if (!this.client || !this.isConnected) {
      logger.warn(`[MeilisearchProvider] Search requested but offline. Returning empty result.`);
      return {
        hits: [],
        total: 0,
        page: options.page ?? 1,
        limit: options.limit ?? 20,
        totalPages: 0,
        processingTimeMs: 0,
      };
    }

    try {
      const index = this.client.index(indexName);
      const res = await index.search(query, {
        page: options.page,
        hitsPerPage: options.limit,
        filter: options.filters,
        sort: options.sort,
        attributesToHighlight: options.highlightAttributes || ["*"],
      });

      return {
        hits: res.hits,
        total: res.totalHits ?? res.numberOfDocuments ?? 0,
        page: res.page ?? 1,
        limit: res.hitsPerPage ?? 20,
        totalPages: res.totalPages ?? 0,
        processingTimeMs: res.processingTimeMs,
        facets: res.facetDistribution,
      };
    } catch (err: any) {
      logger.error(`[MeilisearchProvider] Search execution failed on "${indexName}": ${err.message}`);
      throw new SearchProviderError(err.message);
    }
  }

  public async autocomplete(indexName: string, query: string, limit = 5): Promise<SearchSuggestion[]> {
    if (!this.client || !this.isConnected) return [];
    try {
      const res = await this.search(indexName, query, { page: 1, limit });
      return res.hits.map((hit: any) => ({
        text: hit.title || hit.name || "",
        index: indexName.replace(SEARCH_CONFIG.indexPrefix, ""),
      }));
    } catch (err: any) {
      logger.error(`[MeilisearchProvider] Autocomplete failed on "${indexName}": ${err.message}`);
      return [];
    }
  }

  public async health(): Promise<{ status: string; details?: any }> {
    if (!this.client) {
      return { status: "offline", details: { reason: "Not initialized" } };
    }
    try {
      const health = await this.client.health();
      return { status: health.status, details: { isConnected: this.isConnected } };
    } catch (err: any) {
      return { status: "unhealthy", details: { error: err.message, isConnected: false } };
    }
  }
}

export const meilisearchProvider = new MeilisearchProvider();
export default meilisearchProvider;
