import { PaymentAttempt, Order, OrderStatus, PaymentGateway, Prisma } from "@prisma/client";
import { AppError } from "../../../common/errors/appError";
import { logger } from "../../../lib/logger";
import {
  paymentRepository,
  PrismaPaymentRepository,
} from "../payment.repository";
import {
  orderRepository,
  PrismaOrderRepository,
} from "../order.repository";
import {
  PAYMENT_TRANSITIONS,
  PAYMENT_STATUS_MAP,
  PaymentState,
} from "./payment.constants";
import { PaymentMapper } from "./payment.mapper";
import { paymentEvents } from "./payment.events";
import { RepositoryContext } from "../commerce.types";
import { randomUUID } from "crypto";

export class PaymentService {
  constructor(
    private readonly payments: PrismaPaymentRepository = paymentRepository,
    private readonly orders: PrismaOrderRepository = orderRepository
  ) {}

  /**
   * Resolves a payment attempt by ID or raises NotFound.
   */
  public async getPaymentAttempt(id: string, ctx?: RepositoryContext): Promise<PaymentAttempt> {
    const attempt = await this.payments.findById(id, ctx);
    if (!attempt) {
      throw AppError.notFound(`Payment attempt ${id} not found.`);
    }
    return attempt;
  }

  /**
   * Enforces valid state machine transitions and updates database records.
   */
  public async transitionPaymentAttempt(
    paymentAttemptId: string,
    toState: PaymentState,
    gatewayPaymentId?: string,
    errorCode?: string,
    errorDescription?: string,
    ctx?: RepositoryContext
  ): Promise<PaymentAttempt> {
    const attempt = await this.getPaymentAttempt(paymentAttemptId, ctx);
    const fromState = PaymentMapper.toPaymentState(attempt.status);

    // Validate transition
    const allowed = PAYMENT_TRANSITIONS[fromState];
    if (!allowed || !allowed.includes(toState)) {
      throw AppError.badRequest(
        `Invalid state transition for payment ${paymentAttemptId} from ${fromState} to ${toState}.`
      );
    }

    const dbStatus = PAYMENT_STATUS_MAP[toState];
    const updateData: Prisma.PaymentAttemptUpdateInput = {
      status: dbStatus,
      ...(gatewayPaymentId && { gatewayPaymentId }),
      ...(errorCode && { errorCode }),
      ...(errorDescription && { errorDescription }),
    };

    const updated = await this.payments.update(paymentAttemptId, updateData, ctx);
    logger.info(`🔄 [Payment State Machine] Transitioned ${paymentAttemptId} from ${fromState} to ${toState}.`);

    // Emit matching lifecycle event
    const basePayload = {
      version: 1 as const,
      eventId: randomUUID(),
      timestamp: new Date().toISOString(),
      paymentAttemptId,
      orderId: attempt.orderId,
    };

    if (toState === "AUTHORIZED" && gatewayPaymentId) {
      paymentEvents.emitPaymentAuthorized({
        ...basePayload,
        gatewayPaymentId,
        amount: attempt.amount,
      });
    } else if (toState === "CAPTURED" && gatewayPaymentId) {
      paymentEvents.emitPaymentCaptured({
        ...basePayload,
        gatewayPaymentId,
        amount: attempt.amount,
      });
    } else if (toState === "FAILED") {
      paymentEvents.emitPaymentFailed({
        ...basePayload,
        gatewayPaymentId,
        errorCode,
        errorDescription,
      });
    }

    return updated;
  }

  /**
   * Helper that updates order status safely.
   */
  public async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
    expectedStatus: OrderStatus,
    ctx?: RepositoryContext
  ): Promise<Order> {
    const order = await this.orders.findById(orderId, ctx);
    if (!order) {
      throw AppError.notFound(`Order ${orderId} not found.`);
    }

    if (order.status !== expectedStatus) {
      throw AppError.conflict(
        `Order ${orderId} cannot transition to ${status} because it is in status ${order.status} (Expected: ${expectedStatus}).`
      );
    }

    return this.orders.updateOrderStatus(orderId, status, expectedStatus, ctx);
  }
}

export const paymentService = new PaymentService();
export default paymentService;
