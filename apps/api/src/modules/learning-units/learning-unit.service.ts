import { LearningUnit, LearningResource } from "@prisma/client";
import { prisma } from "../../database/client";
import { AppError } from "../../common/errors/appError";
import { courseService } from "../courses/course.service";
import { courseModuleService } from "../courses/course-module.service";
import { CreateLearningUnitInput, UpdateLearningUnitInput, CreateLearningResourceInput, UpdateLearningResourceInput } from "./learning-unit.schemas";

export class LearningUnitService {
  /**
   * Resolves a learning unit or throws NotFound.
   */
  public async getLearningUnit(moduleId: string, unitId: string): Promise<any> {
    const unit = await prisma.learningUnit.findUnique({
      where: { id: unitId },
      include: { resources: true },
    });
    if (!unit || unit.moduleId !== moduleId) {
      throw AppError.notFound("Learning unit not found.");
    }
    return unit;
  }

  /**
   * Resolves parent course of a module.
   */
  private async getCourseIdFromModule(moduleId: string): Promise<string> {
    const module = await prisma.courseModule.findUnique({
      where: { id: moduleId },
      select: { courseId: true },
    });
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
      const media = await prisma.media.findUnique({ where: { id: input.mediaId } });
      if (!media) {
        throw AppError.badRequest("Invalid media ID reference.");
      }
    }

    // 2. Auto-sequence index
    let sequence = input.sequence;
    if (sequence === undefined || sequence === 0) {
      const maxSeq = await prisma.learningUnit.aggregate({
        where: { moduleId },
        _max: { sequence: true },
      });
      sequence = (maxSeq._max.sequence || 0) + 1;
    }

    return prisma.learningUnit.create({
      data: {
        moduleId,
        title: input.title,
        description: input.description || null,
        type: input.type,
        sequence,
        mediaId: input.mediaId || null,
        content: (input.content as any) || null,
        duration: input.duration || 0,
      },
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
      const media = await prisma.media.findUnique({ where: { id: input.mediaId } });
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
      const maxSeq = await prisma.learningUnit.aggregate({
        where: { moduleId: targetModuleId },
        _max: { sequence: true },
      });
      sequence = (maxSeq._max.sequence || 0) + 1;
    }

    return prisma.learningUnit.update({
      where: { id: unitId },
      data: {
        moduleId: nextModuleId,
        title: input.title,
        description: input.description !== undefined ? input.description : undefined,
        type: input.type,
        sequence,
        mediaId: input.mediaId !== undefined ? input.mediaId : undefined,
        content: input.content !== undefined ? (input.content as any) : undefined,
        duration: input.duration !== undefined ? input.duration : undefined,
      },
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

    await prisma.learningUnit.delete({
      where: { id: unitId },
    });
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
    const count = await prisma.learningUnit.count({
      where: {
        moduleId,
        id: { in: unitIds },
      },
    });
    if (count !== unitIds.length) {
      throw AppError.badRequest("Invalid learning unit IDs in reordering request.");
    }

    // 2. Perform updates in a transaction
    await prisma.$transaction(
      unitIds.map((id, index) =>
        prisma.learningUnit.update({
          where: { id },
          data: { sequence: index + 1 },
        })
      )
    );

    return prisma.learningUnit.findMany({
      where: { moduleId },
      orderBy: { sequence: "asc" },
    });
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

    const media = await prisma.media.findUnique({ where: { id: input.mediaId } });
    if (!media) {
      throw AppError.badRequest("Invalid media ID reference.");
    }

    let sequence = input.sequence;
    if (sequence === undefined || sequence === 0) {
      const maxSeq = await prisma.learningResource.aggregate({
        where: { learningUnitId: unitId },
        _max: { sequence: true },
      });
      sequence = (maxSeq._max.sequence || 0) + 1;
    }

    return prisma.learningResource.create({
      data: {
        learningUnitId: unitId,
        mediaId: input.mediaId,
        title: input.title,
        sequence,
      },
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

    const resource = await prisma.learningResource.findUnique({
      where: { id: resourceId },
    });
    if (!resource || resource.learningUnitId !== unitId) {
      throw AppError.notFound("Learning resource attachment not found.");
    }

    await prisma.learningResource.delete({
      where: { id: resourceId },
    });
  }
}

export const learningUnitService = new LearningUnitService();
export default learningUnitService;
