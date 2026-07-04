import { Request, Response } from "express";
import { courseModuleService, CourseModuleService } from "./course-module.service";
import { createModuleSchema, updateModuleSchema, CreateModuleInput, UpdateModuleInput } from "./course.schemas";
import { validate } from "../../common/dto/base.dto";
import { z } from "zod";
import { SuccessResponse } from "../../common/responses/successResponse";

export class CourseModuleController {
  constructor(private readonly service: CourseModuleService = courseModuleService) {}

  /**
   * Creates a Module in a course (requires ownership).
   */
  public createModule = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const input = validate(createModuleSchema as any, req.body) as CreateModuleInput;
    const userContext = req.user!;

    const module = await this.service.createModule(courseId, input, userContext);
    SuccessResponse.created(res, module, "Module created successfully.");
  };

  /**
   * Updates an existing Module (requires ownership).
   */
  public updateModule = async (req: Request, res: Response): Promise<void> => {
    const { courseId, moduleId } = req.params;
    const input = validate(updateModuleSchema as any, req.body) as UpdateModuleInput;
    const userContext = req.user!;

    const module = await this.service.updateModule(courseId, moduleId, input, userContext);
    SuccessResponse.send(res, module, "Module updated successfully.");
  };

  /**
   * Deletes a Module (requires ownership).
   */
  public deleteModule = async (req: Request, res: Response): Promise<void> => {
    const { courseId, moduleId } = req.params;
    const userContext = req.user!;

    await this.service.deleteModule(courseId, moduleId, userContext);
    SuccessResponse.send(res, null, "Module deleted successfully.");
  };

  /**
   * Reorders modules sequences inside a course.
   */
  public reorderModules = async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    const reorderSchema = z.object({
      moduleIds: z.array(z.string().uuid("Invalid module UUID.")),
    });
    const { moduleIds } = validate(reorderSchema, req.body);
    const userContext = req.user!;

    const modules = await this.service.reorderModules(courseId, moduleIds, userContext);
    SuccessResponse.send(res, modules, "Modules reordered successfully.");
  };
}

export const courseModuleController = new CourseModuleController();
export default courseModuleController;
