import { z } from "zod";

export const submitReviewSchema = z.object({
  changeSummary: z.string().max(500).optional(),
});

export const publishCourseSchema = z.object({
  changeSummary: z.string().max(500).optional(),
});

export const generatePreviewSchema = z.object({
  scope: z.enum(["INSTRUCTOR", "REVIEWER", "PUBLIC"]).default("INSTRUCTOR"),
  expiresInSeconds: z.number().int().min(60).max(86400).optional().default(3600), // Default 1 hour
});

export const duplicateCourseSchema = z.object({
  newTitle: z.string().min(1).max(255).optional(),
});

export const moveModuleSchema = z.object({
  targetIndex: z.number().int().min(0),
});

export const moveLearningUnitSchema = z.object({
  targetModuleId: z.string().uuid("Invalid target module UUID"),
  targetIndex: z.number().int().min(0),
});

export const bulkReorderCurriculumSchema = z.object({
  modules: z.array(
    z.object({
      id: z.string().uuid("Invalid module UUID"),
      sequence: z.number().int().min(0),
      learningUnits: z.array(
        z.object({
          id: z.string().uuid("Invalid unit UUID"),
          sequence: z.number().int().min(0),
        })
      ).optional(),
    })
  ).min(1, "At least one module is required for curriculum reordering."),
});

export type SubmitReviewInput = z.infer<typeof submitReviewSchema>;
export type PublishCourseInput = z.infer<typeof publishCourseSchema>;
export type GeneratePreviewInput = z.infer<typeof generatePreviewSchema>;
export type DuplicateCourseInput = z.infer<typeof duplicateCourseSchema>;
export type MoveModuleInput = z.infer<typeof moveModuleSchema>;
export type MoveLearningUnitInput = z.infer<typeof moveLearningUnitSchema>;
export type BulkReorderCurriculumInput = z.infer<typeof bulkReorderCurriculumSchema>;
