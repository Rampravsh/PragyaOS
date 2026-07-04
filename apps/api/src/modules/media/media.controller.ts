import { Request, Response } from "express";
import { MediaService, mediaService } from "./media.service";
import { MediaMapper } from "./media.mapper";
import {
  requestUploadUrlSchema,
  initiateMultipartSchema,
  presignPartSchema,
  completeMultipartSchema,
  RequestUploadUrlInput,
  InitiateMultipartInput,
  PresignPartInput,
  CompleteMultipartInput
} from "./media.schemas";
import { validate } from "../../common/dto/base.dto";
import { SuccessResponse } from "../../common/responses/successResponse";

export class MediaController {
  constructor(private readonly service: MediaService = mediaService) {}

  /**
   * Generates a signed upload URL for single-file direct upload.
   */
  public requestUploadUrl = async (req: Request, res: Response): Promise<void> => {
    const input = validate(requestUploadUrlSchema as any, req.body) as RequestUploadUrlInput;
    const userId = req.user!.id;

    const data = await this.service.requestUploadUrl(
      userId,
      input.filename,
      input.mimeType,
      input.size,
      input.hash
    );

    SuccessResponse.send(res, data);
  };

  /**
   * Confirms single file upload is complete and triggers background processing.
   */
  public confirmUploadComplete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // mediaId
    const userId = req.user!.id;

    const media = await this.service.confirmUploadComplete(userId, id);
    SuccessResponse.send(
      res,
      MediaMapper.toResponseDTO(media),
      "Media upload confirmed. Background processing enqueued."
    );
  };

  /**
   * Initiates a multipart upload session.
   */
  public initiateMultipartUpload = async (req: Request, res: Response): Promise<void> => {
    const input = validate(initiateMultipartSchema as any, req.body) as InitiateMultipartInput;
    const userId = req.user!.id;

    const data = await this.service.initiateMultipartUpload(
      userId,
      input.filename,
      input.mimeType,
      input.size,
      input.hash
    );

    SuccessResponse.send(res, data);
  };

  /**
   * Generates a presigned URL for a single part of a multipart upload.
   */
  public presignPartUrl = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // mediaId
    const input = validate(presignPartSchema as any, req.body) as PresignPartInput;
    const userId = req.user!.id;

    const data = await this.service.generatePresignedPartUrl(
      userId,
      id,
      input.key,
      input.uploadId,
      input.partNumber
    );

    SuccessResponse.send(res, data);
  };

  /**
   * Completes a multipart upload and starts background processing.
   */
  public completeMultipartUpload = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // mediaId
    const input = validate(completeMultipartSchema as any, req.body) as CompleteMultipartInput;
    const userId = req.user!.id;

    const media = await this.service.completeMultipartUpload(
      userId,
      id,
      input.key,
      input.uploadId,
      input.parts
    );

    SuccessResponse.send(
      res,
      MediaMapper.toResponseDTO(media),
      "Multipart upload completed. Background processing enqueued."
    );
  };

  /**
   * Generates a presigned download URL for a file.
   */
  public generateDownloadUrl = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // mediaId
    const userId = req.user!.id;

    const downloadUrl = await this.service.generateDownloadPresignedUrl(userId, id);
    SuccessResponse.send(res, { downloadUrl });
  };

  /**
   * Deletes a media file from storage and marks it as DELETED in database.
   */
  public deleteMedia = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // mediaId
    const userId = req.user!.id;

    await this.service.deleteMedia(userId, id);
    SuccessResponse.send(res, null, "Media deleted successfully.");
  };
}

export const mediaController = new MediaController();
export default mediaController;
