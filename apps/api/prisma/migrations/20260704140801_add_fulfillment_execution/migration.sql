-- CreateEnum
CREATE TYPE "FulfillmentStatus" AS ENUM ('PENDING', 'STARTED', 'PARTIALLY_COMPLETED', 'COMPLETED', 'FAILED', 'DEAD_LETTER');

-- CreateTable
CREATE TABLE "fulfillment_executions" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "payment_attempt_id" UUID NOT NULL,
    "status" "FulfillmentStatus" NOT NULL DEFAULT 'PENDING',
    "current_step" VARCHAR(100),
    "retry_count" INTEGER NOT NULL DEFAULT 0,
    "started_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMPTZ,
    "correlation_id" VARCHAR(100) NOT NULL,
    "error_message" TEXT,

    CONSTRAINT "fulfillment_executions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fulfillment_executions_order_id_idx" ON "fulfillment_executions"("order_id");

-- CreateIndex
CREATE INDEX "fulfillment_executions_status_idx" ON "fulfillment_executions"("status");

-- AddForeignKey
ALTER TABLE "fulfillment_executions" ADD CONSTRAINT "fulfillment_executions_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fulfillment_executions" ADD CONSTRAINT "fulfillment_executions_payment_attempt_id_fkey" FOREIGN KEY ("payment_attempt_id") REFERENCES "payment_attempts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
