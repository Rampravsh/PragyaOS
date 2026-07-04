import { Router } from "express";
import { credentialController } from "./credentials.controller";
import { Guard } from "../auth/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";
import { CREDENTIAL_PERMISSIONS } from "./credentials.constants";

const router = Router();

// ──────────────────────────────────────────────────────────────────
// Template Management (Admin only)
// ──────────────────────────────────────────────────────────────────

/**
 * @openapi
 * /credentials/templates:
 *   post:
 *     summary: Register a new certificate template
 *     tags: [Credentials]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, slug, templateVersion, htmlTemplate, cssTemplate]
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               templateVersion:
 *                 type: string
 *                 example: "v1"
 *               htmlTemplate:
 *                 type: string
 *                 description: Full HTML markup for the certificate layout
 *               cssTemplate:
 *                 type: string
 *                 description: Scoped CSS styles for the certificate layout
 *               branding:
 *                 type: object
 *                 additionalProperties: true
 *     responses:
 *       201:
 *         description: Template registered successfully.
 *       400:
 *         description: Validation error or slug conflict.
 *       401:
 *         description: Authentication required.
 *       403:
 *         description: Insufficient permissions.
 */
router.post(
  "/templates",
  Guard.Permission(CREDENTIAL_PERMISSIONS.TEMPLATE_CREATE),
  asyncHandler(credentialController.createTemplate)
);

/**
 * @openapi
 * /credentials/templates/{id}:
 *   patch:
 *     summary: Update a certificate template (layout changes blocked once credentials issued)
 *     tags: [Credentials]
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
 *             properties:
 *               name:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Template updated successfully.
 *       400:
 *         description: Layout modification blocked (template has issued credentials).
 *       401:
 *         description: Authentication required.
 *       403:
 *         description: Insufficient permissions.
 *       404:
 *         description: Template not found.
 */
router.patch(
  "/templates/:id",
  Guard.Permission(CREDENTIAL_PERMISSIONS.TEMPLATE_UPDATE),
  asyncHandler(credentialController.updateTemplate)
);

// ──────────────────────────────────────────────────────────────────
// Credential Issuance (Admin / System)
// ──────────────────────────────────────────────────────────────────

/**
 * @openapi
 * /credentials/issue:
 *   post:
 *     summary: Issue a credential certificate to a student
 *     tags: [Credentials]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, courseId, templateId, metadata]
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *               courseId:
 *                 type: string
 *                 format: uuid
 *               templateId:
 *                 type: string
 *                 format: uuid
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *               metadata:
 *                 type: object
 *                 required: [studentName, courseTitle, instructorName, completionDate]
 *                 properties:
 *                   studentName:
 *                     type: string
 *                   courseTitle:
 *                     type: string
 *                   instructorName:
 *                     type: string
 *                   completionDate:
 *                     type: string
 *                   customData:
 *                     type: object
 *                     additionalProperties: true
 *     responses:
 *       201:
 *         description: Credential issued successfully.
 *       400:
 *         description: Validation error or inactive template.
 *       401:
 *         description: Authentication required.
 *       403:
 *         description: Insufficient permissions.
 *       404:
 *         description: Template not found.
 *       409:
 *         description: Duplicate active credential exists for this user and course.
 */
router.post(
  "/issue",
  Guard.Permission(CREDENTIAL_PERMISSIONS.ISSUE),
  asyncHandler(credentialController.issueCredential)
);

// ──────────────────────────────────────────────────────────────────
// Certificate Verification (Public)
// ──────────────────────────────────────────────────────────────────

/**
 * @openapi
 * /credentials/verify:
 *   post:
 *     summary: Verify a credential using its verification token (public endpoint)
 *     tags: [Credentials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [verificationToken, source]
 *             properties:
 *               verificationToken:
 *                 type: string
 *                 description: Raw verification token from the certificate URL
 *               source:
 *                 type: string
 *                 enum: [PUBLIC_PAGE, API, ADMIN]
 *     responses:
 *       200:
 *         description: Credential verified successfully.
 *       400:
 *         description: Credential is revoked or expired.
 *       404:
 *         description: Verification token not found.
 */
router.post(
  "/verify",
  asyncHandler(credentialController.verifyCredential)
);

// ──────────────────────────────────────────────────────────────────
// Credential Revocation (Admin only)
// ──────────────────────────────────────────────────────────────────

/**
 * @openapi
 * /credentials/revoke:
 *   post:
 *     summary: Revoke an issued credential
 *     tags: [Credentials]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [credentialId, reason]
 *             properties:
 *               credentialId:
 *                 type: string
 *                 format: uuid
 *               reason:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 1000
 *               metadata:
 *                 type: object
 *                 additionalProperties: true
 *     responses:
 *       200:
 *         description: Credential revoked successfully.
 *       400:
 *         description: Credential is already revoked.
 *       401:
 *         description: Authentication required.
 *       403:
 *         description: Insufficient permissions.
 *       404:
 *         description: Credential not found.
 */
router.post(
  "/revoke",
  Guard.Permission(CREDENTIAL_PERMISSIONS.REVOKE),
  asyncHandler(credentialController.revokeCredential)
);

// ──────────────────────────────────────────────────────────────────
// User's Own Credentials (Authenticated)
// ──────────────────────────────────────────────────────────────────

/**
 * @openapi
 * /credentials/my:
 *   get:
 *     summary: Retrieve all credentials issued to the authenticated user
 *     tags: [Credentials]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User credential list fetched successfully.
 *       401:
 *         description: Authentication required.
 */
router.get(
  "/my",
  Guard.Auth(),
  asyncHandler(credentialController.getMyCredentials)
);

export { router as credentialRoutes };
