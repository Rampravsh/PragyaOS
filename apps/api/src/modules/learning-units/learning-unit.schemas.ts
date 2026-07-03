import { z } from "zod";
import { LearningUnitType } from "@prisma/client";

export const createLearningUnitSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters long.").max(255),
  description: z.string().optional(),
  type: z.nativeEnum(LearningUnitType),
  sequence: z.number().int().min(0).optional().default(0),
  mediaId: z.string().uuid("Media ID must be a valid UUID.").nullable().optional(),
  content: z.record(z.any()).nullable().optional(), // Structured editor nodes object
  duration: z.number().int().min(0).optional().default(0),
});

export const updateLearningUnitSchema = z.object({
  title: z.string().min(2).max(255).optional(),
  description: z.string().optional(),
  type: z.nativeEnum(LearningUnitType).optional(),
  sequence: z.number().int().min(0).optional(),
  mediaId: z.string().uuid().nullable().optional(),
  content: z.record(z.any()).nullable().optional(),
  duration: z.number().int().min(0).optional(),
});

export const createLearningResourceSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters long.").max(255),
  mediaId: z.string().uuid("Media ID must be a valid UUID."),
  sequence: z.number().int().min(0).optional().default(0),
});

export const updateLearningResourceSchema = z.object({
  title: z.string().min(2).max(255).optional(),
  mediaId: z.string().uuid().optional(),
  sequence: z.number().int().min(0).optional(),
});

export type CreateLearningUnitInput = z.infer<typeof createLearningUnitSchema>;
export type UpdateLearningUnitInput = z.infer<typeof updateLearningUnitSchema>;
export type CreateLearningResourceInput = z.infer<typeof createLearningResourceSchema>;
export type UpdateLearningResourceInput = z.infer<typeof updateLearningResourceSchema>;
