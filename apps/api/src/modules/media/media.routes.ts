import { Router } from "express";
import { mediaController } from "./media.controller";
import { requireAuth } from "../auth/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

// Apply auth globally for all media endpoints
router.use(requireAuth);

/**
 * @openapi
 * /media/uploads/url:
 *   post:
 *     summary: Request a presigned S3 upload URL for direct-to-cloud upload
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - filename
 *               - mimeType
 *               - size
 *             properties:
 *               filename:
 *                 type: string
 *               mimeType:
 *                 type: string
 *               size:
 *                 type: integer
 *               hash:
 *                 type: string
 *                 description: SHA-256 integrity hash of the file for deduplication
 *     responses:
 *       200:
 *         description: Presigned upload URL returned.
 *       400:
 *         description: Validation or file size limit error.
 */
router.post("/uploads/url", asyncHandler(mediaController.requestUploadUrl));

/**
 * @openapi
 * /media/{id}/confirm:
 *   post:
 *     summary: Confirm single file upload completeness and queue background processors
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Media upload confirmed, processing enqueued.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Media not found.
 */
router.post("/:id/confirm", asyncHandler(mediaController.confirmUploadComplete));

/**
 * @openapi
 * /media/multipart/initiate:
 *   post:
 *     summary: Initiate a multipart upload session for large files
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - filename
 *               - mimeType
 *               - size
 *             properties:
 *               filename:
 *                 type: string
 *               mimeType:
 *                 type: string
 *               size:
 *                 type: integer
 *               hash:
 *                 type: string
 *     responses:
 *       200:
 *         description: Multipart session initiated, uploadId returned.
 */
router.post("/multipart/initiate", asyncHandler(mediaController.initiateMultipartUpload));

/**
 * @openapi
 * /media/{id}/multipart/part:
 *   post:
 *     summary: Generate a presigned URL to upload a specific part of a multipart session
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - key
 *               - uploadId
 *               - partNumber
 *             properties:
 *               key:
 *                 type: string
 *               uploadId:
 *                 type: string
 *               partNumber:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Presigned part URL generated.
 */
router.post("/:id/multipart/part", asyncHandler(mediaController.presignPartUrl));

/**
 * @openapi
 * /media/{id}/multipart/complete:
 *   post:
 *     summary: Complete a multipart upload session by assembling parts
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - key
 *               - uploadId
 *               - parts
 *             properties:
 *               key:
 *                 type: string
 *               uploadId:
 *                 type: string
 *               parts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - PartNumber
 *                     - ETag
 *                   properties:
 *                     PartNumber:
 *                       type: integer
 *                     ETag:
 *                       type: string
 *     responses:
 *       200:
 *         description: Multipart upload completed.
 */
router.post("/:id/multipart/complete", asyncHandler(mediaController.completeMultipartUpload));

/**
 * @openapi
 * /media/{id}/download:
 *   get:
 *     summary: Get a presigned download URL for private files
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Presigned download URL returned.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Media not found.
 */
router.get("/:id/download", asyncHandler(mediaController.generateDownloadUrl));

/**
 * @openapi
 * /media/{id}:
 *   delete:
 *     summary: Delete a media file from Cloudflare R2 and database (status set to DELETED)
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Media successfully deleted.
 *       400:
 *         description: Cannot delete media that is in active use.
 *       403:
 *         description: Forbidden.
 */
router.delete("/:id", asyncHandler(mediaController.deleteMedia));

export const mediaRoutes = router;
export default mediaRoutes;
