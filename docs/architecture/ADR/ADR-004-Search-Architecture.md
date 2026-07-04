# ADR-004: Search & Discovery Platform Architecture

## Status
Approved

## Context
PragyaOS requires full-text search capability for courses, categories, tags, and instructors. The architecture must support prefix matching, typo tolerance, relevance ranking, faceted filtering, and real-time event-driven index updates. It must also remain provider-agnostic to enable future migration from Meilisearch to Elasticsearch or OpenSearch.

## Decisions

### 1. Provider Abstraction (`SearchProvider`)
All search and index operations are defined in a generic `SearchProvider` interface. The application logic (service, controller, worker, indexer) only interacts with this interface, never with a concrete SDK.

**Rationale**: Eliminates vendor lock-in. Switching search backends requires only writing a new class implementing `SearchProvider`.

### 2. Event-Driven Asynchronous Indexing (Fail-Open)
Index synchronization is triggered solely by domain events (`course.published`, `category.updated`, etc.). The event handler creates a `SearchSyncLog` record and enqueues a background job using BullMQ (`search-indexer-queue`). The worker processes the job asynchronously.

**Rationale**: Keeps write paths fast by decoupling DB commits from indexing. If Meilisearch goes offline, indexing retries with exponential backoff, and the API remains fully operational (fails open).

### 3. Out-Of-Order Execution Protection (Versioning)
Each search document contains a `version` field derived from the database entity's `updatedAt.getTime()`. Before indexing, the worker retrieves the existing document from Meilisearch and skips updates if the existing document's version is greater than or equal to the incoming version.

**Rationale**: Resolves race conditions and out-of-order execution when multiple updates to the same entity are queued close together.

### 4. SearchSyncLog Audit Log
Every indexing operation generates a `SearchSyncLog` tracking the entity, operation, attempts, status (`PENDING`, `INDEXING`, `INDEXED`, `FAILED`), and last error message.

**Rationale**: Provides full operational observability and a dead-letter capability. Failed syncs can be identified and manually reindexed.

### 5. Bulk Indexing Support
The `SearchIndexer` exposes `indexDocuments()` alongside `indexDocument()` for bulk indexing. 

**Rationale**: Reindexing large datasets (e.g., during full reindex operations) is optimized, sending one batch request to the provider instead of thousands of single calls.

## Consequences
- **Positive**: Typo-tolerant, fast search is isolated. Adding new searchable entities is simple.
- **Negative**: Slight delay between DB updates and search updates (typically sub-second).
