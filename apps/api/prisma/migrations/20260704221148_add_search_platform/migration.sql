-- CreateEnum
CREATE TYPE "SearchSyncStatus" AS ENUM ('PENDING', 'INDEXING', 'INDEXED', 'FAILED');

-- CreateTable
CREATE TABLE "search_sync_logs" (
    "id" UUID NOT NULL,
    "entity_type" VARCHAR(100) NOT NULL,
    "entity_id" UUID NOT NULL,
    "operation" VARCHAR(50) NOT NULL,
    "status" "SearchSyncStatus" NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "last_error" TEXT,
    "correlation_id" VARCHAR(255),
    "processed_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "search_sync_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "search_sync_logs_entity_type_entity_id_idx" ON "search_sync_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "search_sync_logs_status_idx" ON "search_sync_logs"("status");
