import { Router, Request, Response } from "express";
import { SuccessResponse } from "../common/responses/successResponse";

const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Verify application health status
 *     responses:
 *       200:
 *         description: Application is healthy
 */
router.get("/health", (req: Request, res: Response) => {
  SuccessResponse.send(res, { status: "healthy", timestamp: new Date() }, "API service is active.");
});

/**
 * @openapi
 * /live:
 *   get:
 *     summary: Verify application runtime liveness
 *     responses:
 *       200:
 *         description: Application is alive
 */
router.get("/live", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

/**
 * @openapi
 * /ready:
 *   get:
 *     summary: Verify application readiness to consume requests
 *     responses:
 *       200:
 *         description: Application is ready
 */
router.get("/ready", (req: Request, res: Response) => {
  // If we had active databases/queues, we would check connectivity state here
  res.status(200).send("READY");
});

export default router;
