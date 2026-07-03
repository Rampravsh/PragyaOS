import { Router } from "express";
import { authController } from "./auth.controller";
import { requireAuth } from "./auth.middleware";
import { rateLimiter } from "../../middlewares/rateLimiter";
import { asyncHandler } from "../../utils/asyncHandler";

const authRouter = Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new student account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, firstName, lastName]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registered successfully
 *       400:
 *         description: Validation schema failed
 *       409:
 *         description: Email conflict
 */
authRouter.post("/register", asyncHandler(authController.register));

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Sign in with credentials
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized credentials
 *       403:
 *         description: Account temporarily locked
 */
authRouter.post("/login", rateLimiter, asyncHandler(authController.login));

/**
 * @openapi
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Rotate refresh session tokens
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tokens rotated successfully
 *       401:
 *         description: Invalid session token
 */
authRouter.post("/refresh", asyncHandler(authController.refresh));

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     summary: Terminate current session
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Current session logged out
 */
authRouter.post("/logout", asyncHandler(authController.logout));

/**
 * @openapi
 * /api/v1/auth/logout-all:
 *   post:
 *     summary: Invalidate all sessions
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All device sessions terminated
 *       401:
 *         description: Unauthorized access
 */
authRouter.post("/logout-all", requireAuth, asyncHandler(authController.logoutAll));

/**
 * @openapi
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Request password reset link
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Operation completed
 */
authRouter.post("/forgot-password", rateLimiter, asyncHandler(authController.forgotPassword));

/**
 * @openapi
 * /api/v1/auth/reset-password:
 *   post:
 *     summary: Reset password with token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, password]
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Password reset completed
 *       400:
 *         description: Invalid token link
 */
authRouter.post("/reset-password", asyncHandler(authController.resetPassword));

/**
 * @openapi
 * /api/v1/auth/verify-email:
 *   get:
 *     summary: Confirm account email address
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid verification link
 */
authRouter.get("/verify-email", asyncHandler(authController.verifyEmail));

export { authRouter };
export default authRouter;
