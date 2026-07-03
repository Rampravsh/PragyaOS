import { Router } from "express";
import { categoryController } from "./category.controller";
import { Guard } from "../auth/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

// Public routes
router.get("/", asyncHandler(categoryController.getCategoriesTree));
router.get("/:id", asyncHandler(categoryController.getCategoryById));

// Admin restricted routes
router.post("/", Guard.Permission("user:update"), asyncHandler(categoryController.createCategory));
router.patch("/:id", Guard.Permission("user:update"), asyncHandler(categoryController.updateCategory));
router.delete("/:id", Guard.Permission("user:delete"), asyncHandler(categoryController.deleteCategory));

export const categoryRoutes = router;
export default categoryRoutes;
