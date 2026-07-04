import { Router } from "express";
import { paymentController } from "./payment.controller";
import { asyncHandler } from "../../../utils/asyncHandler";
import { requireAuth } from "../../auth/auth.middleware";

const router = Router();

/**
 * @openapi
 * /payments/checkout:
 *   post:
 *     summary: Initiate a course purchase checkout session
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, priceId]
 *             properties:
 *               productId:
 *                 type: string
 *                 format: uuid
 *               priceId:
 *                 type: string
 *                 format: uuid
 *               couponCode:
 *                 type: string
 *                 maxLength: 50
 *               billingRegion:
 *                 type: string
 *                 length: 2
 *               gateway:
 *                 type: string
 *                 enum: [RAZORPAY, STRIPE, PAYPAL]
 *     responses:
 *       201:
 *         description: Checkout session successfully initiated.
 *       400:
 *         description: Schema validation failure.
 *       401:
 *         description: Unauthorized credentials.
 *       409:
 *         description: Concurrent checkout attempt conflict.
 */
router.post("/checkout", requireAuth, asyncHandler(paymentController.initiateCheckout));

/**
 * @openapi
 * /payments/webhook:
 *   post:
 *     summary: Receive verified payment webhook payloads from Razorpay
 *     tags: [Payments]
 *     parameters:
 *       - in: header
 *         name: x-razorpay-signature
 *         required: true
 *         schema:
 *           type: string
 *         description: The cryptographic signature from Razorpay
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook event parsed and enqueued successfully.
 *       400:
 *         description: Bad request, missing headers or payload validation error.
 *       409:
 *         description: Conflict, duplicate processing detected.
 */
router.post("/webhook", asyncHandler(paymentController.handleWebhook));

export { router as paymentRoutes };
export default router;
