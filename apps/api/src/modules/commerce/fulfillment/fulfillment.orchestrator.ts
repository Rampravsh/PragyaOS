import { OrderStatus, PaymentStatus, FulfillmentStatus } from "@prisma/client";
import { randomUUID } from "crypto";
import { AppError } from "../../../common/errors/appError";
import { logger } from "../../../lib/logger";
import { fulfillmentExecutionRepository } from "./fulfillment-execution.repository";

import { orderRepository, PrismaOrderRepository } from "../order.repository";
import { paymentRepository, PrismaPaymentRepository } from "../payment.repository";
import { paymentEvents } from "../payment/payment.events";
import { PAYMENT_EVENTS } from "../payment/payment.constants";
import { paymentIdempotencyService } from "../payment/payment-idempotency.service";

import { Queue } from "bullmq";
import { config } from "../../../config";
import { FULFILLMENT_QUEUES } from "./fulfillment.constants";
import { FulfillmentJobData } from "./fulfillment.types";

// Central fulfillment queue instance
export const fulfillmentQueue = new Queue<FulfillmentJobData>(
  FULFILLMENT_QUEUES.FULFILLMENT,
  {
    connection: { url: config.redis.url },
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: "exponential", delay: 5000 },
      removeOnComplete: true,
      removeOnFail: false,
    },
  }
);

export class FulfillmentOrchestrator {
  constructor(
    private readonly orders: PrismaOrderRepository = orderRepository,
    private readonly payments: PrismaPaymentRepository = paymentRepository
  ) {
    this.registerPaymentListeners();
  }

  /**
   * Registers listeners for successful payment capture callbacks.
   */
  private registerPaymentListeners(): void {
    paymentEvents.on(PAYMENT_EVENTS.PAYMENT_CAPTURED, this.handlePaymentCaptured);
    logger.info("🔌 [FulfillmentOrchestrator] Registered listener for PAYMENT_CAPTURED.");
  }

  /**
   * Handles payment captured event payloads, validates order details, and triggers fulfillment queues.
   */
  public handlePaymentCaptured = async (payload: {
    paymentAttemptId: string;
    orderId: string;
    gatewayPaymentId: string;
    amount: number;
    correlationId?: string;
  }): Promise<void> => {
    const { orderId, paymentAttemptId } = payload;
    const correlationId = payload.correlationId || randomUUID();

    logger.info(
      `📥 [FulfillmentOrchestrator] PAYMENT_CAPTURED received for Order: ${orderId} | Attempt: ${paymentAttemptId}`
    );

    // 1. Fetch Order and PaymentAttempt
    const order = await this.orders.findById(orderId);
    if (!order) {
      logger.error(`❌ [FulfillmentOrchestrator] Order ${orderId} not found.`);
      return;
    }

    const attempt = await this.payments.findById(paymentAttemptId);
    if (!attempt) {
      logger.error(`❌ [FulfillmentOrchestrator] PaymentAttempt ${paymentAttemptId} not found.`);
      return;
    }

    // 2. Validate payment status is CAPTURED/SUCCESS and order is PAID
    if (order.status !== OrderStatus.PAID) {
      logger.error(`❌ [FulfillmentOrchestrator] Order ${orderId} status is ${order.status} (Expected: PAID). Aborting.`);
      return;
    }

    if (attempt.status !== PaymentStatus.SUCCESS) {
      logger.error(`❌ [FulfillmentOrchestrator] PaymentAttempt ${paymentAttemptId} status is ${attempt.status} (Expected: SUCCESS). Aborting.`);
      return;
    }

    // 3. Acquire idempotency lock
    const lockKey = `fulfillment:lock:${orderId}`;
    const alreadyProcessed = await paymentIdempotencyService.hasProcessed(lockKey);
    if (alreadyProcessed) {
      logger.warn(`⚠️ [FulfillmentOrchestrator] Order ${orderId} already processed. Skipping duplication.`);
      return;
    }

    const lockAcquired = await paymentIdempotencyService.acquireLock(lockKey, 3600);
    if (!lockAcquired) {
      logger.error(`❌ [FulfillmentOrchestrator] Failed to acquire lock for key ${lockKey}.`);
      return;
    }

    try {
      // 4. Create database-level FulfillmentExecution audit trail record using repository
      await fulfillmentExecutionRepository.create({
        orderId: order.id,
        paymentAttemptId: attempt.id,
        status: FulfillmentStatus.PENDING,
        correlationId,
      });

      // Find courseId if applicable from line items
      const courseItem = (order as any).items?.find(
        (item: any) => item.product?.sellableType === "COURSE"
      );
      const courseId = courseItem?.product?.sellableId || undefined;

      // 5. Dispatch core job to fulfillment-queue
      await fulfillmentQueue.add("process-fulfillment", {
        correlationId,
        orderId: order.id,
        paymentAttemptId: attempt.id,
        userId: order.userId,
        amount: order.netAmount,
        currency: order.currency,
        courseId,
      });

      logger.info(`✅ [FulfillmentOrchestrator] Async fulfillment job enqueued for Order: ${orderId}`);
    } catch (err: any) {
      logger.error(`❌ [FulfillmentOrchestrator] Error enqueuing job: ${err.message}`);
      // In case of error, release the Redis lock key
      await paymentIdempotencyService.releaseLock(lockKey);
    }
  };
}

export const fulfillmentOrchestrator = new FulfillmentOrchestrator();
export default fulfillmentOrchestrator;
