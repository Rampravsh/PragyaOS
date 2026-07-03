import { z } from "zod";
import { Regex } from "@pragyaos/constants";

export const registerSchema = z.object({
  email: z.string().email("Please provide a valid email address.").trim().toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(
      Regex.PASSWORD,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  firstName: z.string().min(1, "First name is required.").max(100).trim(),
  lastName: z.string().min(1, "Last name is required.").max(100).trim(),
});

export const loginSchema = z.object({
  email: z.string().email("Please provide a valid email address.").trim().toLowerCase(),
  password: z.string().min(1, "Password is required."),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please provide a valid email address.").trim().toLowerCase(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(
      Regex.PASSWORD,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required."),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
