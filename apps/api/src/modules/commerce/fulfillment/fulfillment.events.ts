import { EventEmitter } from "events";
import { logger } from "../../../lib/logger";
import { FULFILLMENT_EVENTS } from "./fulfillment.constants";

export interface BaseFulfillmentEvent {
  version: 1;
  timestamp: string;
  correlationId: string;
  orderId: string;
}

export interface FulfillmentStartedEventPayload extends BaseFulfillmentEvent {
  paymentAttemptId: string;
  userId: string;
}

export interface EnrollmentGrantedEventPayload extends BaseFulfillmentEvent {
  userId: string;
  courseId: string;
  enrollmentId: string;
  status: string; // e.g. "ACTIVE"
}

export interface InvoiceGeneratedEventPayload extends BaseFulfillmentEvent {
  invoiceId: string;
  invoiceNumber: string;
  amount: number;
}

export interface NotificationQueuedEventPayload extends BaseFulfillmentEvent {
  userId: string;
  email: string;
  jobTypes: string[];
}

export interface AnalyticsQueuedEventPayload extends BaseFulfillmentEvent {
  amount: number;
  currency: string;
}

export interface FulfillmentCompletedEventPayload extends BaseFulfillmentEvent {
  userId: string;
  durationMs: number;
}

export interface FulfillmentFailedEventPayload extends BaseFulfillmentEvent {
  userId: string;
  failedStep?: string;
  errorMessage: string;
}

export class FulfillmentEventEmitter extends EventEmitter {
  public emitFulfillmentStarted(payload: FulfillmentStartedEventPayload): void {
    logger.info(`📢 [Fulfillment Event] Started | Correlation: ${payload.correlationId} | Order: ${payload.orderId}`);
    this.emit(FULFILLMENT_EVENTS.FULFILLMENT_STARTED, payload);
  }

  public emitEnrollmentGranted(payload: EnrollmentGrantedEventPayload): void {
    logger.info(`📢 [Fulfillment Event] Enrollment Granted | Enrollment: ${payload.enrollmentId} | Course: ${payload.courseId}`);
    this.emit(FULFILLMENT_EVENTS.ENROLLMENT_GRANTED, payload);
  }

  public emitInvoiceGenerated(payload: InvoiceGeneratedEventPayload): void {
    logger.info(`📢 [Fulfillment Event] Invoice Generated: ${payload.invoiceNumber} | ID: ${payload.invoiceId}`);
    this.emit(FULFILLMENT_EVENTS.INVOICE_GENERATED, payload);
  }

  public emitNotificationQueued(payload: NotificationQueuedEventPayload): void {
    logger.info(`📢 [Fulfillment Event] Notification Queued for User: ${payload.userId}`);
    this.emit(FULFILLMENT_EVENTS.NOTIFICATION_QUEUED, payload);
  }

  public emitAnalyticsQueued(payload: AnalyticsQueuedEventPayload): void {
    logger.info(`📢 [Fulfillment Event] Analytics Queued | Amount: ${payload.amount}`);
    this.emit(FULFILLMENT_EVENTS.ANALYTICS_QUEUED, payload);
  }

  public emitFulfillmentCompleted(payload: FulfillmentCompletedEventPayload): void {
    logger.info(`📢 [Fulfillment Event] Completed successfully in ${payload.durationMs}ms`);
    this.emit(FULFILLMENT_EVENTS.FULFILLMENT_COMPLETED, payload);
  }

  public emitFulfillmentFailed(payload: FulfillmentFailedEventPayload): void {
    logger.error(`📢 [Fulfillment Event] Failed on step: ${payload.failedStep} | Error: ${payload.errorMessage}`);
    this.emit(FULFILLMENT_EVENTS.FULFILLMENT_FAILED, payload);
  }
}

export const fulfillmentEvents = new FulfillmentEventEmitter();
export default fulfillmentEvents;
