import { Course, CourseStatus, CourseVisibility, Prisma } from "@prisma/client";
import { courseRepository, CourseRepository } from "./course.repository";
import { CreateCourseInput, UpdateCourseInput } from "./course.schemas";
import { categoryRepository } from "../categories/category.repository";
import { AppError } from "../../common/errors/appError";
import { slugify } from "../../utils/slugify";
import { prisma } from "../../database/client";

export class CourseService {
  constructor(private readonly repository: CourseRepository = courseRepository) {}

  /**
   * Resolves a course by ID or raises NotFound.
   */
  public async getCourse(id: string): Promise<any> {
    const course = await this.repository.findById(id);
    if (!course) {
      throw AppError.notFound("Course not found.");
    }
    return course;
  }

  /**
   * Resolves a course by slug.
   */
  public async getCourseBySlug(slug: string): Promise<any> {
    const course = await this.repository.findBySlug(slug);
    if (!course) {
      throw AppError.notFound("Course not found.");
    }
    return course;
  }

  /**
   * Enforces course ownership checks.
   * Super Admins and Admins bypass validation; Instructors must be connected as Course Instructors.
   */
  public async validateOwnership(courseId: string, user: { id: string; roles: string[]; permissions: string[] }): Promise<void> {
    const isSpecialPrivileged = user.roles.includes("SUPER_ADMIN") || user.roles.includes("ADMIN");
    if (isSpecialPrivileged) return;

    const course = await this.getCourse(courseId);
    const isInstructor = course.instructors.some((inst: any) => inst.userId === user.id);
    if (!isInstructor) {
      throw AppError.forbidden("You do not own or instruct this course.");
    }
  }

  /**
   * Lists and counts courses based on search terms, difficulty, tags, and category.
   */
  public async listCourses(filters: any): Promise<{ courses: any[]; total: number }> {
    return this.repository.findManyAndCount(filters);
  }

  /**
   * Creates a Course, connecting categories, instructors, tags, and requirements.
   */
  public async createCourse(input: CreateCourseInput, userId: string): Promise<any> {
    // 1. Verify category exists
    const category = await categoryRepository.findById(input.categoryId);
    if (!category) {
      throw AppError.badRequest("Invalid category ID.");
    }

    // 2. Resolve slug
    const slug = slugify(input.title) + "-" + Math.random().toString(36).substring(2, 7);
    
    // 3. Resolve tags (upsert into Tag registry and build connection objects)
    const tagsConnect: any[] = [];
    if (input.tags && input.tags.length > 0) {
      for (const tagName of input.tags) {
        const normalized = tagName.trim().toLowerCase();
        if (normalized) {
          const tagRecord = await prisma.tag.upsert({
            where: { name: normalized },
            update: {},
            create: { name: normalized },
          });
          tagsConnect.push({
            tag: { connect: { id: tagRecord.id } },
          });
        }
      }
    }

    const courseData: Prisma.CourseCreateInput = {
      title: input.title,
      slug,
      subtitle: input.subtitle || null,
      description: input.description || null,
      language: input.language || "en",
      difficulty: input.difficulty,
      estimatedDuration: input.estimatedDuration || 0,
      seoMetadata: (input.seoMetadata as any) || null,
      visibility: input.visibility,
      status: input.status,
      category: { connect: { id: input.categoryId } },
      thumbnail: input.thumbnailId ? { connect: { id: input.thumbnailId } } : undefined,
      trailer: input.trailerId ? { connect: { id: input.trailerId } } : undefined,
      instructors: {
        create: {
          user: { connect: { id: userId } },
        },
      },
      requirements: input.requirements
        ? {
            create: input.requirements.map((desc, idx) => ({
              description: desc,
              sequence: idx,
            })),
          }
        : undefined,
      objectives: input.objectives
        ? {
            create: input.objectives.map((desc, idx) => ({
              description: desc,
              sequence: idx,
            })),
          }
        : undefined,
      tags: tagsConnect.length > 0 ? { create: tagsConnect } : undefined,
    };

    return this.repository.create(courseData);
  }

  /**
   * Updates Course attributes and relations.
   */
  public async updateCourse(
    id: string,
    input: UpdateCourseInput,
    userContext: { id: string; roles: string[]; permissions: string[] }
  ): Promise<any> {
    await this.validateOwnership(id, userContext);

    // 1. Verify category if changed
    if (input.categoryId) {
      const category = await categoryRepository.findById(input.categoryId);
      if (!category) {
        throw AppError.badRequest("Invalid category ID.");
      }
    }

    // 2. Build update parameters
    const updateData: Prisma.CourseUpdateInput = {
      ...(input.title && { title: input.title }),
      ...(input.subtitle !== undefined && { subtitle: input.subtitle }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.language && { language: input.language }),
      ...(input.difficulty && { difficulty: input.difficulty }),
      ...(input.estimatedDuration !== undefined && { estimatedDuration: input.estimatedDuration }),
      ...(input.seoMetadata !== undefined && { seoMetadata: (input.seoMetadata as any) || null }),
      ...(input.visibility && { visibility: input.visibility }),
      ...(input.status && { status: input.status }),
      ...(input.categoryId && { category: { connect: { id: input.categoryId } } }),
      ...(input.thumbnailId !== undefined && {
        thumbnail: input.thumbnailId ? { connect: { id: input.thumbnailId } } : { disconnect: true },
      }),
      ...(input.trailerId !== undefined && {
        trailer: input.trailerId ? { connect: { id: input.trailerId } } : { disconnect: true },
      }),
    };

    // If title changes, generate new slug
    if (input.title) {
      updateData.slug = slugify(input.title) + "-" + id.substring(0, 5);
    }

    // Manage tags inside transaction
    if (input.tags !== undefined) {
      // Clear old course tags
      await prisma.courseTag.deleteMany({
        where: { courseId: id },
      });

      const tagsConnect: any[] = [];
      for (const tagName of input.tags) {
        const normalized = tagName.trim().toLowerCase();
        if (normalized) {
          const tagRecord = await prisma.tag.upsert({
            where: { name: normalized },
            update: {},
            create: { name: normalized },
          });
          tagsConnect.push({
            tag: { connect: { id: tagRecord.id } },
          });
        }
      }
      if (tagsConnect.length > 0) {
        updateData.tags = { create: tagsConnect };
      }
    }

    // Manage requirements
    if (input.requirements !== undefined) {
      await prisma.courseRequirement.deleteMany({ where: { courseId: id } });
      updateData.requirements = {
        create: input.requirements.map((desc, idx) => ({
          description: desc,
          sequence: idx,
        })),
      };
    }

    // Manage objectives
    if (input.objectives !== undefined) {
      await prisma.courseObjective.deleteMany({ where: { courseId: id } });
      updateData.objectives = {
        create: input.objectives.map((desc, idx) => ({
          description: desc,
          sequence: idx,
        })),
      };
    }

    // Manage instructors connections
    if (input.instructors !== undefined) {
      // Ensure initiator remains an instructor to prevent self-lockout
      const hasSelf = input.instructors.includes(userContext.id);
      const updatedInstructors = hasSelf ? input.instructors : [...input.instructors, userContext.id];

      await prisma.courseInstructor.deleteMany({ where: { courseId: id } });
      updateData.instructors = {
        create: updatedInstructors.map((instructorId) => ({
          user: { connect: { id: instructorId } },
        })),
      };
    }

    return this.repository.update(id, updateData);
  }

  /**
   * Archives a course (soft delete strategy).
   */
  public async archiveCourse(
    id: string,
    userContext: { id: string; roles: string[]; permissions: string[] }
  ): Promise<void> {
    await this.validateOwnership(id, userContext);

    await this.repository.update(id, {
      status: CourseStatus.ARCHIVED,
      visibility: CourseVisibility.PRIVATE,
    });
  }
}

export const courseService = new CourseService();
export default courseService;
