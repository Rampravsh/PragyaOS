import { z } from "zod";

export const traceContextSchema = z.object({
  correlationId: z.string().min(1, "correlationId is required"),
  orderId: z.string().uuid("orderId must be a valid UUID"),
  paymentAttemptId: z.string().uuid("paymentAttemptId must be a valid UUID"),
  userId: z.string().uuid("userId must be a valid UUID"),
});

export const fulfillmentJobSchema = traceContextSchema.extend({
  courseId: z.string().uuid().optional(),
  amount: z.number().int().min(0),
  currency: z.string().length(3),
});
