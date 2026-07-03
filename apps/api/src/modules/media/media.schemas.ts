import { z } from "zod";
import { MediaProvider, MediaStatus, MediaType } from "@prisma/client";

export const requestUploadUrlSchema = z.object({
  filename: z.string().min(1, "Original filename is required.").max(255),
  mimeType: z.string().min(1, "MIME type is required.").max(100),
  size: z.number().int().min(1, "File size must be positive."),
  hash: z.string().max(64).optional(), // Client-calculated SHA-256 or checksum hash
});

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

export const initiateMultipartSchema = z.object({
  filename: z.string().min(1, "Original filename is required.").max(255),
  mimeType: z.string().min(1, "MIME type is required.").max(100),
  size: z.number().int().min(1, "File size must be positive."),
  hash: z.string().max(64).optional(),
});

export const presignPartSchema = z.object({
  key: z.string().min(1, "Storage key is required."),
  uploadId: z.string().min(1, "UploadId is required."),
  partNumber: z.number().int().min(1, "Part number must be at least 1."),
});

export const completeMultipartSchema = z.object({
  key: z.string().min(1, "Storage key is required."),
  uploadId: z.string().min(1, "UploadId is required."),
  parts: z.array(
    z.object({
      PartNumber: z.number().int().min(1),
      ETag: z.string().min(1, "ETag is required for part completion."),
    })
  ).min(1, "At least one part is required to complete."),
});

export type RequestUploadUrlInput = z.infer<typeof requestUploadUrlSchema>;
export type RegisterMediaInput = z.infer<typeof registerMediaSchema>;
export type UpdateMediaStatusInput = z.infer<typeof updateMediaStatusSchema>;
export type InitiateMultipartInput = z.infer<typeof initiateMultipartSchema>;
export type PresignPartInput = z.infer<typeof presignPartSchema>;
export type CompleteMultipartInput = z.infer<typeof completeMultipartSchema>;
