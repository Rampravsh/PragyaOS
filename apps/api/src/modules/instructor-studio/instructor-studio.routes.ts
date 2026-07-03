import { Router } from "express";
import { instructorStudioController } from "./instructor-studio.controller";
import { requireAuth } from "../auth/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

// Secure all instructor studio endpoints
router.use(requireAuth);

/**
 * @openapi
 * /instructor-studio/dashboard:
 *   get:
 *     summary: Retrieve the instructor dashboard overview
 *     tags: [Instructor Studio]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard metrics returned.
 */
router.get("/dashboard", asyncHandler(instructorStudioController.getInstructorDashboard));

/**
 * @openapi
 * /instructor-studio/courses/{courseId}/checklist:
 *   get:
 *     summary: Get publishing readiness checklist report for a course
 *     tags: [Instructor Studio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Publishing checklist array.
 */
router.get("/courses/:courseId/checklist", asyncHandler(instructorStudioController.getPublishingChecklist));

/**
 * @openapi
 * /instructor-studio/courses/{courseId}/health:
 *   get:
 *     summary: Get quality health score and recommendations for a course
 *     tags: [Instructor Studio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Health report details.
 */
router.get("/courses/:courseId/health", asyncHandler(instructorStudioController.getCourseHealthReport));

/**
 * @openapi
 * /instructor-studio/courses/{courseId}/review:
 *   post:
 *     summary: Submit a course for draft review
 *     tags: [Instructor Studio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
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
 *               changeSummary:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course transitioned to REVIEW status.
 */
router.post("/courses/:courseId/review", asyncHandler(instructorStudioController.submitForReview));

/**
 * @openapi
 * /instructor-studio/courses/{courseId}/publish:
 *   post:
 *     summary: Publish a course (In Review -> Published). Requires Admin/Reviewer role.
 *     tags: [Instructor Studio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
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
 *               changeSummary:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course published successfully.
 */
router.post("/courses/:courseId/publish", asyncHandler(instructorStudioController.publishCourse));

/**
 * @openapi
 * /instructor-studio/courses/{courseId}/unpublish:
 *   post:
 *     summary: Unpublish a course (Published -> Draft)
 *     tags: [Instructor Studio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Course unpublished.
 */
router.post("/courses/:courseId/unpublish", asyncHandler(instructorStudioController.unpublishCourse));

/**
 * @openapi
 * /instructor-studio/courses/{courseId}/archive:
 *   post:
 *     summary: Archive a course
 *     tags: [Instructor Studio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Course archived.
 */
router.post("/courses/:courseId/archive", asyncHandler(instructorStudioController.archiveCourse));

/**
 * @openapi
 * /instructor-studio/courses/{courseId}/restore:
 *   post:
 *     summary: Restore an archived course back to draft status
 *     tags: [Instructor Studio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Course restored.
 */
router.post("/courses/:courseId/restore", asyncHandler(instructorStudioController.restoreCourse));

/**
 * @openapi
 * /instructor-studio/courses/{courseId}/preview-token:
 *   post:
 *     summary: Generate a secure, short-lived preview token
 *     tags: [Instructor Studio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
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
 *               scope:
 *                 type: string
 *                 enum: [INSTRUCTOR, REVIEWER, PUBLIC]
 *               expiresInSeconds:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Preview token returned.
 */
router.post("/courses/:courseId/preview-token", asyncHandler(instructorStudioController.generatePreviewToken));

/**
 * @openapi
 * /instructor-studio/courses/{courseId}/duplicate:
 *   post:
 *     summary: Duplicate a course and its entire modules structure
 *     tags: [Instructor Studio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
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
 *               newTitle:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course duplicated.
 */
router.post("/courses/:courseId/duplicate", asyncHandler(instructorStudioController.duplicateCourse));

/**
 * @openapi
 * /instructor-studio/courses/{courseId}/modules/{moduleId}/duplicate:
 *   post:
 *     summary: Duplicate a curriculum module
 *     tags: [Instructor Studio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       201:
 *         description: Module duplicated.
 */
router.post("/courses/:courseId/modules/:moduleId/duplicate", asyncHandler(instructorStudioController.duplicateModule));

/**
 * @openapi
 * /instructor-studio/courses/{courseId}/learning-units/{learningUnitId}/duplicate:
 *   post:
 *     summary: Duplicate a learning unit
 *     tags: [Instructor Studio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: learningUnitId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       201:
 *         description: Unit duplicated.
 */
router.post("/courses/:courseId/learning-units/:learningUnitId/duplicate", asyncHandler(instructorStudioController.duplicateLearningUnit));

/**
 * @openapi
 * /instructor-studio/courses/{courseId}/modules/{moduleId}/move:
 *   post:
 *     summary: Move a module's sequential position index
 *     tags: [Instructor Studio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: moduleId
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
 *               - targetIndex
 *             properties:
 *               targetIndex:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Module position updated.
 */
router.post("/courses/:courseId/modules/:moduleId/move", asyncHandler(instructorStudioController.moveModule));

/**
 * @openapi
 * /instructor-studio/courses/{courseId}/learning-units/{learningUnitId}/move:
 *   post:
 *     summary: Move a learning unit to a different module or sequence index
 *     tags: [Instructor Studio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: learningUnitId
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
 *               - targetModuleId
 *               - targetIndex
 *             properties:
 *               targetModuleId:
 *                 type: string
 *                 format: uuid
 *               targetIndex:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Learning Unit relocated.
 */
router.post("/courses/:courseId/learning-units/:learningUnitId/move", asyncHandler(instructorStudioController.moveLearningUnit));

/**
 * @openapi
 * /instructor-studio/courses/{courseId}/curriculum/reorder:
 *   post:
 *     summary: Bulk reorder curriculum sequence indices in a transaction
 *     tags: [Instructor Studio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
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
 *               - modules
 *             properties:
 *               modules:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - id
 *                     - sequence
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     sequence:
 *                       type: integer
 *                     learningUnits:
 *                       type: array
 *                       items:
 *                         type: object
 *                         required:
 *                           - id
 *                           - sequence
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           sequence:
 *                             type: integer
 *     responses:
 *       200:
 *         description: Curriculum bulk reordered.
 */
router.post("/courses/:courseId/curriculum/reorder", asyncHandler(instructorStudioController.bulkReorderCurriculum));

export const instructorStudioRoutes = router;
export default instructorStudioRoutes;
