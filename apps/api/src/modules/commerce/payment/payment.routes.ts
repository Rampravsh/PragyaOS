import { Router } from "express";
import { paymentController } from "./payment.controller";
import { asyncHandler } from "../../../utils/asyncHandler";

const router = Router();

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
