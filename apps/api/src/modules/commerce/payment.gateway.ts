import { Money } from "./money";

export interface PaymentGatewayOrderResponse {
  gatewayOrderId: string;
  amount: number; // in cents/paise
  currency: string;
  metadata?: Record<string, any>;
}

export interface PaymentGateway {
  name: string; // e.g. "RAZORPAY", "STRIPE"

  // Creates order on gateway
  createOrder(orderNumber: string, amount: Money): Promise<PaymentGatewayOrderResponse>;

  // Verifies signature return checks
  verifyPayment(payload: {
    gatewayOrderId: string;
    gatewayPaymentId: string;
    gatewaySignature: string;
  }): Promise<boolean>;

  // Processes refunds through gateway
  processRefund(gatewayPaymentId: string, amount: Money, reason: string): Promise<string>;
}
