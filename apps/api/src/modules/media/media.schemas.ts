import { z } from "zod";
import { MediaProvider, MediaStatus, MediaType } from "@prisma/client";

export const registerMediaSchema = z.object({
  type: z.nativeEnum(MediaType),
  provider: z.nativeEnum(MediaProvider).optional().default(MediaProvider.LOCAL),
  key: z.string().min(1, "Storage key is required.").max(512),
  mimeType: z.string().min(1, "Mime type is required.").max(100),
  size: z.number().int().min(1, "File size must be positive."),
  hash: z.string().max(64).optional(),
  metadata: z.record(z.any()).optional(), // Provider-agnostic metadata dictionary
});

export const updateMediaStatusSchema = z.object({
  status: z.nativeEnum(MediaStatus),
  metadata: z.record(z.any()).optional(),
});

export type RegisterMediaInput = z.infer<typeof registerMediaSchema>;
export type UpdateMediaStatusInput = z.infer<typeof updateMediaStatusSchema>;
