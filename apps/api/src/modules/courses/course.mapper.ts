import { Course, CourseRequirement, CourseObjective, CourseFAQ, CourseTag, Tag, CourseInstructor, User } from "@prisma/client";
import { CourseResponse } from "./course.types";

type CourseDbModel = Course & {
  instructors: (CourseInstructor & { user: User })[];
  requirements: CourseRequirement[];
  objectives: CourseObjective[];
  tags: (CourseTag & { tag: Tag })[];
};

export class CourseMapper {
  /**
   * Serializes a Course aggregate model into a CourseResponse DTO.
   */
  public static toResponseDTO(course: CourseDbModel): CourseResponse {
    return {
      id: course.id,
      categoryId: course.categoryId,
      slug: course.slug,
      title: course.title,
      subtitle: course.subtitle,
      description: course.description,
      language: course.language,
      difficulty: course.difficulty,
      estimatedDuration: course.estimatedDuration,
      thumbnailUrl: null, // Resolves in storage layers
      trailerUrl: null,   // Resolves in storage layers
      seoMetadata: course.seoMetadata || {},
      status: course.status,
      visibility: course.visibility,
      featured: course.featured,
      publishedAt: course.publishedAt,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      instructors: course.instructors.map((ci) => ({
        userId: ci.userId,
        user: {
          id: ci.user.id,
          email: ci.user.email,
          firstName: ci.user.firstName,
          lastName: ci.user.lastName,
        },
      })),
      requirements: course.requirements.map((req) => ({ description: req.description })),
      objectives: course.objectives.map((obj) => ({ description: obj.description })),
      tags: course.tags.map((ct) => ct.tag.name),
    };
  }

  /**
   * Serializes multiple Course records.
   */
  public static toResponseDTOs(courses: CourseDbModel[]): CourseResponse[] {
    return courses.map((c) => this.toResponseDTO(c));
  }
}
export default CourseMapper;
