-- CreateEnum
CREATE TYPE "WebhookEventStatus" AS ENUM ('RECEIVED', 'PROCESSED', 'FAILED');

-- CreateTable
CREATE TABLE "webhook_events" (
    "id" UUID NOT NULL,
    "event_id" VARCHAR(100) NOT NULL,
    "provider" VARCHAR(50) NOT NULL,
    "payload" JSONB NOT NULL,
    "signature" TEXT,
    "received_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed_at" TIMESTAMPTZ,
    "status" "WebhookEventStatus" NOT NULL DEFAULT 'RECEIVED',

    CONSTRAINT "webhook_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "webhook_events_event_id_key" ON "webhook_events"("event_id");
