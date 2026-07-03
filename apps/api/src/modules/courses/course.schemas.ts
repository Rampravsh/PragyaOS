import { z } from "zod";
import { CourseStatus, CourseVisibility, DifficultyLevel } from "@prisma/client";

export const createCourseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long.").max(255),
  subtitle: z.string().max(512).optional(),
  description: z.string().optional(),
  categoryId: z.string().uuid("Category ID must be a valid UUID."),
  language: z.string().max(10).optional().default("en"),
  difficulty: z.nativeEnum(DifficultyLevel).optional().default(DifficultyLevel.BEGINNER),
  estimatedDuration: z.number().int().min(0).optional().default(0),
  thumbnailId: z.string().uuid().nullable().optional(),
  trailerId: z.string().uuid().nullable().optional(),
  seoMetadata: z
    .object({
      title: z.string().max(100).optional(),
      description: z.string().max(255).optional(),
      keywords: z.array(z.string()).optional(),
    })
    .optional(),
  visibility: z.nativeEnum(CourseVisibility).optional().default(CourseVisibility.PUBLIC),
  status: z.nativeEnum(CourseStatus).optional().default(CourseStatus.DRAFT),
  instructors: z.array(z.string().uuid("Each instructor ID must be a valid UUID.")).optional(),
  requirements: z.array(z.string().max(512)).optional(),
  objectives: z.array(z.string().max(512)).optional(),
  tags: z.array(z.string().max(50)).optional(),
});

export const updateCourseSchema = z.object({
  title: z.string().min(5).max(255).optional(),
  subtitle: z.string().max(512).optional(),
  description: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  language: z.string().max(10).optional(),
  difficulty: z.nativeEnum(DifficultyLevel).optional(),
  estimatedDuration: z.number().int().min(0).optional(),
  thumbnailId: z.string().uuid().nullable().optional(),
  trailerId: z.string().uuid().nullable().optional(),
  seoMetadata: z
    .object({
      title: z.string().max(100).optional(),
      description: z.string().max(255).optional(),
      keywords: z.array(z.string()).optional(),
    })
    .optional(),
  visibility: z.nativeEnum(CourseVisibility).optional(),
  status: z.nativeEnum(CourseStatus).optional(),
  instructors: z.array(z.string().uuid()).optional(),
  requirements: z.array(z.string().max(512)).optional(),
  objectives: z.array(z.string().max(512)).optional(),
  tags: z.array(z.string().max(50)).optional(),
});

export const createModuleSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters long.").max(255),
  description: z.string().optional(),
  sequence: z.number().int().min(0).optional().default(0),
});

export const updateModuleSchema = z.object({
  title: z.string().min(2).max(255).optional(),
  description: z.string().optional(),
  sequence: z.number().int().min(0).optional(),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
export type CreateModuleInput = z.infer<typeof createModuleSchema>;
export type UpdateModuleInput = z.infer<typeof updateModuleSchema>;
