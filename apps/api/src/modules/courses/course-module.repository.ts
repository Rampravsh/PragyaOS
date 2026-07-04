import { CourseModule, Prisma } from "@prisma/client";
import { prisma } from "../../database/client";

export class CourseModuleRepository {
  public async findById(id: string): Promise<CourseModule | null> {
    return prisma.courseModule.findUnique({
      where: { id },
    });
  }

  public async findManyByCourseId(courseId: string): Promise<CourseModule[]> {
    return prisma.courseModule.findMany({
      where: { courseId },
      orderBy: { sequence: "asc" },
    });
  }

  public async create(data: Prisma.CourseModuleUncheckedCreateInput): Promise<CourseModule> {
    return prisma.courseModule.create({
      data,
    });
  }

  public async update(id: string, data: Prisma.CourseModuleUpdateInput): Promise<CourseModule> {
    return prisma.courseModule.update({
      where: { id },
      data,
    });
  }

  public async delete(id: string): Promise<CourseModule> {
    return prisma.courseModule.delete({
      where: { id },
    });
  }

  public async countByCourseAndIds(courseId: string, ids: string[]): Promise<number> {
    return prisma.courseModule.count({
      where: {
        courseId,
        id: { in: ids },
      },
    });
  }

  public async getMaxSequence(courseId: string): Promise<number> {
    const result = await prisma.courseModule.aggregate({
      where: { courseId },
      _max: { sequence: true },
    });
    return result._max.sequence || 0;
  }
}

export const courseModuleRepository = new CourseModuleRepository();
export default courseModuleRepository;
