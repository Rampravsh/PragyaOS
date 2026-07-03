import { Router } from "express";
import { learningUnitController } from "./learning-unit.controller";
import { Guard } from "../auth/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

// Units CRUD and reordering
router.post("/modules/:moduleId/units", Guard.Permission("user:update"), asyncHandler(learningUnitController.createLearningUnit));
router.patch("/modules/:moduleId/units/:id", Guard.Permission("user:update"), asyncHandler(learningUnitController.updateLearningUnit));
router.delete("/modules/:moduleId/units/:id", Guard.Permission("user:update"), asyncHandler(learningUnitController.deleteLearningUnit));
router.post("/modules/:moduleId/units/reorder", Guard.Permission("user:update"), asyncHandler(learningUnitController.reorderLearningUnits));

// Supporting Resources attachments
router.post("/modules/:moduleId/units/:unitId/resources", Guard.Permission("user:update"), asyncHandler(learningUnitController.createLearningResource));
router.delete("/modules/:moduleId/units/:unitId/resources/:resourceId", Guard.Permission("user:update"), asyncHandler(learningUnitController.deleteLearningResource));

export const learningUnitRoutes = router;
export default learningUnitRoutes;
