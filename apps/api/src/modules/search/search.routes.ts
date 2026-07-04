import { Router } from "express";
import { searchController } from "./search.controller";
import { Guard } from "../auth/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";
import { SEARCH_PERMISSIONS } from "./search.constants";

const router = Router();

/**
 * @openapi
 * /search:
 *   get:
 *     summary: Search for courses with text queries and filter facets
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema: { type: string, default: "" }
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 100, default: 20 }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: difficulty
 *         schema: { type: string }
 *       - in: query
 *         name: language
 *         schema: { type: string }
 *       - in: query
 *         name: tags
 *         schema: { type: string }
 *       - in: query
 *         name: sort
 *         schema: { type: string, enum: [relevance, newest, popularity, rating], default: relevance }
 *     responses:
 *       200:
 *         description: Search executed successfully.
 */
router.get("/", asyncHandler(searchController.search));

/**
 * @openapi
 * /search/suggestions:
 *   get:
 *     summary: Retrieve query auto-suggestions
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, default: 5 }
 *       - in: query
 *         name: index
 *         schema: { type: string, enum: [courses, categories, instructors, tags], default: courses }
 *     responses:
 *       200:
 *         description: Suggestions retrieved successfully.
 */
router.get("/suggestions", asyncHandler(searchController.autocomplete));

/**
 * @openapi
 * /search/popular:
 *   get:
 *     summary: Get popular searches list
 *     tags: [Search]
 *     responses:
 *       200:
 *         description: Popular searches list retrieved.
 */
router.get("/popular", asyncHandler(searchController.getPopular));

/**
 * @openapi
 * /search/health:
 *   get:
 *     summary: Retrieve search backend health and queue status
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Search health report retrieved successfully.
 *       403:
 *         description: Forbidden (Admin access required).
 */
router.get("/health", Guard.Permission(SEARCH_PERMISSIONS.REINDEX), asyncHandler(searchController.health));

/**
 * @openapi
 * /search/reindex:
 *   post:
 *     summary: Enqueue manual indexing task for a specific entity
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [entityType, entityId]
 *             properties:
 *               entityType:
 *                 type: string
 *                 enum: [courses, categories, instructors, tags]
 *               entityId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Manual reindexing task enqueued.
 */
router.post("/reindex", Guard.Permission(SEARCH_PERMISSIONS.REINDEX), asyncHandler(searchController.reindexEntity));

/**
 * @openapi
 * /search/reindex/all:
 *   post:
 *     summary: Trigger full indexing rebuild across all entities
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Full index rebuild enqueued.
 */
router.post("/reindex/all", Guard.Permission(SEARCH_PERMISSIONS.REINDEX), asyncHandler(searchController.reindexAll));

export { router as searchRoutes };
export default router;
