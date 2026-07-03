import { MediaType, MediaProvider, MediaStatus } from "@prisma/client";

export interface MediaResponseDTO {
  id: string;
  type: MediaType;
  provider: MediaProvider;
  bucket: string | null;
  key: string;
  mimeType: string;
  size: string; // Serialized BigInt
  hash: string | null;
  status: MediaStatus;
  metadata: any | null;
  createdAt: string;
  updatedAt: string;
  userId: string | null;
}

export interface PresignedUploadResponse {
  mediaId: string;
  uploadUrl: string;
  key: string;
  bucket: string;
}

export interface MultipartUploadInitResponse {
  mediaId: string;
  uploadId: string;
  key: string;
  bucket: string;
}

export interface PresignedPartResponse {
  partNumber: number;
  uploadUrl: string;
}
