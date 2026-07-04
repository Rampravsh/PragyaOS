import { z } from "zod";

export const createTemplateSchema = z.object({
  name: z.string().min(2).max(255),
  slug: z
    .string()
    .min(2)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must contain only lowercase alphanumeric characters and hyphens."),
  templateVersion: z.string().min(1).max(50),
  htmlTemplate: z.string().min(1),
  cssTemplate: z.string().min(1),
  branding: z.record(z.any()).optional(),
});

export const updateTemplateSchema = z.object({
  name: z.string().min(2).max(255).optional(),
  slug: z
    .string()
    .min(2)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must contain only lowercase alphanumeric characters and hyphens.")
    .optional(),
  templateVersion: z.string().min(1).max(50).optional(),
  htmlTemplate: z.string().min(1).optional(),
  cssTemplate: z.string().min(1).optional(),
  branding: z.record(z.any()).optional(),
  active: z.boolean().optional(),
});

export const issueCredentialSchema = z.object({
  userId: z.string().uuid("User ID must be a valid UUID."),
  courseId: z.string().uuid("Course ID must be a valid UUID."),
  templateId: z.string().uuid("Template ID must be a valid UUID."),
  expiresAt: z.string().datetime().nullable().optional(),
  metadata: z.object({
    studentName: z.string().min(1),
    courseTitle: z.string().min(1),
    instructorName: z.string().min(1),
    completionDate: z.string().min(1),
    customData: z.record(z.any()).optional(),
  }),
});

export const verifyCredentialSchema = z.object({
  verificationToken: z.string().min(1, "Verification token is required."),
  source: z.enum(["PUBLIC_PAGE", "API", "ADMIN"]),
});

export const revokeCredentialSchema = z.object({
  credentialId: z.string().uuid("Credential ID must be a valid UUID."),
  reason: z.string().min(1).max(1000),
  metadata: z.record(z.any()).optional(),
});

export type CreateTemplateInput = z.infer<typeof createTemplateSchema>;
export type UpdateTemplateInput = z.infer<typeof updateTemplateSchema>;
export type IssueCredentialInput = z.infer<typeof issueCredentialSchema>;
export type VerifyCredentialInput = z.infer<typeof verifyCredentialSchema>;
export type RevokeCredentialInput = z.infer<typeof revokeCredentialSchema>;
