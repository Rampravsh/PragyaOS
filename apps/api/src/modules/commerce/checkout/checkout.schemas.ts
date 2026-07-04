import { z } from "zod";
import { PaymentGateway } from "@prisma/client";

/**
 * Zod schema for validating the initiate checkout request payload.
 * Controllers will call validate(initiateCheckoutSchema, req.body).
 */
export const initiateCheckoutSchema = z.object({
  productId: z.string().uuid("productId must be a valid UUID."),
  priceId: z.string().uuid("priceId must be a valid UUID."),
  couponCode: z
    .string()
    .min(1)
    .max(50)
    .transform((v) => v.toUpperCase())
    .optional(),
  billingRegion: z
    .string()
    .length(2, "billingRegion must be a 2-character ISO country code.")
    .toUpperCase()
    .optional(),
  gateway: z.nativeEnum(PaymentGateway).optional(),
});

export type InitiateCheckoutSchema = z.infer<typeof initiateCheckoutSchema>;
