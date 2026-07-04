import Razorpay from "razorpay";
import crypto from "crypto";
import { PaymentGateway, PaymentGatewayOrderResponse } from "../payment.gateway";
import { Money } from "../money";
import { commerceConfig } from "../../../config/commerce";
import { logger } from "../../../lib/logger";

export class RazorpayGateway implements PaymentGateway {
  public readonly name = "RAZORPAY";
  private razorpayClient: Razorpay;

  constructor() {
    this.razorpayClient = new Razorpay({
      key_id: commerceConfig.gateway.razorpay.keyId,
      key_secret: commerceConfig.gateway.razorpay.keySecret,
    });
  }

  /**
   * Registers a payment order with Razorpay.
   */
  public async createOrder(orderNumber: string, amount: Money): Promise<PaymentGatewayOrderResponse> {
    try {
      const options = {
        amount: amount.amount, // Stored in minor currency units (paise)
        currency: amount.currency.code,
        receipt: orderNumber,
      };
      const order = await this.razorpayClient.orders.create(options);
      return {
        gatewayOrderId: order.id,
        amount: order.amount as number,
        currency: order.currency,
      };
    } catch (err: any) {
      logger.error(`[RazorpayGateway] Failed to create order: ${err.message}`);
      throw err;
    }
  }

  /**
   * Verifies the cryptographic HMAC signature returned from the frontend/checkout callback.
   */
  public async verifyPayment(payload: {
    gatewayOrderId: string;
    gatewayPaymentId: string;
    gatewaySignature: string;
  }): Promise<boolean> {
    try {
      const text = `${payload.gatewayOrderId}|${payload.gatewayPaymentId}`;
      const generatedSignature = crypto
        .createHmac("sha256", commerceConfig.gateway.razorpay.keySecret)
        .update(text)
        .digest("hex");
      return generatedSignature === payload.gatewaySignature;
    } catch (err: any) {
      logger.error(`[RazorpayGateway] Signature verification error: ${err.message}`);
      return false;
    }
  }

  /**
   * Stub refund trigger interface (Milestone 15D objective: interface stub only).
   */
  public async processRefund(gatewayPaymentId: string, amount: Money, reason: string): Promise<string> {
    logger.info(`[RazorpayGateway] Processing stub refund for payment: ${gatewayPaymentId} | Amount: ${amount.format()}`);
    // Mock refund transaction ID
    return `pay_ref_${crypto.randomBytes(8).toString("hex")}`;
  }
}

export const razorpayGateway = new RazorpayGateway();
export default razorpayGateway;
