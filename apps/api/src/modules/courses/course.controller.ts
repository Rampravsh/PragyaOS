import { Request, Response } from "express";
import { courseService, CourseService } from "./course.service";
import { CourseMapper } from "./course.mapper";
import { createCourseSchema, updateCourseSchema, CreateCourseInput, UpdateCourseInput } from "./course.schemas";
import { validate } from "../../common/dto/base.dto";
import { CourseStatus, CourseVisibility } from "@prisma/client";
import { SuccessResponse } from "../../common/responses/successResponse";
import { AppError } from "../../common/errors/appError";

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
        throw AppError.unauthorized("Authentication required.");
      }
      await this.service.validateOwnership(id, req.user);
    }

    SuccessResponse.send(res, CourseMapper.toResponseDTO(course));
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
        throw AppError.unauthorized("Authentication required.");
      }
      await this.service.validateOwnership(course.id, req.user);
    }

    SuccessResponse.send(res, CourseMapper.toResponseDTO(course));
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

    SuccessResponse.send(res, {
      courses: CourseMapper.toResponseDTOs(courses),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
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
    SuccessResponse.created(
      res,
      CourseMapper.toResponseDTO(course),
      "Course created successfully as draft."
    );
  };

  /**
   * Updates an existing Course (requires ownership).
   */
  public updateCourse = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const input = validate(updateCourseSchema as any, req.body) as UpdateCourseInput;
    const userContext = req.user!;

    const course = await this.service.updateCourse(id, input, userContext);
    SuccessResponse.send(
      res,
      CourseMapper.toResponseDTO(course),
      "Course updated successfully."
    );
  };

  /**
   * Archives a Course (soft delete).
   */
  public archiveCourse = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const userContext = req.user!;

    await this.service.archiveCourse(id, userContext);
    SuccessResponse.send(res, null, "Course archived successfully.");
  };
}

export const courseController = new CourseController();
export default courseController;
