import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand, AbortMultipartUploadCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "../../config";
import { logger } from "../../lib/logger";

export interface StorageProvider {
  /**
   * Generates a presigned URL for direct single-file uploads to storage.
   */
  generatePresignedUploadUrl(key: string, mimeType: string, expiresInSeconds: number): Promise<string>;

  /**
   * Generates a presigned URL for secure asset retrieval.
   */
  generatePresignedDownloadUrl(key: string, expiresInSeconds: number): Promise<string>;

  /**
   * Deletes an object from the storage bucket.
   */
  deleteObject(key: string): Promise<void>;

  /**
   * Initiates a multipart upload session for large files.
   * Returns a unique UploadId.
   */
  initiateMultipartUpload(key: string, mimeType: string): Promise<string>;

  /**
   * Generates a presigned URL to upload a specific part of a multipart upload.
   */
  generatePresignedPartUrl(key: string, uploadId: string, partNumber: number, expiresInSeconds: number): Promise<string>;

  /**
   * Completes a multipart upload session by assembling all uploaded parts.
   */
  completeMultipartUpload(key: string, uploadId: string, parts: Array<{ PartNumber: number; ETag: string }>): Promise<void>;

  /**
   * Aborts an active multipart upload session and cleans up uploaded parts.
   */
  abortMultipartUpload(key: string, uploadId: string): Promise<void>;
}

export class CloudflareR2Provider implements StorageProvider {
  private readonly client: S3Client;
  private readonly bucketName: string;

  constructor() {
    const r2Config = config.storage.r2;
    this.bucketName = r2Config.bucketName;

    this.client = new S3Client({
      region: "auto",
      endpoint: `https://${r2Config.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: r2Config.accessKeyId,
        secretAccessKey: r2Config.secretAccessKey,
      },
    });
  }

  public async generatePresignedUploadUrl(key: string, mimeType: string, expiresInSeconds: number): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: mimeType,
    });

    try {
      return await getSignedUrl(this.client, command, { expiresIn: expiresInSeconds });
    } catch (err: any) {
      logger.error(`[R2] Failed to generate presigned upload URL: ${err.message}`);
      throw err;
    }
  }

  public async generatePresignedDownloadUrl(key: string, expiresInSeconds: number): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    try {
      return await getSignedUrl(this.client, command, { expiresIn: expiresInSeconds });
    } catch (err: any) {
      logger.error(`[R2] Failed to generate presigned download URL: ${err.message}`);
      throw err;
    }
  }

  public async deleteObject(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    try {
      await this.client.send(command);
    } catch (err: any) {
      logger.error(`[R2] Failed to delete object with key ${key}: ${err.message}`);
      throw err;
    }
  }

  public async initiateMultipartUpload(key: string, mimeType: string): Promise<string> {
    const command = new CreateMultipartUploadCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: mimeType,
    });

    try {
      const response = await this.client.send(command);
      if (!response.UploadId) {
        throw new Error("No UploadId returned from Cloudflare R2.");
      }
      return response.UploadId;
    } catch (err: any) {
      logger.error(`[R2] Failed to initiate multipart upload: ${err.message}`);
      throw err;
    }
  }

  public async generatePresignedPartUrl(key: string, uploadId: string, partNumber: number, expiresInSeconds: number): Promise<string> {
    const command = new UploadPartCommand({
      Bucket: this.bucketName,
      Key: key,
      UploadId: uploadId,
      PartNumber: partNumber,
    });

    try {
      return await getSignedUrl(this.client, command, { expiresIn: expiresInSeconds });
    } catch (err: any) {
      logger.error(`[R2] Failed to generate presigned part URL: ${err.message}`);
      throw err;
    }
  }

  public async completeMultipartUpload(key: string, uploadId: string, parts: Array<{ PartNumber: number; ETag: string }>): Promise<void> {
    const command = new CompleteMultipartUploadCommand({
      Bucket: this.bucketName,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: parts,
      },
    });

    try {
      await this.client.send(command);
    } catch (err: any) {
      logger.error(`[R2] Failed to complete multipart upload: ${err.message}`);
      throw err;
    }
  }

  public async abortMultipartUpload(key: string, uploadId: string): Promise<void> {
    const command = new AbortMultipartUploadCommand({
      Bucket: this.bucketName,
      Key: key,
      UploadId: uploadId,
    });

    try {
      await this.client.send(command);
    } catch (err: any) {
      logger.error(`[R2] Failed to abort multipart upload: ${err.message}`);
      throw err;
    }
  }
}

export const mediaStorage = new CloudflareR2Provider();
export default mediaStorage;
