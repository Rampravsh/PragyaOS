import { MediaType } from "@prisma/client";

export const MEDIA_URL_EXPIRATION = {
  UPLOAD_SECONDS: 900,      // 15 minutes
  DOWNLOAD_SECONDS: 3600,   // 1 hour
};

export const MIME_TYPE_MAP: Record<string, MediaType> = {
  // Images
  "image/jpeg": MediaType.IMAGE,
  "image/png": MediaType.IMAGE,
  "image/gif": MediaType.IMAGE,
  "image/webp": MediaType.IMAGE,
  "image/svg+xml": MediaType.IMAGE,

  // Videos
  "video/mp4": MediaType.VIDEO,
  "video/mpeg": MediaType.VIDEO,
  "video/ogg": MediaType.VIDEO,
  "video/webm": MediaType.VIDEO,
  "video/quicktime": MediaType.VIDEO, // .mov

  // Audio
  "audio/mpeg": MediaType.AUDIO,
  "audio/ogg": MediaType.AUDIO,
  "audio/wav": MediaType.AUDIO,
  "audio/webm": MediaType.AUDIO,

  // Documents
  "application/pdf": MediaType.DOCUMENT,
  "application/msword": MediaType.DOCUMENT,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": MediaType.DOCUMENT,
  "application/vnd.ms-powerpoint": MediaType.DOCUMENT,
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": MediaType.DOCUMENT,
  "application/vnd.ms-excel": MediaType.DOCUMENT,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": MediaType.DOCUMENT,
  "text/plain": MediaType.DOCUMENT,
  "text/csv": MediaType.DOCUMENT,

  // Archives
  "application/zip": MediaType.ARCHIVE,
  "application/x-tar": MediaType.ARCHIVE,
  "application/x-rar-compressed": MediaType.ARCHIVE,
  "application/x-7z-compressed": MediaType.ARCHIVE,
};

/**
 * Resolves a MIME type string to a schema-supported MediaType enum.
 */
export function resolveMediaType(mimeType: string): MediaType {
  const normalized = mimeType.toLowerCase().trim();
  if (normalized in MIME_TYPE_MAP) {
    return MIME_TYPE_MAP[normalized];
  }
  if (normalized.startsWith("image/")) return MediaType.IMAGE;
  if (normalized.startsWith("video/")) return MediaType.VIDEO;
  if (normalized.startsWith("audio/")) return MediaType.AUDIO;
  if (normalized.startsWith("text/")) return MediaType.DOCUMENT;

  return MediaType.OTHER;
}
