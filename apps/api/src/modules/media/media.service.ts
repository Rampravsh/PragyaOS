import { Media, MediaStatus, MediaType, MediaProvider } from "@prisma/client";
import { config } from "../../config";
import { AppError } from "../../common/errors/appError";
import { logger } from "../../lib/logger";
import { mediaRepository, MediaRepository } from "./media.repository";
import { mediaStorage, StorageProvider } from "./media.storage";
import { mediaQueue } from "./media.queue";
import { resolveMediaType, MEDIA_URL_EXPIRATION } from "./media.constants";
import { PresignedUploadResponse, MultipartUploadInitResponse, PresignedPartResponse } from "./media.types";
import { userRepository } from "../users/user.repository";

export class MediaService {
  constructor(
    private readonly repo: MediaRepository = mediaRepository,
    private readonly storage: StorageProvider = mediaStorage
  ) {}

  /**
   * Request a presigned URL to upload a single file directly to Cloudflare R2.
   */
  public async requestUploadUrl(
    userId: string,
    filename: string,
    mimeType: string,
    size: number,
    hash?: string
  ): Promise<PresignedUploadResponse> {
    const type = resolveMediaType(mimeType);

    // Validate configurable file size limits based on media type
    this.validateFileSize(type, size);

    // Check for duplicate uploads using file checksum (hash)
    if (hash) {
      const duplicate = await this.repo.findByHash(hash);
      if (duplicate && duplicate.status === MediaStatus.READY) {
        logger.info(`♻️ [Media Service] Duplicate detected for hash ${hash}. Reusing mediaId ${duplicate.id}`);
        // Return existing media pointers, avoiding unnecessary upload
        const downloadUrl = await this.storage.generatePresignedDownloadUrl(duplicate.key, MEDIA_URL_EXPIRATION.DOWNLOAD_SECONDS);
        return {
          mediaId: duplicate.id,
          uploadUrl: downloadUrl, // Return download URL as a shortcut
          key: duplicate.key,
          bucket: duplicate.bucket || config.storage.r2.bucketName,
        };
      }
    }

    const uniqueId = crypto.randomUUID();
    const extension = filename.split(".").pop() || "";
    const key = `uploads/${userId}/${uniqueId}${extension ? `.${extension}` : ""}`;
    const bucket = config.storage.r2.bucketName;

    // Generate R2 S3-presigned upload URL
    const uploadUrl = await this.storage.generatePresignedUploadUrl(
      key,
      mimeType,
      MEDIA_URL_EXPIRATION.UPLOAD_SECONDS
    );

    // Create database entry in UPLOADING state
    const media = await this.repo.create({
      id: uniqueId,
      type,
      provider: MediaProvider.CLOUDFLARE_R2,
      bucket,
      key,
      mimeType,
      size: BigInt(size),
      hash: hash || null,
      status: MediaStatus.UPLOADING,
      userId,
      metadata: { originalFilename: filename },
    });

    return {
      mediaId: media.id,
      uploadUrl,
      key,
      bucket,
    };
  }

  /**
   * Confirms direct-to-cloud upload completed and dispatches background processing jobs.
   */
  public async confirmUploadComplete(userId: string, mediaId: string): Promise<Media> {
    const media = await this.validateOwnership(mediaId, userId);

    if (media.status !== MediaStatus.UPLOADING) {
      throw AppError.badRequest(`Media is in ${media.status} state, not UPLOADING.`);
    }

    // Transition state to UPLOADED
    const updatedMedia = await this.repo.updateStatus(mediaId, MediaStatus.UPLOADED);
    logger.info(`📥 [Media Service] Media upload confirmed. Enqueuing job for mediaId: ${mediaId}`);

    // Dispatch background processor job to the BullMQ media-queue
    await mediaQueue.add(
      "process-media",
      { mediaId, action: "PROCESS" },
      { jobId: `proc-${mediaId}` }
    );

    return updatedMedia;
  }

  /**
   * Initiates a multipart upload session for large files.
   */
  public async initiateMultipartUpload(
    userId: string,
    filename: string,
    mimeType: string,
    size: number,
    hash?: string
  ): Promise<MultipartUploadInitResponse> {
    const type = resolveMediaType(mimeType);
    this.validateFileSize(type, size);

    const uniqueId = crypto.randomUUID();
    const extension = filename.split(".").pop() || "";
    const key = `uploads/${userId}/${uniqueId}${extension ? `.${extension}` : ""}`;
    const bucket = config.storage.r2.bucketName;

    // Initiate multipart upload in S3-compatible R2 storage
    const uploadId = await this.storage.initiateMultipartUpload(key, mimeType);

    // Persist media record in database
    await this.repo.create({
      id: uniqueId,
      type,
      provider: MediaProvider.CLOUDFLARE_R2,
      bucket,
      key,
      mimeType,
      size: BigInt(size),
      hash: hash || null,
      status: MediaStatus.UPLOADING,
      userId,
      metadata: { originalFilename: filename, uploadId },
    });

    return {
      mediaId: uniqueId,
      uploadId,
      key,
      bucket,
    };
  }

  /**
   * Generates a presigned URL to upload a specific part of a multipart session.
   */
  public async generatePresignedPartUrl(
    userId: string,
    mediaId: string,
    key: string,
    uploadId: string,
    partNumber: number
  ): Promise<PresignedPartResponse> {
    await this.validateOwnership(mediaId, userId);

    const uploadUrl = await this.storage.generatePresignedPartUrl(
      key,
      uploadId,
      partNumber,
      MEDIA_URL_EXPIRATION.UPLOAD_SECONDS
    );

    return {
      partNumber,
      uploadUrl,
    };
  }

  /**
   * Completes a multipart upload session by assembling parts and triggers processing.
   */
  public async completeMultipartUpload(
    userId: string,
    mediaId: string,
    key: string,
    uploadId: string,
    parts: Array<{ PartNumber: number; ETag: string }>
  ): Promise<Media> {
    const media = await this.validateOwnership(mediaId, userId);

    if (media.status !== MediaStatus.UPLOADING) {
      throw AppError.badRequest(`Media is not in UPLOADING state.`);
    }

    // Assemble parts in Cloudflare R2
    await this.storage.completeMultipartUpload(key, uploadId, parts);

    // Transition state to UPLOADED
    const updatedMedia = await this.repo.update(mediaId, {
      status: MediaStatus.UPLOADED,
      metadata: {
        ...(media.metadata as Record<string, any>),
        partsCount: parts.length,
      },
    });

    logger.info(`📥 [Media Service] Multipart upload completed. Enqueuing job for mediaId: ${mediaId}`);

    // Queue processing
    await mediaQueue.add(
      "process-media",
      { mediaId, action: "PROCESS" },
      { jobId: `proc-${mediaId}` }
    );

    return updatedMedia;
  }

  /**
   * Generates a presigned download URL for private files.
   */
  public async generateDownloadPresignedUrl(userId: string, mediaId: string): Promise<string> {
    const media = await this.repo.findById(mediaId);
    if (!media) {
      throw AppError.notFound("Media file not found.");
    }

    if (media.status === MediaStatus.DELETED) {
      throw AppError.badRequest("Cannot download deleted media.");
    }

    // Validate ownership/access context. Admins/Instructors bypass checks
    const hasAccess = media.userId === userId || media.userId === null;
    if (!hasAccess) {
      // Check if user is Admin or Instructor
      const userRoles = await userRepository.findRolesByUserId(userId);
      const roleNames = userRoles.map((ur) => ur.role.name);
      const isPrivileged = roleNames.includes("ADMIN") || roleNames.includes("INSTRUCTOR") || roleNames.includes("SUPER_ADMIN");

      if (!isPrivileged) {
        throw AppError.forbidden("You do not have permission to access this media file.");
      }
    }

    return this.storage.generatePresignedDownloadUrl(media.key, MEDIA_URL_EXPIRATION.DOWNLOAD_SECONDS);
  }

  /**
   * Aborts a multipart upload and cleans up DB records.
   */
  public async abortMultipartUpload(userId: string, mediaId: string, key: string, uploadId: string): Promise<void> {
    await this.validateOwnership(mediaId, userId);
    await this.storage.abortMultipartUpload(key, uploadId);
    await this.repo.delete(mediaId);
  }

  /**
   * Deletes a media file from Cloudflare R2 and transitions DB state to DELETED.
   */
  public async deleteMedia(userId: string, mediaId: string): Promise<void> {
    const media = await this.validateOwnership(mediaId, userId);

    if (media.status === MediaStatus.DELETED) {
      return; // Already deleted
    }

    // Verify if media is currently referenced by other entities (courses, lessons, etc.)
    await this.checkReferentialIntegrity(mediaId);

    // Delete object from Cloudflare R2 bucket
    try {
      await this.storage.deleteObject(media.key);
    } catch (err: any) {
      logger.warn(`[Media Service] Object delete warning on R2 for key ${media.key}: ${err.message}`);
    }

    // Mark media status as DELETED in the database
    await this.repo.updateStatus(mediaId, MediaStatus.DELETED);
    logger.info(`🗑️ [Media Service] Media ${mediaId} deleted successfully.`);
  }

  /**
   * Helper to validate user ownership or admin privileges.
   */
  public async validateOwnership(mediaId: string, userId: string): Promise<Media> {
    const media = await this.repo.findById(mediaId);
    if (!media) {
      throw AppError.notFound("Media file not found.");
    }

    if (media.userId && media.userId !== userId) {
      // Admin bypass check
      const userRoles = await userRepository.findRolesByUserId(userId);
      const roleNames = userRoles.map((ur) => ur.role.name);
      const isAdmin = roleNames.includes("ADMIN") || roleNames.includes("SUPER_ADMIN");

      if (!isAdmin) {
        throw AppError.forbidden("You do not own or have permission to manage this media file.");
      }
    }

    return media;
  }

  /**
   * Validates file size against configurable limits.
   */
  private validateFileSize(type: MediaType, size: number): void {
    const limits = config.storage.limits;
    if (type === MediaType.IMAGE) {
      if (size > limits.maxImageSizeBytes) {
        throw AppError.badRequest(
          `Image size exceeds maximum limit of ${(limits.maxImageSizeBytes / (1024 * 1024)).toFixed(1)}MB.`
        );
      }
    } else {
      if (size > limits.maxFileSizeBytes) {
        throw AppError.badRequest(
          `File size exceeds maximum limit of ${(limits.maxFileSizeBytes / (1024 * 1024)).toFixed(1)}MB.`
        );
      }
    }
  }

  /**
   * Verifies if any database relations reference this media file before allowing deletion.
   */
  private async checkReferentialIntegrity(mediaId: string): Promise<void> {
    const usage = await this.repo.countUsage(mediaId);

    if (usage.courseThumbnails > 0 || usage.courseTrailers > 0 || usage.learningUnits > 0 || usage.learningResources > 0) {
      throw AppError.badRequest("Cannot delete media file that is currently associated with a course or learning unit.");
    }
  }
}

export const mediaService = new MediaService();
export default mediaService;
