import { EventEmitter } from "events";
import { logger } from "../../../lib/logger";
import { PAYMENT_EVENTS } from "./payment.constants";

export interface BasePaymentEvent {
  version: 1;
  eventId: string;
  timestamp: string;
}

export interface PaymentInitiatedEventPayload extends BasePaymentEvent {
  paymentAttemptId: string;
  orderId: string;
  gateway: string;
  amount: number;
  currency: string;
}

export interface PaymentAuthorizedEventPayload extends BasePaymentEvent {
  paymentAttemptId: string;
  orderId: string;
  gatewayPaymentId: string;
  amount: number;
}

export interface PaymentCapturedEventPayload extends BasePaymentEvent {
  paymentAttemptId: string;
  orderId: string;
  gatewayPaymentId: string;
  amount: number;
}

export interface PaymentFailedEventPayload extends BasePaymentEvent {
  paymentAttemptId: string;
  orderId: string;
  gatewayPaymentId?: string;
  errorCode?: string;
  errorDescription?: string;
}

export interface WebhookReceivedEventPayload extends BasePaymentEvent {
  gateway: string;
  webhookEventId: string;
  eventType: string;
}

export interface WebhookVerifiedEventPayload extends BasePaymentEvent {
  gateway: string;
  webhookEventId: string;
  orderNumber?: string;
}

export interface FulfillmentQueuedEventPayload extends BasePaymentEvent {
  orderId: string;
  userId: string;
  jobsEnqueued: string[];
}

export class PaymentEventEmitter extends EventEmitter {
  public emitPaymentInitiated(payload: PaymentInitiatedEventPayload): void {
    logger.info(`📢 [Payment Event] Initiated: ${payload.paymentAttemptId} for Order: ${payload.orderId}`);
    this.emit(PAYMENT_EVENTS.PAYMENT_INITIATED, payload);
  }

  public emitPaymentAuthorized(payload: PaymentAuthorizedEventPayload): void {
    logger.info(`📢 [Payment Event] Authorized: ${payload.paymentAttemptId} | Gateway ID: ${payload.gatewayPaymentId}`);
    this.emit(PAYMENT_EVENTS.PAYMENT_AUTHORIZED, payload);
  }

  public emitPaymentCaptured(payload: PaymentCapturedEventPayload): void {
    logger.info(`📢 [Payment Event] Captured: ${payload.paymentAttemptId} | Order: ${payload.orderId}`);
    this.emit(PAYMENT_EVENTS.PAYMENT_CAPTURED, payload);
  }

  public emitPaymentFailed(payload: PaymentFailedEventPayload): void {
    logger.error(`📢 [Payment Event] Failed: ${payload.paymentAttemptId} | Reason: ${payload.errorDescription}`);
    this.emit(PAYMENT_EVENTS.PAYMENT_FAILED, payload);
  }

  public emitWebhookReceived(payload: WebhookReceivedEventPayload): void {
    logger.info(`📢 [Payment Event] Webhook Received: ${payload.webhookEventId} | Event: ${payload.eventType}`);
    this.emit(PAYMENT_EVENTS.WEBHOOK_RECEIVED, payload);
  }

  public emitWebhookVerified(payload: WebhookVerifiedEventPayload): void {
    logger.info(`📢 [Payment Event] Webhook Verified: ${payload.webhookEventId}`);
    this.emit(PAYMENT_EVENTS.WEBHOOK_VERIFIED, payload);
  }

  public emitFulfillmentQueued(payload: FulfillmentQueuedEventPayload): void {
    logger.info(`📢 [Payment Event] Fulfillment Queued for Order: ${payload.orderId} | Jobs: ${payload.jobsEnqueued.join(", ")}`);
    this.emit(PAYMENT_EVENTS.FULFILLMENT_QUEUED, payload);
  }
}

export const paymentEvents = new PaymentEventEmitter();
export default paymentEvents;
