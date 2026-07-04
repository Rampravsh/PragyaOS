import { z } from "zod";

export const paymentWebhookSignatureSchema = z.object({
  gatewayOrderId: z.string().min(1, "Gateway order ID is required"),
  gatewayPaymentId: z.string().min(1, "Gateway payment ID is required"),
  gatewaySignature: z.string().min(1, "Gateway signature is required"),
});
