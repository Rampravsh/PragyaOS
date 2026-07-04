import { SearchProvider, SearchDocument } from "./search.types";
import { meilisearchProvider } from "./meilisearch.provider";
import { logger } from "../../lib/logger";

export class SearchIndexer {
  constructor(private readonly provider: SearchProvider = meilisearchProvider) {}

  /**
   * Indexes a single document.
   */
  public async indexDocument(indexName: string, document: SearchDocument): Promise<void> {
    logger.info(`[SearchIndexer] Indexing document ${document.id} in index "${indexName}"`);
    await this.provider.addDocuments(indexName, [document]);
  }

  /**
   * Indexes multiple documents in bulk.
   */
  public async indexDocuments(indexName: string, documents: SearchDocument[]): Promise<void> {
    if (documents.length === 0) return;
    logger.info(`[SearchIndexer] Bulk indexing ${documents.length} documents in index "${indexName}"`);
    await this.provider.addDocuments(indexName, documents);
  }

  /**
   * Deletes documents from index.
   */
  public async deleteDocuments(indexName: string, documentIds: string[]): Promise<void> {
    if (documentIds.length === 0) return;
    logger.info(`[SearchIndexer] Deleting ${documentIds.length} documents from index "${indexName}"`);
    await this.provider.deleteDocuments(indexName, documentIds);
  }
}

export const searchIndexer = new SearchIndexer();
export default searchIndexer;
