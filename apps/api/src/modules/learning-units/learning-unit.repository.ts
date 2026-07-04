import { LearningUnit, LearningResource, Prisma } from "@prisma/client";
import { prisma } from "../../database/client";

export class LearningUnitRepository {
  public async findById(id: string): Promise<LearningUnit | null> {
    return prisma.learningUnit.findUnique({
      where: { id },
    });
  }

  public async findByIdWithResources(id: string): Promise<(LearningUnit & { resources: LearningResource[] }) | null> {
    return prisma.learningUnit.findUnique({
      where: { id },
      include: { resources: true },
    }) as any;
  }

  public async create(data: Prisma.LearningUnitUncheckedCreateInput): Promise<LearningUnit> {
    return prisma.learningUnit.create({
      data,
    });
  }

  public async update(id: string, data: Prisma.LearningUnitUpdateInput | Prisma.LearningUnitUncheckedUpdateInput): Promise<LearningUnit> {
    return prisma.learningUnit.update({
      where: { id },
      data: data as any,
    });
  }

  public async delete(id: string): Promise<LearningUnit> {
    return prisma.learningUnit.delete({
      where: { id },
    });
  }

  public async countByModuleAndIds(moduleId: string, ids: string[]): Promise<number> {
    return prisma.learningUnit.count({
      where: {
        moduleId,
        id: { in: ids },
      },
    });
  }

  public async getMaxSequence(moduleId: string): Promise<number> {
    const result = await prisma.learningUnit.aggregate({
      where: { moduleId },
      _max: { sequence: true },
    });
    return result._max.sequence || 0;
  }

  public async findManyByModuleId(moduleId: string): Promise<LearningUnit[]> {
    return prisma.learningUnit.findMany({
      where: { moduleId },
      orderBy: { sequence: "asc" },
    });
  }

  // --- Supporting Resources Actions ---

  public async findResourceById(id: string): Promise<LearningResource | null> {
    return prisma.learningResource.findUnique({
      where: { id },
    });
  }

  public async createResource(data: Prisma.LearningResourceUncheckedCreateInput): Promise<LearningResource> {
    return prisma.learningResource.create({
      data,
    });
  }

  public async deleteResource(id: string): Promise<LearningResource> {
    return prisma.learningResource.delete({
      where: { id },
    });
  }

  public async getMaxResourceSequence(learningUnitId: string): Promise<number> {
    const result = await prisma.learningResource.aggregate({
      where: { learningUnitId },
      _max: { sequence: true },
    });
    return result._max.sequence || 0;
  }

  /**
   * Fetches all learning units associated with a course, ordered sequentially.
   */
  public async findManyByCourseId(courseId: string): Promise<LearningUnit[]> {
    return prisma.learningUnit.findMany({
      where: {
        module: { courseId },
      },
      orderBy: [
        { module: { sequence: "asc" } },
        { sequence: "asc" },
      ],
    });
  }

  /**
   * Calculates total duration of all learning units associated with a course in minutes.
   */
  public async getSumDurationByCourseId(courseId: string): Promise<number> {
    const result = await prisma.learningUnit.aggregate({
      where: {
        module: { courseId },
      },
      _sum: {
        duration: true,
      },
    });
    return result._sum.duration || 0;
  }
}

export const learningUnitRepository = new LearningUnitRepository();
export default learningUnitRepository;
