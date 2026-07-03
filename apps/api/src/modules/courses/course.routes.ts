import { Router } from "express";
import { courseController } from "./course.controller";
import { courseModuleController } from "./course-module.controller";
import { Guard } from "../auth/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

// Public / general catalog retrieval
router.get("/", asyncHandler(courseController.listCourses));
router.get("/:id", asyncHandler(courseController.getCourseById));
router.get("/slug/:slug", asyncHandler(courseController.getCourseBySlug));

// Instructor / Admin management endpoints
router.post("/", Guard.Permission("user:update"), asyncHandler(courseController.createCourse));
router.patch("/:id", Guard.Permission("user:update"), asyncHandler(courseController.updateCourse));
router.delete("/:id", Guard.Permission("user:update"), asyncHandler(courseController.archiveCourse));

// Modules sub-resources
router.post("/:courseId/modules", Guard.Permission("user:update"), asyncHandler(courseModuleController.createModule));
router.patch("/:courseId/modules/:moduleId", Guard.Permission("user:update"), asyncHandler(courseModuleController.updateModule));
router.delete("/:courseId/modules/:moduleId", Guard.Permission("user:update"), asyncHandler(courseModuleController.deleteModule));
router.post("/:courseId/modules/reorder", Guard.Permission("user:update"), asyncHandler(courseModuleController.reorderModules));

export const courseRoutes = router;
export default courseRoutes;
