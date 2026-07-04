import { LearningUnit, LearningResource } from "@prisma/client";
import { prisma } from "../../database/client";
import { AppError } from "../../common/errors/appError";
import { courseService } from "../courses/course.service";
import { courseModuleRepository } from "../courses/course-module.repository";
import { mediaRepository } from "../media/media.repository";
import { CreateLearningUnitInput, UpdateLearningUnitInput, CreateLearningResourceInput, UpdateLearningResourceInput } from "./learning-unit.schemas";
import { learningUnitRepository, LearningUnitRepository } from "./learning-unit.repository";

export class LearningUnitService {
  constructor(private readonly repository: LearningUnitRepository = learningUnitRepository) {}

  /**
   * Resolves a learning unit or throws NotFound.
   */
  public async getLearningUnit(moduleId: string, unitId: string): Promise<any> {
    const unit = await this.repository.findByIdWithResources(unitId);
    if (!unit || unit.moduleId !== moduleId) {
      throw AppError.notFound("Learning unit not found.");
    }
    return unit;
  }

  /**
   * Resolves parent course of a module.
   */
  private async getCourseIdFromModule(moduleId: string): Promise<string> {
    const module = await courseModuleRepository.findById(moduleId);
    if (!module) {
      throw AppError.notFound("Course module not found.");
    }
    return module.courseId;
  }

  /**
   * Creates a new LearningUnit, enforcing ownership and auto-sequencing.
   */
  public async createLearningUnit(
    moduleId: string,
    input: CreateLearningUnitInput,
    userContext: { id: string; roles: string[]; permissions: string[] }
  ): Promise<LearningUnit> {
    const courseId = await this.getCourseIdFromModule(moduleId);
    await courseService.validateOwnership(courseId, userContext);

    // 1. Verify media if referenced
    if (input.mediaId) {
      const media = await mediaRepository.findById(input.mediaId);
      if (!media) {
        throw AppError.badRequest("Invalid media ID reference.");
      }
    }

    // 2. Auto-sequence index
    let sequence = input.sequence;
    if (sequence === undefined || sequence === 0) {
      const maxSeq = await this.repository.getMaxSequence(moduleId);
      sequence = maxSeq + 1;
    }

    return this.repository.create({
      moduleId,
      title: input.title,
      description: input.description || null,
      type: input.type,
      sequence,
      mediaId: input.mediaId || null,
      content: (input.content as any) || null,
      duration: input.duration || 0,
    });
  }

  /**
   * Updates an existing LearningUnit. Handles moving units between modules.
   */
  public async updateLearningUnit(
    moduleId: string,
    unitId: string,
    input: UpdateLearningUnitInput,
    targetModuleId: string | undefined, // Target module ID if moving unit
    userContext: { id: string; roles: string[]; permissions: string[] }
  ): Promise<LearningUnit> {
    const courseId = await this.getCourseIdFromModule(moduleId);
    await courseService.validateOwnership(courseId, userContext);
    const unit = await this.getLearningUnit(moduleId, unitId);

    // Verify media if referenced
    if (input.mediaId) {
      const media = await mediaRepository.findById(input.mediaId);
      if (!media) {
        throw AppError.badRequest("Invalid media ID reference.");
      }
    }

    let nextModuleId = moduleId;
    let sequence = input.sequence !== undefined ? input.sequence : unit.sequence;

    // Handle movement between modules
    if (targetModuleId && targetModuleId !== moduleId) {
      const targetCourseId = await this.getCourseIdFromModule(targetModuleId);
      if (targetCourseId !== courseId) {
        throw AppError.badRequest("Cannot move learning unit to another course curriculum.");
      }
      nextModuleId = targetModuleId;
      
      // Auto-sequence to tail of new module
      const maxSeq = await this.repository.getMaxSequence(targetModuleId);
      sequence = maxSeq + 1;
    }

    return this.repository.update(unitId, {
      moduleId: nextModuleId,
      title: input.title,
      description: input.description !== undefined ? input.description : undefined,
      type: input.type,
      sequence,
      mediaId: input.mediaId !== undefined ? input.mediaId : undefined,
      content: input.content !== undefined ? (input.content as any) : undefined,
      duration: input.duration !== undefined ? input.duration : undefined,
    });
  }

  /**
   * Deletes a LearningUnit.
   */
  public async deleteLearningUnit(
    moduleId: string,
    unitId: string,
    userContext: { id: string; roles: string[]; permissions: string[] }
  ): Promise<void> {
    const courseId = await this.getCourseIdFromModule(moduleId);
    await courseService.validateOwnership(courseId, userContext);
    await this.getLearningUnit(moduleId, unitId);

    await this.repository.delete(unitId);
  }

  /**
   * Reorders multiple learning units inside a module in a database transaction.
   */
  public async reorderLearningUnits(
    moduleId: string,
    unitIds: string[],
    userContext: { id: string; roles: string[]; permissions: string[] }
  ): Promise<LearningUnit[]> {
    const courseId = await this.getCourseIdFromModule(moduleId);
    await courseService.validateOwnership(courseId, userContext);

    // 1. Validate all unitIds belong to this module
    const count = await this.repository.countByModuleAndIds(moduleId, unitIds);
    if (count !== unitIds.length) {
      throw AppError.badRequest("Invalid learning unit IDs in reordering request.");
    }

    // 2. Perform updates in a transaction (kept at Service layer)
    await prisma.$transaction(
      unitIds.map((id, index) =>
        prisma.learningUnit.update({
          where: { id },
          data: { sequence: index + 1 },
        })
      )
    );

    return this.repository.findManyByModuleId(moduleId);
  }

  // --- Supporting Resources Actions ---

  /**
   * Creates a LearningResource mapping attachment media.
   */
  public async createLearningResource(
    moduleId: string,
    unitId: string,
    input: CreateLearningResourceInput,
    userContext: { id: string; roles: string[]; permissions: string[] }
  ): Promise<LearningResource> {
    const courseId = await this.getCourseIdFromModule(moduleId);
    await courseService.validateOwnership(courseId, userContext);
    await this.getLearningUnit(moduleId, unitId);

    const media = await mediaRepository.findById(input.mediaId);
    if (!media) {
      throw AppError.badRequest("Invalid media ID reference.");
    }

    let sequence = input.sequence;
    if (sequence === undefined || sequence === 0) {
      const maxSeq = await this.repository.getMaxResourceSequence(unitId);
      sequence = maxSeq + 1;
    }

    return this.repository.createResource({
      learningUnitId: unitId,
      mediaId: input.mediaId,
      title: input.title,
      sequence,
    });
  }

  /**
   * Deletes a LearningResource.
   */
  public async deleteLearningResource(
    moduleId: string,
    unitId: string,
    resourceId: string,
    userContext: { id: string; roles: string[]; permissions: string[] }
  ): Promise<void> {
    const courseId = await this.getCourseIdFromModule(moduleId);
    await courseService.validateOwnership(courseId, userContext);
    await this.getLearningUnit(moduleId, unitId);

    const resource = await this.repository.findResourceById(resourceId);
    if (!resource || resource.learningUnitId !== unitId) {
      throw AppError.notFound("Learning resource attachment not found.");
    }

    await this.repository.deleteResource(resourceId);
  }
}

export const learningUnitService = new LearningUnitService();
export default learningUnitService;
