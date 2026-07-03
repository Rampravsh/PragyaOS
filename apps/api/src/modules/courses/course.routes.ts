import { Router } from "express";
import { courseController } from "./course.controller";
import { courseModuleController } from "./course-module.controller";
import { Guard } from "../auth/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

// Public / general catalog retrieval
/**
 * @openapi
 * /courses:
 *   get:
 *     summary: Retrieve a paginated and filtered catalog of courses
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [BEGINNER, INTERMEDIATE, ADVANCED, EXPERT]
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paginated course catalog retrieved successfully.
 */
router.get("/", asyncHandler(courseController.listCourses));

/**
 * @openapi
 * /courses/{id}:
 *   get:
 *     summary: Retrieve details of a single course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Course details retrieved successfully.
 *       403:
 *         description: Forbidden from accessing draft or private course.
 *       404:
 *         description: Course not found.
 */
router.get("/:id", asyncHandler(courseController.getCourseById));

/**
 * @openapi
 * /courses/slug/{slug}:
 *   get:
 *     summary: Retrieve details of a single course by URL slug
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course details retrieved successfully.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Course not found.
 */
router.get("/slug/:slug", asyncHandler(courseController.getCourseBySlug));

// Instructor / Admin management endpoints
/**
 * @openapi
 * /courses:
 *   post:
 *     summary: Create a new course (Instructor/Admin restricted)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *               categoryId:
 *                 type: string
 *                 format: uuid
 *               subtitle:
 *                 type: string
 *               description:
 *                 type: string
 *               language:
 *                 type: string
 *               difficulty:
 *                 type: string
 *                 enum: [BEGINNER, INTERMEDIATE, ADVANCED, EXPERT]
 *     responses:
 *       201:
 *         description: Course created successfully.
 *       400:
 *         description: Structural validation failure.
 */
router.post("/", Guard.Permission("user:update"), asyncHandler(courseController.createCourse));

/**
 * @openapi
 * /courses/{id}:
 *   patch:
 *     summary: Update course details (requires ownership/admin)
 *     tags: [Courses]
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
 *               title:
 *                 type: string
 *               categoryId:
 *                 type: string
 *                 format: uuid
 *               subtitle:
 *                 type: string
 *               description:
 *                 type: string
 *               language:
 *                 type: string
 *               difficulty:
 *                 type: string
 *                 enum: [BEGINNER, INTERMEDIATE, ADVANCED, EXPERT]
 *               status:
 *                 type: string
 *                 enum: [DRAFT, REVIEW, PUBLISHED, ARCHIVED]
 *               visibility:
 *                 type: string
 *                 enum: [PUBLIC, PRIVATE, UNLISTED]
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Course updated successfully.
 *       403:
 *         description: Not authorized to edit this course.
 */
router.patch("/:id", Guard.Permission("user:update"), asyncHandler(courseController.updateCourse));

/**
 * @openapi
 * /courses/{id}:
 *   delete:
 *     summary: Archive a course (soft delete)
 *     tags: [Courses]
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
 *         description: Course archived successfully.
 *       430:
 *         description: Not authorized.
 */
router.delete("/:id", Guard.Permission("user:update"), asyncHandler(courseController.archiveCourse));

// Modules sub-resources
/**
 * @openapi
 * /courses/{courseId}/modules:
 *   post:
 *     summary: Create a course module
 *     tags: [Course Modules]
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
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course module created successfully.
 */
router.post("/:courseId/modules", Guard.Permission("user:update"), asyncHandler(courseModuleController.createModule));

/**
 * @openapi
 * /courses/{courseId}/modules/{moduleId}:
 *   patch:
 *     summary: Update course module details
 *     tags: [Course Modules]
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
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Module updated successfully.
 */
router.patch("/:courseId/modules/:moduleId", Guard.Permission("user:update"), asyncHandler(courseModuleController.updateModule));

/**
 * @openapi
 * /courses/{courseId}/modules/{moduleId}:
 *   delete:
 *     summary: Delete a course module
 *     tags: [Course Modules]
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
 *       200:
 *         description: Module deleted successfully.
 */
router.delete("/:courseId/modules/:moduleId", Guard.Permission("user:update"), asyncHandler(courseModuleController.deleteModule));

/**
 * @openapi
 * /courses/{courseId}/modules/reorder:
 *   post:
 *     summary: Bulk reorder modules in a course
 *     tags: [Course Modules]
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
 *               - moduleIds
 *             properties:
 *               moduleIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *     responses:
 *       200:
 *         description: Modules reordered successfully.
 */
router.post("/:courseId/modules/reorder", Guard.Permission("user:update"), asyncHandler(courseModuleController.reorderModules));

export const courseRoutes = router;
export default courseRoutes;
