import { PaymentGateway, PaymentStatus } from "@prisma/client";
import { PaymentState } from "./payment.constants";

export interface ProcessFulfillmentJobPayload {
  eventId: string;
  eventType: string;
  orderNumber: string;
  gatewayPaymentId: string;
  gatewayOrderId: string;
  amount: number;
  currency: string;
  signature: string;
  status: PaymentState;
  errorCode?: string;
  errorDescription?: string;
}

export interface WebhookVerifyPayload {
  gatewayOrderId: string;
  gatewayPaymentId: string;
  gatewaySignature: string;
}
