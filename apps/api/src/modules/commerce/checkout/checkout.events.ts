import { EventEmitter } from "events";
import { logger } from "../../../lib/logger";
import { CHECKOUT_EVENTS } from "./checkout.constants";

/**
 * Checkout-specific event payloads.
 * All include version: 1 for backward-compatible consumer contracts.
 */

export interface CheckoutStartedPayload {
  version: 1;
  eventId: string;
  timestamp: string;
  userId: string;
  productId: string;
  priceId: string;
  currency: string;
}

export interface OrderCreatedPayload {
  version: 1;
  eventId: string;
  timestamp: string;
  orderId: string;
  orderNumber: string;
  userId: string;
  subtotalAmount: number;
  discountAmount: number;
  taxAmount: number;
  netAmount: number;
  currency: string;
}

export interface CouponValidatedPayload {
  version: 1;
  eventId: string;
  timestamp: string;
  couponId: string;
  userId: string;
  orderId: string;
  discountAmount: number;
}

export interface PaymentInitiatedPayload {
  version: 1;
  eventId: string;
  timestamp: string;
  paymentAttemptId: string;
  orderId: string;
  gateway: string;
  amount: number;
  currency: string;
}

/**
 * Type-safe EventEmitter for the Checkout domain.
 * Follows the same pattern as LearningEngineEventEmitter.
 */
export class CheckoutEventEmitter extends EventEmitter {
  public emitCheckoutStarted(payload: CheckoutStartedPayload): void {
    logger.info(
      `📢 [Event] ${CHECKOUT_EVENTS.CHECKOUT_STARTED} — userId: ${payload.userId}, productId: ${payload.productId}`
    );
    this.emit(CHECKOUT_EVENTS.CHECKOUT_STARTED, payload);
  }

  public emitOrderCreated(payload: OrderCreatedPayload): void {
    logger.info(
      `📢 [Event] ${CHECKOUT_EVENTS.ORDER_CREATED} — orderId: ${payload.orderId}, orderNumber: ${payload.orderNumber}`
    );
    this.emit(CHECKOUT_EVENTS.ORDER_CREATED, payload);
  }

  public emitCouponValidated(payload: CouponValidatedPayload): void {
    logger.info(
      `📢 [Event] ${CHECKOUT_EVENTS.COUPON_VALIDATED} — couponId: ${payload.couponId}, orderId: ${payload.orderId}`
    );
    this.emit(CHECKOUT_EVENTS.COUPON_VALIDATED, payload);
  }

  public emitPaymentInitiated(payload: PaymentInitiatedPayload): void {
    logger.info(
      `📢 [Event] ${CHECKOUT_EVENTS.PAYMENT_INITIATED} — paymentAttemptId: ${payload.paymentAttemptId}, orderId: ${payload.orderId}`
    );
    this.emit(CHECKOUT_EVENTS.PAYMENT_INITIATED, payload);
  }
}

export const checkoutEvents = new CheckoutEventEmitter();
export default checkoutEvents;
