import { z } from "zod";

export const listNotificationsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(["PENDING", "QUEUED", "SENT", "DELIVERED", "READ", "FAILED"]).optional(),
});

export const markReadSchema = z.object({
  id: z.string().uuid("Notification ID must be a valid UUID."),
});

export const updatePreferencesSchema = z.object({
  channelPreferences: z.record(z.boolean()).optional(),
  categoryPreferences: z.record(z.boolean()).optional(),
  marketingOptIn: z.boolean().optional(),
  digestEnabled: z.boolean().optional(),
});

export const createTemplateSchema = z.object({
  name: z.string().min(2).max(255),
  slug: z
    .string()
    .min(2)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase alphanumeric with hyphens."),
  version: z.number().int().min(1).optional().default(1),
  channel: z.enum(["IN_APP", "EMAIL", "PUSH", "SMS"]),
  locale: z.string().min(2).max(10).optional().default("en"),
  titleTemplate: z.string().min(1).max(512),
  bodyTemplate: z.string().min(1),
  variables: z.array(z.string()).optional().default([]),
});

export type ListNotificationsQuery = z.infer<typeof listNotificationsQuerySchema>;
export type UpdatePreferencesInput = z.infer<typeof updatePreferencesSchema>;
export type CreateTemplateInput = z.infer<typeof createTemplateSchema>;
