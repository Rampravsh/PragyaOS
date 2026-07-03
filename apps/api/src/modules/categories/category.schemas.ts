import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long.").max(100),
  parentId: z.string().uuid("Parent ID must be a valid UUID.").nullable().optional(),
  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must contain only lowercase alphanumeric characters and hyphens.")
    .optional(),
  description: z.string().max(1000).optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().min(2).max(100).optional(),
  parentId: z.string().uuid().nullable().optional(),
  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must contain only lowercase alphanumeric characters and hyphens.")
    .optional(),
  description: z.string().max(1000).optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
