# Search & Discovery Platform

## Lifecycle of a Search Document

```
1. Entity Created/Updated in DB
   │
   ▼
2. Domain Event Emitted (post-commit)
   │
   ▼
3. SearchEventConsumer Captures Event
   │
   ├── Writes SearchSyncLog (PENDING)
   └── Enqueues Job to BullMQ (search-indexer-queue)
   │
   ▼
4. SearchIndexWorker Receives Job
   │
   ├── Sets status to INDEXING
   ├── Fetches fresh DB record with relations (no direct prisma)
   ├── Maps DB record to SearchDocument (includes version timestamp)
   ├── Compares version with existing Meilisearch document
   │     ├── If Stale: skips update
   │     └── If Fresh: calls SearchIndexer
   │
   ▼
5. SearchIndexer Submits Document to Meilisearch
   │
   ▼
6. Sync Log Status Updated to INDEXED (or FAILED on error)
```

## Indexes and Searchable Attributes

| Index | Target Entity | Searchable Attributes | Filterable Attributes | Sortable Attributes |
|---|---|---|---|---|
| `pragyaos_courses` | Courses | title, subtitle, description, category.name, tags.name, instructors.name | category.slug, tags.slug, difficulty, language, status | createdAt, popularity, rating |
| `pragyaos_categories` | Categories | name, description | slug | name |
| `pragyaos_instructors` | Users (Instructors) | name, bio | roles | name |
| `pragyaos_tags` | Course Tags | name | slug | name |

## Sorting Options
- **relevance** (Default Meilisearch ranking score)
- **newest** (`createdAt:desc`)
- **popularity** (`popularity:desc`)
- **rating** (`rating:desc`)

## Reindexing Strategies

### 1. Incremental Reindexing
Triggered automatically via domain events on course, category, and instructor updates.

### 2. Manual Entity Reindexing
Admins can trigger manual indexing of any single entity via:
`POST /api/v1/search/reindex`

### 3. Full Reindexing
Triggered by admins via:
`POST /api/v1/search/reindex/all`

This scans all active categories, tags, instructors, and published courses, and enqueues bulk update indexing jobs.
