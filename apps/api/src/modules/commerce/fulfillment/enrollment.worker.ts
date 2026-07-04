import { Worker, Job, Queue } from "bullmq";
import { config } from "../../../config";
import { logger } from "../../../lib/logger";
import { enrollmentRepo } from "../../learning-engine/learning-engine.repository";
import { EnrollmentStatus } from "@prisma/client";
import { fulfillmentEvents } from "./fulfillment.events";
import { randomUUID } from "crypto";

export const enrollmentQueue = new Queue("enrollment-queue", {
  connection: { url: config.redis.url },
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

export class EnrollmentWorker {
  private worker: Worker;

  constructor() {
    this.worker = new Worker(
      "enrollment-queue",
      async (job: Job) => {
        const startTime = Date.now();
        const { correlationId, orderId, userId, courseId } = job.data;
        logger.info(
          `[Enrollment Worker] Processing enrollment for User: ${userId} | Course: ${courseId} | Correlation: ${correlationId}`
        );

        try {
          const existing = await enrollmentRepo.findByUserAndCourse(userId, courseId);
          let enrollmentId = "";
          let status = "";

          if (existing) {
            if (existing.status === EnrollmentStatus.ACTIVE) {
              logger.warn(`⚠️ [Enrollment Worker] Active enrollment already exists for User ${userId}. Ignoring.`);
              enrollmentId = existing.id;
              status = "ACTIVE";
            } else {
              // Restore archived/suspended enrollment
              const updated = await enrollmentRepo.update(existing.id, {
                status: EnrollmentStatus.ACTIVE,
              });
              logger.info(`✅ [Enrollment Worker] Restored archived enrollment: ${updated.id}`);
              enrollmentId = updated.id;
              status = "ACTIVE";

              fulfillmentEvents.emitEnrollmentGranted({
                version: 1,
                timestamp: new Date().toISOString(),
                correlationId,
                orderId,
                userId,
                courseId,
                enrollmentId,
                status,
              });
            }
          } else {
            // Create new ACTIVE enrollment
            const created = await enrollmentRepo.create({
              user: { connect: { id: userId } },
              course: { connect: { id: courseId } },
              status: EnrollmentStatus.ACTIVE,
              source: "PURCHASE",
              purchaseRef: orderId,
            });
            logger.info(`✅ [Enrollment Worker] Created new enrollment: ${created.id}`);
            enrollmentId = created.id;
            status = "ACTIVE";

            fulfillmentEvents.emitEnrollmentGranted({
              version: 1,
              timestamp: new Date().toISOString(),
              correlationId,
              orderId,
              userId,
              courseId,
              enrollmentId,
              status,
            });
          }

          // Emit health metrics
          const duration = Date.now() - startTime;
          logger.info(
            `📊 [Worker Metrics] [EnrollmentWorker] Duration: ${duration}ms | Retries: ${job.attemptsMade} | Status: SUCCESS`
          );
        } catch (err: any) {
          const duration = Date.now() - startTime;
          logger.error(
            `❌ [Enrollment Worker] Failed: ${err.message} | Metrics: duration=${duration}ms, attempts=${job.attemptsMade}`
          );
          const isLastAttempt = job.attemptsMade + 1 >= (job.opts.attempts || 3);
          if (isLastAttempt) {
            const { fulfillmentService } = await import("./fulfillment.service");
            await fulfillmentService.moveToDeadLetter(orderId, `Enrollment step failed permanently: ${err.message}`);
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

export const enrollmentWorker = new EnrollmentWorker();
export default enrollmentWorker;
