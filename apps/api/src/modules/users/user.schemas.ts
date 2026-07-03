import { z } from "zod";
import { Regex } from "@pragyaos/constants";
import { USER_CONSTANTS } from "./user.constants";

export const updateProfileSchema = z.object({
  firstName: z.string().max(100).trim().optional(),
  lastName: z.string().max(100).trim().optional(),
  displayName: z.string().max(100).trim().optional(),
  bio: z.string().max(1000).trim().optional(),
  timezone: z.string().max(100).trim().optional(),
  language: z.enum(USER_CONSTANTS.LANGUAGES).optional(),
});

export const updateAvatarSchema = z.object({
  avatarUrl: z.string().url("Please provide a valid avatar URL link.").max(512),
});

export const updatePreferencesSchema = z.object({
  theme: z.enum(USER_CONSTANTS.THEMES).optional(),
  emailPreference: z.boolean().optional(),
  notificationPreference: z.boolean().optional(),
  marketingPreference: z.boolean().optional(),
  privacyPreference: z.enum(["public", "private"]).optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required."),
  newPassword: z
    .string()
    .min(8, "New password must be at least 8 characters long.")
    .regex(
      Regex.PASSWORD,
      "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
});

export const auditQuerySchema = z.object({
  page: z.string().optional().default("1").transform((val) => parseInt(val, 10)),
  limit: z.string().optional().default("10").transform((val) => parseInt(val, 10)),
  action: z.string().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdateAvatarInput = z.infer<typeof updateAvatarSchema>;
export type UpdatePreferencesInput = z.infer<typeof updatePreferencesSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type AuditQueryInput = z.infer<typeof auditQuerySchema>;
