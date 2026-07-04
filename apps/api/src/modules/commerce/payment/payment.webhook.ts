import crypto from "crypto";
import { WebhookEventStatus } from "@prisma/client";
import { AppError } from "../../../common/errors/appError";
import { logger } from "../../../lib/logger";
import { commerceConfig } from "../../../config/commerce";
import { paymentIdempotencyService } from "./payment-idempotency.service";
import { webhookEventRepository } from "./webhook-event.repository";
import { paymentEvents } from "./payment.events";
import { randomUUID } from "crypto";
import { Queue } from "bullmq";
import { config } from "../../../config";

// Instantiate the payment processing queue here to prevent circular imports with the worker
export const paymentQueue = new Queue("payment-queue", {
  connection: { url: config.redis.url },
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

export interface NormalizedWebhookEvent {
  eventId: string;
  eventType: string;
  gatewayOrderId: string;
  gatewayPaymentId: string;
  amount: number;
  currency: string;
  errorCode?: string;
  errorDescription?: string;
}

export class WebhookVerifier {
  /**
   * Verifies the Razorpay webhook HMAC signature.
   */
  public verifySignature(
    rawBody: string | Buffer,
    signature: string,
    secret: string = commerceConfig.gateway.razorpay.webhookSecret
  ): boolean {
    if (!signature) return false;
    try {
      const generatedSignature = crypto
        .createHmac("sha256", secret)
        .update(rawBody)
        .digest("hex");
      return crypto.timingSafeEqual(Buffer.from(generatedSignature), Buffer.from(signature));
    } catch (err: any) {
      logger.error(`[WebhookVerifier] Signature computation error: ${err.message}`);
      return false;
    }
  }

  /**
   * Replay attack protection: validates webhook event age threshold.
   */
  public validateTimestamp(eventTimestampSeconds: number, maxAgeSeconds: number = 300): void {
    const currentSeconds = Math.floor(Date.now() / 1000);
    const age = Math.abs(currentSeconds - eventTimestampSeconds);
    if (age > maxAgeSeconds) {
      throw AppError.badRequest("Webhook payload expired (replay protection check failed).");
    }
  }
}

export class WebhookParser {
  /**
   * Normalizes Razorpay event bodies to unified schema definitions.
   */
  public parseRazorpayEvent(body: any): NormalizedWebhookEvent {
    const eventId = body.id || body.event_id;
    const eventType = body.event;
    const paymentEntity = body.payload?.payment?.entity;

    if (!eventId || !eventType || !paymentEntity) {
      throw AppError.badRequest("Malformed Razorpay webhook event payload payload structure.");
    }

    return {
      eventId,
      eventType,
      gatewayOrderId: paymentEntity.order_id,
      gatewayPaymentId: paymentEntity.id,
      amount: paymentEntity.amount, // in minor units (paise)
      currency: paymentEntity.currency,
      errorCode: paymentEntity.error_code || undefined,
      errorDescription: paymentEntity.error_description || undefined,
    };
  }
}

export class WebhookDispatcher {
  constructor(
    private readonly verifier: WebhookVerifier = new WebhookVerifier(),
    private readonly parser: WebhookParser = new WebhookParser()
  ) {}

  /**
   * Handles saving webhook logs, acquiring locks, and enqueuing queue jobs.
   */
  public async dispatch(
    rawBody: string | Buffer,
    signature: string,
    parsedJson: any
  ): Promise<void> {
    // 1. Verify webhook signature
    const isValid = this.verifier.verifySignature(rawBody, signature);
    if (!isValid) {
      throw AppError.badRequest("Invalid webhook signature verification checks.");
    }

    // 2. Validate timestamp for replay protection
    if (parsedJson.created_at) {
      this.verifier.validateTimestamp(parsedJson.created_at);
    }

    // 3. Normalize pay-loader properties
    const event = this.parser.parseRazorpayEvent(parsedJson);

    // 4. Save WebhookEvent audit record
    await webhookEventRepository.create({
      eventId: event.eventId,
      provider: "RAZORPAY",
      payload: parsedJson as any,
      signature,
      status: WebhookEventStatus.RECEIVED,
    });

    // 5. Emit Webhook Received event
    paymentEvents.emitWebhookReceived({
      version: 1,
      eventId: randomUUID(),
      timestamp: new Date().toISOString(),
      gateway: "RAZORPAY",
      webhookEventId: event.eventId,
      eventType: event.eventType,
    });

    // 6. Redis Idempotency checks
    const lockKey = `webhook:idempotency:${event.eventId}`;
    const alreadyProcessed = await paymentIdempotencyService.hasProcessed(lockKey);
    if (alreadyProcessed) {
      logger.warn(`⚠️ [WebhookDispatcher] Event ${event.eventId} was already processed. Ignoring duplicate.`);
      return;
    }

    const lockAcquired = await paymentIdempotencyService.acquireLock(lockKey, 3600); // 1-hour transaction lock
    if (!lockAcquired) {
      throw AppError.conflict("Lock active or Redis validation failed.");
    }

    // 7. Push execution job to BullMQ payment queue
    await paymentQueue.add("process-fulfillment", event);
    logger.info(`📥 [WebhookDispatcher] Payment fulfillment enqueued for Order: ${event.gatewayOrderId} | ID: ${event.eventId}`);

    // Emit Webhook Verified event
    paymentEvents.emitWebhookVerified({
      version: 1,
      eventId: randomUUID(),
      timestamp: new Date().toISOString(),
      gateway: "RAZORPAY",
      webhookEventId: event.eventId,
      orderNumber: event.gatewayOrderId,
    });
  }
}

export const webhookVerifier = new WebhookVerifier();
export const webhookParser = new WebhookParser();
export const webhookDispatcher = new WebhookDispatcher(webhookVerifier, webhookParser);
