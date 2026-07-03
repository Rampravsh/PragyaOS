import { Router } from "express";
import { learningUnitController } from "./learning-unit.controller";
import { Guard } from "../auth/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

// Units CRUD and reordering
/**
 * @openapi
 * /learning-units/modules/{moduleId}/units:
 *   post:
 *     summary: Create a learning unit under a module
 *     tags: [Learning Units]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *               - title
 *               - type
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [VIDEO, ARTICLE, PDF, QUIZ, ASSIGNMENT, LIVE_SESSION, EXTERNAL_LINK, CODE_LAB]
 *               duration:
 *                 type: integer
 *               mediaId:
 *                 type: string
 *                 format: uuid
 *               content:
 *                 type: object
 *     responses:
 *       201:
 *         description: Learning unit created successfully.
 */
router.post("/modules/:moduleId/units", Guard.Permission("user:update"), asyncHandler(learningUnitController.createLearningUnit));

/**
 * @openapi
 * /learning-units/modules/{moduleId}/units/{id}:
 *   patch:
 *     summary: Update a learning unit (and optionally shift modules)
 *     tags: [Learning Units]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
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
 *               description:
 *                 type: string
 *               duration:
 *                 type: integer
 *               mediaId:
 *                 type: string
 *                 format: uuid
 *               content:
 *                 type: object
 *               targetModuleId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Learning unit updated successfully.
 */
router.patch("/modules/:moduleId/units/:id", Guard.Permission("user:update"), asyncHandler(learningUnitController.updateLearningUnit));

/**
 * @openapi
 * /learning-units/modules/:moduleId/units/{id}:
 *   delete:
 *     summary: Delete a learning unit
 *     tags: [Learning Units]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Learning unit deleted successfully.
 */
router.delete("/modules/:moduleId/units/:id", Guard.Permission("user:update"), asyncHandler(learningUnitController.deleteLearningUnit));

/**
 * @openapi
 * /learning-units/modules/{moduleId}/units/reorder:
 *   post:
 *     summary: Bulk reorder learning units in a module
 *     tags: [Learning Units]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *               - unitIds
 *             properties:
 *               unitIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *     responses:
 *       200:
 *         description: Units reordered successfully.
 */
router.post("/modules/:moduleId/units/reorder", Guard.Permission("user:update"), asyncHandler(learningUnitController.reorderLearningUnits));

// Supporting Resources attachments
/**
 * @openapi
 * /learning-units/modules/{moduleId}/units/{unitId}/resources:
 *   post:
 *     summary: Attach a resource/file to a learning unit
 *     tags: [Learning Unit Resources]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: unitId
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
 *               - mediaId
 *             properties:
 *               title:
 *                 type: string
 *               mediaId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Resource attached successfully.
 */
router.post("/modules/:moduleId/units/:unitId/resources", Guard.Permission("user:update"), asyncHandler(learningUnitController.createLearningResource));

/**
 * @openapi
 * /learning-units/modules/{moduleId}/units/{unitId}/resources/{resourceId}:
 *   delete:
 *     summary: Delete/detach a resource from a learning unit
 *     tags: [Learning Unit Resources]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: unitId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: resourceId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Resource detached successfully.
 */
router.delete("/modules/:moduleId/units/:unitId/resources/:resourceId", Guard.Permission("user:update"), asyncHandler(learningUnitController.deleteLearningResource));

export const learningUnitRoutes = router;
export default learningUnitRoutes;
