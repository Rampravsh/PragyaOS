import { Request, Response } from "express";
import { learningUnitService, LearningUnitService } from "./learning-unit.service";
import { createLearningUnitSchema, updateLearningUnitSchema, createLearningResourceSchema, CreateLearningUnitInput, UpdateLearningUnitInput, CreateLearningResourceInput } from "./learning-unit.schemas";
import { validate } from "../../common/dto/base.dto";
import { z } from "zod";
import { SuccessResponse } from "../../common/responses/successResponse";

export class LearningUnitController {
  constructor(private readonly service: LearningUnitService = learningUnitService) {}

  /**
   * Creates a LearningUnit (requires ownership).
   */
  public createLearningUnit = async (req: Request, res: Response): Promise<void> => {
    const { moduleId } = req.params;
    const input = validate(createLearningUnitSchema as any, req.body) as CreateLearningUnitInput;
    const userContext = req.user!;

    const unit = await this.service.createLearningUnit(moduleId, input, userContext);
    SuccessResponse.created(res, unit, "Learning unit created successfully.");
  };

  /**
   * Updates an existing LearningUnit (requires ownership).
   */
  public updateLearningUnit = async (req: Request, res: Response): Promise<void> => {
    const { moduleId, id } = req.params;
    const input = validate(updateLearningUnitSchema as any, req.body) as UpdateLearningUnitInput;
    const { targetModuleId } = req.body;
    const userContext = req.user!;

    const unit = await this.service.updateLearningUnit(moduleId, id, input, targetModuleId, userContext);
    SuccessResponse.send(res, unit, "Learning unit updated successfully.");
  };

  /**
   * Deletes a LearningUnit (requires ownership).
   */
  public deleteLearningUnit = async (req: Request, res: Response): Promise<void> => {
    const { moduleId, id } = req.params;
    const userContext = req.user!;

    await this.service.deleteLearningUnit(moduleId, id, userContext);
    SuccessResponse.send(res, null, "Learning unit deleted successfully.");
  };

  /**
   * Reorders multiple learning units inside a module.
   */
  public reorderLearningUnits = async (req: Request, res: Response): Promise<void> => {
    const { moduleId } = req.params;
    const reorderSchema = z.object({
      unitIds: z.array(z.string().uuid("Invalid unit UUID.")),
    });
    const { unitIds } = validate(reorderSchema, req.body);
    const userContext = req.user!;

    const units = await this.service.reorderLearningUnits(moduleId, unitIds, userContext);
    SuccessResponse.send(res, units, "Learning units reordered successfully.");
  };

  // --- Supporting Resources Actions ---

  /**
   * Creates a learning resource attachment (requires ownership).
   */
  public createLearningResource = async (req: Request, res: Response): Promise<void> => {
    const { moduleId, unitId } = req.params;
    const input = validate(createLearningResourceSchema as any, req.body) as CreateLearningResourceInput;
    const userContext = req.user!;

    const resource = await this.service.createLearningResource(moduleId, unitId, input, userContext);
    SuccessResponse.created(res, resource, "Learning resource attachment registered successfully.");
  };

  /**
   * Deletes a learning resource attachment (requires ownership).
   */
  public deleteLearningResource = async (req: Request, res: Response): Promise<void> => {
    const { moduleId, unitId, resourceId } = req.params;
    const userContext = req.user!;

    await this.service.deleteLearningResource(moduleId, unitId, resourceId, userContext);
    SuccessResponse.send(res, null, "Learning resource attachment deleted successfully.");
  };
}

export const learningUnitController = new LearningUnitController();
export default learningUnitController;
