import { FulfillmentExecution, FulfillmentStatus } from "@prisma/client";
import { AppError } from "../../../common/errors/appError";
import { logger } from "../../../lib/logger";
import {
  fulfillmentExecutionRepository,
  PrismaFulfillmentExecutionRepository,
} from "./fulfillment-execution.repository";
import { enrollmentRepo } from "../../learning-engine/learning-engine.repository";
import { invoiceRepository, PrismaInvoiceRepository } from "../invoice.repository";
import { RepositoryContext } from "../commerce.types";

export class FulfillmentService {
  constructor(
    private readonly executions: PrismaFulfillmentExecutionRepository = fulfillmentExecutionRepository,
    private readonly invoices: PrismaInvoiceRepository = invoiceRepository
  ) {}

  /**
   * Sets the fulfillment state to STARTED.
   */
  public async startFulfillment(orderId: string, currentStep: string, ctx?: RepositoryContext): Promise<FulfillmentExecution> {
    const execution = await this.executions.findByOrderId(orderId, ctx);
    if (!execution) {
      throw AppError.notFound(`Fulfillment execution not found for Order ${orderId}.`);
    }
    return this.executions.update(execution.id, {
      status: FulfillmentStatus.STARTED,
      currentStep,
    }, ctx);
  }

  /**
   * Updates progress through step status.
   */
  public async updateProgress(
    orderId: string,
    currentStep: string,
    status: FulfillmentStatus,
    ctx?: RepositoryContext
  ): Promise<FulfillmentExecution> {
    const execution = await this.executions.findByOrderId(orderId, ctx);
    if (!execution) {
      throw AppError.notFound(`Fulfillment execution not found for Order ${orderId}.`);
    }
    return this.executions.update(execution.id, {
      status,
      currentStep,
    }, ctx);
  }

  /**
   * Completes the entire execution loop.
   */
  public async completeFulfillment(orderId: string, ctx?: RepositoryContext): Promise<FulfillmentExecution> {
    const execution = await this.executions.findByOrderId(orderId, ctx);
    if (!execution) {
      throw AppError.notFound(`Fulfillment execution not found for Order ${orderId}.`);
    }
    return this.executions.update(execution.id, {
      status: FulfillmentStatus.COMPLETED,
      completedAt: new Date(),
      currentStep: "COMPLETED",
    }, ctx);
  }

  /**
   * Handles transitioning execution states into FAILED.
   */
  public async failFulfillment(
    orderId: string,
    errorMessage: string,
    step?: string,
    ctx?: RepositoryContext
  ): Promise<FulfillmentExecution> {
    const execution = await this.executions.findByOrderId(orderId, ctx);
    if (!execution) {
      throw AppError.notFound(`Fulfillment execution not found for Order ${orderId}.`);
    }
    return this.executions.update(execution.id, {
      status: FulfillmentStatus.FAILED,
      currentStep: step,
      errorMessage,
    }, ctx);
  }

  /**
   * Moves a permanently failed item to the Dead Letter Queue state.
   */
  public async moveToDeadLetter(orderId: string, errorMessage: string, ctx?: RepositoryContext): Promise<FulfillmentExecution> {
    const execution = await this.executions.findByOrderId(orderId, ctx);
    if (!execution) {
      throw AppError.notFound(`Fulfillment execution not found for Order ${orderId}.`);
    }
    return this.executions.update(execution.id, {
      status: FulfillmentStatus.DEAD_LETTER,
      errorMessage: `DLQ: ${errorMessage}`,
    }, ctx);
  }

  /**
   * Increments the processing retry count.
   */
  public async incrementRetry(orderId: string, ctx?: RepositoryContext): Promise<FulfillmentExecution> {
    const execution = await this.executions.findByOrderId(orderId, ctx);
    if (!execution) {
      throw AppError.notFound(`Fulfillment execution not found for Order ${orderId}.`);
    }
    return this.executions.update(execution.id, {
      retryCount: { increment: 1 },
    }, ctx);
  }

  // ---------------------------------------------------------------------------
  // Rollback Compensations
  // ---------------------------------------------------------------------------

  /**
   * Explicitly compensates enrollment failure by setting status to CANCELLED.
   */
  public async rollbackEnrollment(userId: string, courseId: string): Promise<void> {
    logger.warn(`♻️ [Fulfillment Compensation] Rolling back enrollment for user ${userId} in course ${courseId}`);
    const enrollment = await enrollmentRepo.findByUserAndCourse(userId, courseId);
    if (enrollment) {
      await enrollmentRepo.update(enrollment.id, {
        status: "CANCELLED",
      });
      logger.info(`♻️ [Fulfillment Compensation] Enrollment ${enrollment.id} successfully cancelled.`);
    }
  }

  /**
   * Explicitly compensates invoice failure by deleting the draft invoice.
   */
  public async rollbackInvoice(orderId: string): Promise<void> {
    logger.warn(`♻️ [Fulfillment Compensation] Rolling back invoice for Order ${orderId}`);
    const invoice = await this.invoices.findByOrderId(orderId);
    if (invoice) {
      await this.invoices.delete(invoice.id);
      logger.info(`♻️ [Fulfillment Compensation] Invoice ${invoice.id} successfully deleted.`);
    }
  }
}

export const fulfillmentService = new FulfillmentService();
export default fulfillmentService;
