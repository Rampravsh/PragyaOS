import { Router } from "express";
import { learningEngineController } from "./learning-engine.controller";
import { requireAuth } from "../auth/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

// Require auth for all learning engine endpoints
router.use(requireAuth);

/**
 * @openapi
 * /learning-engine/enroll:
 *   post:
 *     summary: Enroll a student in a course
 *     tags: [Learning Engine]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *             properties:
 *               courseId:
 *                 type: string
 *                 format: uuid
 *               source:
 *                 type: string
 *               purchaseRef:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student enrolled successfully.
 *       409:
 *         description: Student is already enrolled.
 */
router.post("/enroll", asyncHandler(learningEngineController.enrollStudent));

/**
 * @openapi
 * /learning-engine/enrollments/{id}/suspend:
 *   post:
 *     summary: Suspend an active enrollment
 *     tags: [Learning Engine]
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
 *         description: Enrollment suspended.
 */
router.post("/enrollments/:id/suspend", asyncHandler(learningEngineController.suspendEnrollment));

/**
 * @openapi
 * /learning-engine/enrollments/{id}/resume:
 *   post:
 *     summary: Resume a suspended or cancelled enrollment
 *     tags: [Learning Engine]
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
 *         description: Enrollment resumed.
 */
router.post("/enrollments/:id/resume", asyncHandler(learningEngineController.resumeEnrollment));

/**
 * @openapi
 * /learning-engine/enrollments/{id}/cancel:
 *   post:
 *     summary: Cancel an enrollment
 *     tags: [Learning Engine]
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
 *         description: Enrollment cancelled.
 */
router.post("/enrollments/:id/cancel", asyncHandler(learningEngineController.cancelEnrollment));

/**
 * @openapi
 * /learning-engine/enrollments/{id}/progress:
 *   post:
 *     summary: Update progress on a specific learning unit
 *     tags: [Learning Engine]
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
 *               - learningUnitId
 *             properties:
 *               learningUnitId:
 *                 type: string
 *                 format: uuid
 *               watchTime:
 *                 type: integer
 *               lastPosition:
 *                 type: integer
 *               percentInput:
 *                 type: number
 *               quizScore:
 *                 type: number
 *               quizPassingScore:
 *                 type: number
 *               quizMaxScore:
 *                 type: number
 *               isSubmitted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Progress updated.
 */
router.post("/enrollments/:id/progress", asyncHandler(learningEngineController.updateProgress));

/**
 * @openapi
 * /learning-engine/enrollments/{id}/sessions/start:
 *   post:
 *     summary: Start a new learning session
 *     tags: [Learning Engine]
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
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               learningUnitId:
 *                 type: string
 *                 format: uuid
 *               device:
 *                 type: string
 *               browser:
 *                 type: string
 *               ipAddress:
 *                 type: string
 *               userAgent:
 *                 type: string
 *     responses:
 *       200:
 *         description: Session started.
 */
router.post("/enrollments/:id/sessions/start", asyncHandler(learningEngineController.startSession));

/**
 * @openapi
 * /learning-engine/sessions/{sessionId}/end:
 *   post:
 *     summary: Complete/end an active learning session
 *     tags: [Learning Engine]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Session ended.
 */
router.post("/sessions/:sessionId/end", asyncHandler(learningEngineController.endSession));

/**
 * @openapi
 * /learning-engine/enrollments/{id}/continue:
 *   get:
 *     summary: Get recommend next unit and last learning checkpoints
 *     tags: [Learning Engine]
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
 *         description: Recommendation payload returned.
 */
router.get("/enrollments/:id/continue", asyncHandler(learningEngineController.continueLearning));

/**
 * @openapi
 * /learning-engine/enrollments/{id}/completion:
 *   get:
 *     summary: Get course completion stats and certificate eligibility flags
 *     tags: [Learning Engine]
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
 *         description: Course completion stats returned.
 */
router.get("/enrollments/:id/completion", asyncHandler(learningEngineController.getCourseCompletion));

/**
 * @openapi
 * /learning-engine/enrollments/{id}/timeline:
 *   get:
 *     summary: Query the student's audit event timeline
 *     tags: [Learning Engine]
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
 *         description: Student timeline log array returned.
 */
router.get("/enrollments/:id/timeline", asyncHandler(learningEngineController.getTimeline));

export const learningEngineRoutes = router;
export default learningEngineRoutes;
