import { CourseModule } from "@prisma/client";
import { prisma } from "../../database/client";
import { AppError } from "../../common/errors/appError";
import { courseService } from "./course.service";
import { CreateModuleInput, UpdateModuleInput } from "./course.schemas";

export class CourseModuleService {
  /**
   * Resolves a module and confirms it belongs to the specified course.
   */
  public async getModule(courseId: string, moduleId: string): Promise<CourseModule> {
    const module = await prisma.courseModule.findUnique({
      where: { id: moduleId },
    });
    if (!module || module.courseId !== courseId) {
      throw AppError.notFound("Course module not found.");
    }
    return module;
  }

  /**
   * Creates a Module, auto-calculating next sequence index.
   */
  public async createModule(
    courseId: string,
    input: CreateModuleInput,
    userContext: { id: string; roles: string[]; permissions: string[] }
  ): Promise<CourseModule> {
    await courseService.validateOwnership(courseId, userContext);

    // Auto-calculate sequence if not supplied
    let sequence = input.sequence;
    if (sequence === undefined || sequence === 0) {
      const maxSeq = await prisma.courseModule.aggregate({
        where: { courseId },
        _max: { sequence: true },
      });
      sequence = (maxSeq._max.sequence || 0) + 1;
    }

    return prisma.courseModule.create({
      data: {
        courseId,
        title: input.title,
        description: input.description || null,
        sequence,
      },
    });
  }

  /**
   * Renames/Updates Module details.
   */
  public async updateModule(
    courseId: string,
    moduleId: string,
    input: UpdateModuleInput,
    userContext: { id: string; roles: string[]; permissions: string[] }
  ): Promise<CourseModule> {
    await courseService.validateOwnership(courseId, userContext);
    await this.getModule(courseId, moduleId);

    return prisma.courseModule.update({
      where: { id: moduleId },
      data: {
        title: input.title,
        description: input.description !== undefined ? input.description : undefined,
        sequence: input.sequence !== undefined ? input.sequence : undefined,
      },
    });
  }

  /**
   * Deletes a CourseModule and cascades.
   */
  public async deleteModule(
    courseId: string,
    moduleId: string,
    userContext: { id: string; roles: string[]; permissions: string[] }
  ): Promise<void> {
    await courseService.validateOwnership(courseId, userContext);
    await this.getModule(courseId, moduleId);

    await prisma.courseModule.delete({
      where: { id: moduleId },
    });
  }

  /**
   * Reorders multiple modules inside a transaction block to preserve sequence constraints.
   */
  public async reorderModules(
    courseId: string,
    moduleIds: string[],
    userContext: { id: string; roles: string[]; permissions: string[] }
  ): Promise<CourseModule[]> {
    await courseService.validateOwnership(courseId, userContext);

    // 1. Validate that all moduleIds belong to this course
    const count = await prisma.courseModule.count({
      where: {
        courseId,
        id: { in: moduleIds },
      },
    });
    if (count !== moduleIds.length) {
      throw AppError.badRequest("Invalid module IDs in reordering request.");
    }

    // 2. Perform updates inside a transaction block
    await prisma.$transaction(
      moduleIds.map((id, index) =>
        prisma.courseModule.update({
          where: { id },
          data: { sequence: index + 1 },
        })
      )
    );

    return prisma.courseModule.findMany({
      where: { courseId },
      orderBy: { sequence: "asc" },
    });
  }
}

export const courseModuleService = new CourseModuleService();
export default courseModuleService;
