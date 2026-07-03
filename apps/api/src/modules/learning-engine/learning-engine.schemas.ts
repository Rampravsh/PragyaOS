import { z } from "zod";
import { CourseCompletionReason } from "@prisma/client";

export const enrollStudentSchema = z.object({
  courseId: z.string().uuid("Invalid courseId. Must be a valid UUID."),
  source: z.string().max(50).optional().default("MANUAL"),
  purchaseRef: z.string().max(100).optional(),
});

export const updateProgressSchema = z.object({
  learningUnitId: z.string().uuid("Invalid learningUnitId. Must be a valid UUID."),
  watchTime: z.number().int().min(0).optional(),
  lastPosition: z.number().int().min(0).optional(),
  percentInput: z.number().min(0).max(100).optional(),
  quizScore: z.number().min(0).optional(),
  quizPassingScore: z.number().min(0).optional(),
  quizMaxScore: z.number().min(0).optional(),
  isSubmitted: z.boolean().optional(),
});

export const startSessionSchema = z.object({
  learningUnitId: z.string().uuid("Invalid learningUnitId.").optional(),
  device: z.string().max(100).optional(),
  browser: z.string().max(100).optional(),
  ipAddress: z.string().max(45).optional(),
  userAgent: z.string().max(512).optional(),
});

export const adminOverrideCompletionSchema = z.object({
  progressPercent: z.number().min(0).max(100),
  eligibleForCertificate: z.boolean(),
  reason: z.nativeEnum(CourseCompletionReason).optional().default(CourseCompletionReason.ADMIN_OVERRIDE),
});

export type EnrollStudentInput = z.infer<typeof enrollStudentSchema>;
export type UpdateProgressInput = z.infer<typeof updateProgressSchema>;
export type StartSessionInput = z.infer<typeof startSessionSchema>;
export type AdminOverrideCompletionInput = z.infer<typeof adminOverrideCompletionSchema>;
