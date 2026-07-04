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

  public async createWithUnits(data: Prisma.CourseModuleCreateInput | Prisma.CourseModuleUncheckedCreateInput): Promise<any> {
    return prisma.courseModule.create({
      data: data as any,
      include: {
        learningUnits: true,
      },
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

  public async updateSequences(modules: { id: string }[]): Promise<void> {
    await prisma.$transaction(
      modules.map((m, index) =>
        prisma.courseModule.update({
          where: { id: m.id },
          data: { sequence: index + 1 },
        })
      )
    );
  }

  public async bulkReorderCurriculum(courseId: string, modules: any[]): Promise<void> {
    const updates: any[] = [];

    modules.forEach((mod) => {
      updates.push(
        prisma.courseModule.update({
          where: { id: mod.id, courseId },
          data: { sequence: mod.sequence },
        })
      );

      if (mod.learningUnits) {
        mod.learningUnits.forEach((unit: any) => {
          updates.push(
            prisma.learningUnit.update({
              where: { id: unit.id, module: { id: mod.id } },
              data: { sequence: unit.sequence },
            })
          );
        });
      }
    });

    await prisma.$transaction(updates);
  }
}

export const courseModuleRepository = new CourseModuleRepository();
export default courseModuleRepository;
