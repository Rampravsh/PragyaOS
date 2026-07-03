import { Router } from "express";
import { categoryController } from "./category.controller";
import { Guard } from "../auth/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

// Public routes
/**
 * @openapi
 * /categories:
 *   get:
 *     summary: Retrieve categories formatted as a recursive tree node hierarchy
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Categories tree fetched successfully.
 */
router.get("/", asyncHandler(categoryController.getCategoriesTree));

/**
 * @openapi
 * /categories/{id}:
 *   get:
 *     summary: Retrieve details of a single category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Category details fetched successfully.
 *       404:
 *         description: Category not found.
 */
router.get("/:id", asyncHandler(categoryController.getCategoryById));

// Admin restricted routes
/**
 * @openapi
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               parentId:
 *                 type: string
 *                 format: uuid
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully.
 *       409:
 *         description: Duplicate slug or name conflict.
 */
router.post("/", Guard.Permission("user:update"), asyncHandler(categoryController.createCategory));

/**
 * @openapi
 * /categories/{id}:
 *   patch:
 *     summary: Update category details
 *     tags: [Categories]
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
 *               name:
 *                 type: string
 *               parentId:
 *                 type: string
 *                 format: uuid
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *       400:
 *         description: Category loop cycle error.
 *       409:
 *         description: Slug conflict.
 */
router.patch("/:id", Guard.Permission("user:update"), asyncHandler(categoryController.updateCategory));

/**
 * @openapi
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category (restricted by child counts)
 *     tags: [Categories]
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
 *         description: Category deleted successfully.
 *       400:
 *         description: Cannot delete category due to nested children or courses.
 */
router.delete("/:id", Guard.Permission("user:delete"), asyncHandler(categoryController.deleteCategory));

export const categoryRoutes = router;
export default categoryRoutes;
