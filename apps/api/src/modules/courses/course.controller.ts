import { Request, Response } from "express";
import { courseService, CourseService } from "./course.service";
import { CourseMapper } from "./course.mapper";
import { createCourseSchema, updateCourseSchema, CreateCourseInput, UpdateCourseInput } from "./course.schemas";
import { validate } from "../../common/dto/base.dto";
import { CourseStatus, CourseVisibility } from "@prisma/client";

export class CourseController {
  constructor(private readonly service: CourseService = courseService) {}

  /**
   * Retrieves detail of a course by ID (checks ownership if draft).
   */
  public getCourseById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const course = await this.service.getCourse(id);

    // If course is draft or private, verify owner/admin access
    const isRestricted =
      course.status === CourseStatus.DRAFT ||
      course.status === CourseStatus.REVIEW ||
      course.visibility === CourseVisibility.PRIVATE;

    if (isRestricted) {
      if (!req.user) {
        res.status(401).json({ success: false, message: "Authentication required." });
        return;
      }
      await this.service.validateOwnership(id, req.user);
    }

    res.status(200).json({
      success: true,
      data: CourseMapper.toResponseDTO(course),
    });
  };

  /**
   * Retrieves detail of a course by slug.
   */
  public getCourseBySlug = async (req: Request, res: Response): Promise<void> => {
    const { slug } = req.params;
    const course = await this.service.getCourseBySlug(slug);

    const isRestricted =
      course.status === CourseStatus.DRAFT ||
      course.status === CourseStatus.REVIEW ||
      course.visibility === CourseVisibility.PRIVATE;

    if (isRestricted) {
      if (!req.user) {
        res.status(401).json({ success: false, message: "Authentication required." });
        return;
      }
      await this.service.validateOwnership(course.id, req.user);
    }

    res.status(200).json({
      success: true,
      data: CourseMapper.toResponseDTO(course),
    });
  };

  /**
   * Lists published courses for students, or all courses for managers.
   */
  public listCourses = async (req: Request, res: Response): Promise<void> => {
    const query = req.query;

    const page = query.page ? parseInt(query.page as string, 10) : 1;
    const limit = query.limit ? parseInt(query.limit as string, 10) : 10;
    
    // Students can only view PUBLISHED and PUBLIC courses
    const isManager =
      req.user &&
      (req.user.roles.includes("SUPER_ADMIN") ||
        req.user.roles.includes("ADMIN") ||
        req.user.roles.includes("INSTRUCTOR"));

    const filters = {
      page,
      limit,
      search: query.search as string,
      categoryId: query.categoryId as string,
      tag: query.tag as string,
      difficulty: query.difficulty as any,
      language: query.language as string,
      status: isManager && query.status ? (query.status as any) : CourseStatus.PUBLISHED,
      visibility: isManager && query.visibility ? (query.visibility as any) : CourseVisibility.PUBLIC,
      featured: query.featured ? query.featured === "true" : undefined,
      sortBy: query.sortBy as any,
      sortOrder: query.sortOrder as any,
    };

    const { courses, total } = await this.service.listCourses(filters);

    res.status(200).json({
      success: true,
      data: {
        courses: CourseMapper.toResponseDTOs(courses),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  };

  /**
   * Creates a Course (Instructor/Admin restricted).
   */
  public createCourse = async (req: Request, res: Response): Promise<void> => {
    const input = validate(createCourseSchema as any, req.body) as CreateCourseInput;
    const userId = req.user!.id;

    const course = await this.service.createCourse(input, userId);
    res.status(201).json({
      success: true,
      message: "Course created successfully as draft.",
      data: CourseMapper.toResponseDTO(course),
    });
  };

  /**
   * Updates an existing Course (requires ownership).
   */
  public updateCourse = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const input = validate(updateCourseSchema as any, req.body) as UpdateCourseInput;
    const userContext = req.user!;

    const course = await this.service.updateCourse(id, input, userContext);
    res.status(200).json({
      success: true,
      message: "Course updated successfully.",
      data: CourseMapper.toResponseDTO(course),
    });
  };

  /**
   * Archives a Course (soft delete).
   */
  public archiveCourse = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const userContext = req.user!;

    await this.service.archiveCourse(id, userContext);
    res.status(200).json({
      success: true,
      message: "Course archived successfully.",
    });
  };
}

export const courseController = new CourseController();
export default courseController;
