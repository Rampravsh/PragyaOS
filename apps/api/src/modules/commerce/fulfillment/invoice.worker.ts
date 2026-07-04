import { Worker, Job, Queue } from "bullmq";
import { config } from "../../../config";
import { logger } from "../../../lib/logger";
import { invoiceRepository } from "../invoice.repository";
import { fulfillmentEvents } from "./fulfillment.events";

export const invoiceQueue = new Queue("invoice-queue", {
  connection: { url: config.redis.url },
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

export class InvoiceWorker {
  private worker: Worker;

  constructor() {
    this.worker = new Worker(
      "invoice-queue",
      async (job: Job) => {
        const startTime = Date.now();
        const { correlationId, orderId, userId, amount } = job.data;
        logger.info(
          `[Invoice Worker] Processing invoice for Order: ${orderId} | Correlation: ${correlationId}`
        );

        try {
          // Idempotency check: prevent duplicate invoices for the same Order
          const existing = await invoiceRepository.findByOrderId(orderId);
          if (existing) {
            logger.warn(`⚠️ [Invoice Worker] Invoice already exists for Order ${orderId}. Skipping.`);

            const duration = Date.now() - startTime;
            logger.info(
              `📊 [Worker Metrics] [InvoiceWorker] Duration: ${duration}ms | Retries: ${job.attemptsMade} | Status: SUCCESS`
            );
            return;
          }

          // Generate unique invoice number: INV-YYYYMMDD-000000
          const now = new Date();
          const datePart = now.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
          const count = await invoiceRepository.countTodayInvoices();
          const seq = String(count + 1).padStart(6, "0");
          const invoiceNumber = `INV-${datePart}-${seq}`;

          const pdfMetadata = {
            generator: "PragyaOS Fulfillment PDF Generator",
            invoiceNumber,
            orderId,
            issuedAt: now.toISOString(),
            status: "DRAFT",
            template: "standard_purchase_invoice",
          };

          // Persist invoice database record
          const created = await invoiceRepository.create({
            invoiceNumber,
            orderId,
            issuedAt: now,
            taxDetails: {
              gstRate: 0.18,
              taxIncluded: true,
              totalAmount: amount,
              pdfMetadata, // Preparing PDF metadata in DB Json field
            },
            billingAddress: "Tech Park, Bangalore, KA, 560001",
          });

          logger.info(`✅ [Invoice Worker] Generated Invoice: ${created.invoiceNumber} | ID: ${created.id}`);

          fulfillmentEvents.emitInvoiceGenerated({
            version: 1,
            timestamp: now.toISOString(),
            correlationId,
            orderId,
            invoiceId: created.id,
            invoiceNumber: created.invoiceNumber,
            amount,
          });

          // Emit health metrics
          const duration = Date.now() - startTime;
          logger.info(
            `📊 [Worker Metrics] [InvoiceWorker] Duration: ${duration}ms | Retries: ${job.attemptsMade} | Status: SUCCESS`
          );
        } catch (err: any) {
          const duration = Date.now() - startTime;
          logger.error(
            `❌ [Invoice Worker] Failed: ${err.message} | Metrics: duration=${duration}ms, attempts=${job.attemptsMade}`
          );
          const isLastAttempt = job.attemptsMade + 1 >= (job.opts.attempts || 3);
          if (isLastAttempt) {
            const { fulfillmentService } = await import("./fulfillment.service");
            await fulfillmentService.moveToDeadLetter(orderId, `Invoice step failed permanently: ${err.message}`);
            
            // Find courseId if applicable from the job payload
            const courseId = job.data.courseId;
            if (courseId) {
              await fulfillmentService.rollbackEnrollment(userId, courseId);
            }
          }
          throw err;
        }
      },
      { connection: { url: config.redis.url } }
    );
  }

  public async close(): Promise<void> {
    await this.worker.close();
  }
}

export const invoiceWorker = new InvoiceWorker();
export default invoiceWorker;
