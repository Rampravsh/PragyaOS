import { Course, Prisma } from "@prisma/client";
import { prisma } from "../../database/client";
import { CourseQueryFilters } from "./course.types";

export class CourseRepository {
  /**
   * Resolves a course by ID, including nested instructors, tags, objectives, and requirements.
   */
  public async findById(id: string): Promise<any | null> {
    return prisma.course.findUnique({
      where: { id },
      include: {
        instructors: {
          include: { user: true },
        },
        requirements: { orderBy: { sequence: "asc" } },
        objectives: { orderBy: { sequence: "asc" } },
        tags: {
          include: { tag: true },
        },
      },
    });
  }

  /**
   * Resolves a course by slug.
   */
  public async findBySlug(slug: string): Promise<any | null> {
    return prisma.course.findUnique({
      where: { slug },
      include: {
        instructors: {
          include: { user: true },
        },
        requirements: { orderBy: { sequence: "asc" } },
        objectives: { orderBy: { sequence: "asc" } },
        tags: {
          include: { tag: true },
        },
      },
    });
  }

  /**
   * Lists courses matching search queries and category tags, with pagination.
   */
  public async findManyAndCount(
    filters: CourseQueryFilters
  ): Promise<{ courses: any[]; total: number }> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.CourseWhereInput = {
      ...(filters.status && { status: filters.status }),
      ...(filters.visibility && { visibility: filters.visibility }),
      ...(filters.featured !== undefined && { featured: filters.featured }),
      ...(filters.language && { language: filters.language }),
      ...(filters.difficulty && { difficulty: filters.difficulty }),
      ...(filters.categoryId && { categoryId: filters.categoryId }),
      // Text Search
      ...(filters.search && {
        OR: [
          { title: { contains: filters.search, mode: "insensitive" } },
          { subtitle: { contains: filters.search, mode: "insensitive" } },
          { description: { contains: filters.search, mode: "insensitive" } },
        ],
      }),
      // Tag Filter
      ...(filters.tag && {
        tags: {
          some: {
            tag: {
              name: { equals: filters.tag, mode: "insensitive" },
            },
          },
        },
      }),
    };

    const sortBy = filters.sortBy || "createdAt";
    const sortOrder = filters.sortOrder || "desc";

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          instructors: {
            include: { user: true },
          },
          requirements: { orderBy: { sequence: "asc" } },
          objectives: { orderBy: { sequence: "asc" } },
          tags: {
            include: { tag: true },
          },
        },
      }),
      prisma.course.count({ where }),
    ]);

    return { courses, total };
  }

  /**
   * Creates a Course aggregate.
   */
  public async create(data: Prisma.CourseCreateInput): Promise<any> {
    return prisma.course.create({
      data: data as any,
      include: {
        instructors: {
          include: { user: true },
        },
        requirements: true,
        objectives: true,
        tags: {
          include: { tag: true },
        },
      },
    });
  }

  /**
   * Updates Course details.
   */
  public async update(id: string, data: Prisma.CourseUpdateInput): Promise<any> {
    return prisma.course.update({
      where: { id },
      data,
      include: {
        instructors: {
          include: { user: true },
        },
        requirements: { orderBy: { sequence: "asc" } },
        objectives: { orderBy: { sequence: "asc" } },
        tags: {
          include: { tag: true },
        },
      },
    });
  }

  /**
   * Hard or soft deletes a course.
   */
  public async delete(id: string): Promise<void> {
    await prisma.course.delete({
      where: { id },
    });
  }

  /**
   * Upserts a tag record by name.
   */
  public async upsertTag(name: string): Promise<any> {
    return prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  public async deleteCourseTags(courseId: string): Promise<void> {
    await prisma.courseTag.deleteMany({
      where: { courseId },
    });
  }

  public async deleteCourseRequirements(courseId: string): Promise<void> {
    await prisma.courseRequirement.deleteMany({
      where: { courseId },
    });
  }

  public async deleteCourseObjectives(courseId: string): Promise<void> {
    await prisma.courseObjective.deleteMany({
      where: { courseId },
    });
  }

  public async deleteCourseInstructors(courseId: string): Promise<void> {
    await prisma.courseInstructor.deleteMany({
      where: { courseId },
    });
  }

  /**
   * Fetches the complete aggregated course structure for publishing pipeline evaluation.
   */
  public async findFullCourseDetails(courseId: string): Promise<any | null> {
    return prisma.course.findUnique({
      where: { id: courseId },
      include: {
        category: true,
        thumbnail: true,
        trailer: true,
        modules: {
          orderBy: { sequence: "asc" },
          include: {
            learningUnits: {
              orderBy: { sequence: "asc" },
              include: { media: true },
            },
          },
        },
        instructors: true,
        requirements: { orderBy: { sequence: "asc" } },
        objectives: { orderBy: { sequence: "asc" } },
        faqs: { orderBy: { sequence: "asc" } },
      },
    });
  }

  /**
   * Fetches all courses co-authored by an instructor.
   */
  public async findManyByInstructorId(instructorId: string): Promise<any[]> {
    return prisma.course.findMany({
      where: {
        instructors: { some: { userId: instructorId } },
      },
      include: {
        modules: { include: { learningUnits: { include: { media: true } } } },
        thumbnail: true,
        trailer: true,
      },
      orderBy: { updatedAt: "desc" },
    });
  }
}

export const courseRepository = new CourseRepository();
export default courseRepository;
export { Prisma };
