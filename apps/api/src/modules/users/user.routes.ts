import { Router } from "express";
import { userController } from "./user.controller";
import { requireAuth, Guard } from "../auth/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

// Apply requireAuth globally for user routes since all profile actions require identity
router.use(requireAuth);

/**
 * @openapi
 * /users/me:
 *   get:
 *     summary: Retrieve current authenticated user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully.
 *       401:
 *         description: Authentication token missing or expired.
 *       404:
 *         description: User profile not found.
 */
router.get("/me", asyncHandler(userController.getCurrentProfile));

/**
 * @openapi
 * /users/me:
 *   patch:
 *     summary: Update profile details for the authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 maxLength: 100
 *               lastName:
 *                 type: string
 *                 maxLength: 100
 *               displayName:
 *                 type: string
 *                 maxLength: 100
 *               bio:
 *                 type: string
 *                 maxLength: 1000
 *               timezone:
 *                 type: string
 *                 maxLength: 100
 *               language:
 *                 type: string
 *                 enum: [en, es, fr, de, hi]
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *       400:
 *         description: Input validation schemas failed.
 *       401:
 *         description: Authentication token missing or expired.
 */
router.patch("/me", asyncHandler(userController.updateProfile));

/**
 * @openapi
 * /users/me/avatar:
 *   patch:
 *     summary: Update avatar image link for the authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [avatarUrl]
 *             properties:
 *               avatarUrl:
 *                 type: string
 *                 format: uri
 *                 maxLength: 512
 *     responses:
 *       200:
 *         description: Avatar updated successfully.
 *       400:
 *         description: Invalid avatar URL link format.
 *       401:
 *         description: Authentication token missing or expired.
 */
router.patch("/me/avatar", asyncHandler(userController.updateAvatar));

/**
 * @openapi
 * /users/me/preferences:
 *   patch:
 *     summary: Update theme, privacy, or notification preferences
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theme:
 *                 type: string
 *                 enum: [LIGHT, DARK, SYSTEM]
 *               emailPreference:
 *                 type: boolean
 *               notificationPreference:
 *                 type: boolean
 *               marketingPreference:
 *                 type: boolean
 *               privacyPreference:
 *                 type: string
 *                 enum: [public, private]
 *     responses:
 *       200:
 *         description: Settings preferences updated successfully.
 *       400:
 *         description: Schema validation constraints failed.
 *       401:
 *         description: Authentication token missing or expired.
 */
router.patch("/me/preferences", asyncHandler(userController.updatePreferences));

/**
 * @openapi
 * /users/me/password:
 *   post:
 *     summary: Change user password and terminate other active sessions
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [currentPassword, newPassword]
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password altered. Other active devices logged out.
 *       401:
 *         description: Current password mismatch or token expired.
 *       400:
 *         description: New password constraints failed.
 */
router.post("/me/password", asyncHandler(userController.changePassword));

/**
 * @openapi
 * /users/me/sessions:
 *   get:
 *     summary: List active devices and login session timestamps
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active sessions retrieved successfully.
 *       401:
 *         description: Authentication token missing or expired.
 */
router.get("/me/sessions", asyncHandler(userController.listSessions));

/**
 * @openapi
 * /users/me/sessions:
 *   delete:
 *     summary: Terminate all other sessions except the current active one
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Terminated other devices.
 *       401:
 *         description: Authentication token missing or expired.
 */
router.delete("/me/sessions", asyncHandler(userController.logoutOtherSessions));

/**
 * @openapi
 * /users/me/sessions/{sessionId}:
 *   delete:
 *     summary: Terminate a specific session device by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: sessionId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session terminated successfully.
 *       404:
 *         description: Session not found.
 */
router.delete("/me/sessions/:sessionId", asyncHandler(userController.logoutSession));

/**
 * @openapi
 * /users/me/deactivate:
 *   post:
 *     summary: Self-deactivate authenticated user account
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile deactivated. All active devices logged out.
 *       403:
 *         description: Operation forbidden (e.g. attempting to deactivate Super Admin).
 */
router.post("/me/deactivate", asyncHandler(userController.deactivateAccount));

/**
 * @openapi
 * /users/me/audit-logs:
 *   get:
 *     summary: Fetch user-specific audit history logs
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: action
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Audit logs returned.
 *       401:
 *         description: Authentication token missing or expired.
 */
router.get("/me/audit-logs", asyncHandler(userController.listAuditLogs));

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Retrieve profile details of a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile retrieved.
 *       403:
 *         description: Horizontal privilege escalation check failed.
 *       404:
 *         description: Profile not found.
 */
router.get("/:id", asyncHandler(userController.getUserById));

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Soft delete target user account
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account soft-deleted successfully.
 *       403:
 *         description: Deletion of Super Admin is prohibited or permissions are missing.
 *       404:
 *         description: Target profile not found.
 */
router.delete("/:id", asyncHandler(userController.softDeleteAccount));

/**
 * @openapi
 * /users/{id}/reactivate:
 *   post:
 *     summary: Reactivate a deactivated user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profile reactivated successfully.
 *       403:
 *         description: Admin/Super Admin permission required.
 *       404:
 *         description: Target profile not found.
 */
router.post("/:id/reactivate", Guard.Permission("user:update"), asyncHandler(userController.reactivateAccount));

export const userRoutes = router;
export default userRoutes;
