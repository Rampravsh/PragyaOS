import { Router } from "express";
import { notificationController } from "./notifications.controller";
import { Guard } from "../auth/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

/**
 * @openapi
 * /notifications:
 *   get:
 *     summary: Retrieve the authenticated user's notifications (paginated)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 100, default: 20 }
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, QUEUED, SENT, DELIVERED, READ, FAILED]
 *     responses:
 *       200:
 *         description: Notification list fetched successfully.
 *       401:
 *         description: Authentication required.
 */
router.get("/", Guard.Auth(), asyncHandler(notificationController.getNotifications));

/**
 * @openapi
 * /notifications/unread-count:
 *   get:
 *     summary: Get count of unread notifications for the authenticated user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Unread count returned successfully.
 *       401:
 *         description: Authentication required.
 */
router.get("/unread-count", Guard.Auth(), asyncHandler(notificationController.getUnreadCount));

/**
 * @openapi
 * /notifications/preferences:
 *   get:
 *     summary: Get notification preferences for the authenticated user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User preferences fetched successfully.
 *       401:
 *         description: Authentication required.
 */
router.get("/preferences", Guard.Auth(), asyncHandler(notificationController.getPreferences));

/**
 * @openapi
 * /notifications/preferences:
 *   patch:
 *     summary: Update notification preferences for the authenticated user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               channelPreferences:
 *                 type: object
 *                 additionalProperties: { type: boolean }
 *                 example: { "EMAIL": false, "PUSH": true }
 *               categoryPreferences:
 *                 type: object
 *                 additionalProperties: { type: boolean }
 *                 example: { "MARKETING": false }
 *               marketingOptIn:
 *                 type: boolean
 *               digestEnabled:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Preferences updated successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Authentication required.
 */
router.patch("/preferences", Guard.Auth(), asyncHandler(notificationController.updatePreferences));

/**
 * @openapi
 * /notifications/read-all:
 *   patch:
 *     summary: Mark all notifications as read for the authenticated user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read.
 *       401:
 *         description: Authentication required.
 */
router.patch("/read-all", Guard.Auth(), asyncHandler(notificationController.markAllAsRead));

/**
 * @openapi
 * /notifications/{id}/read:
 *   patch:
 *     summary: Mark a single notification as read
 *     tags: [Notifications]
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
 *         description: Notification marked as read.
 *       403:
 *         description: Notification belongs to a different user.
 *       404:
 *         description: Notification not found.
 *       401:
 *         description: Authentication required.
 */
router.patch("/:id/read", Guard.Auth(), asyncHandler(notificationController.markAsRead));

export { router as notificationRoutes };
