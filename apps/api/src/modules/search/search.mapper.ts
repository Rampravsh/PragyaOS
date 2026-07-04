import { Course, Category, User } from "@prisma/client";
import { SearchDocument } from "./search.types";

export class SearchMapper {
  public static courseToDocument(
    course: any, // Accepts populated course
    versionOffset = 0
  ): SearchDocument {
    const updatedAtDate = course.updatedAt instanceof Date ? course.updatedAt : new Date(course.updatedAt || Date.now());
    return {
      id: course.id,
      entityType: "courses",
      version: updatedAtDate.getTime() + versionOffset,
      updatedAt: updatedAtDate.toISOString(),
      title: course.title,
      subtitle: course.subtitle || "",
      description: course.description || "",
      slug: course.slug,
      difficulty: course.difficulty,
      language: course.language,
      status: course.status,
      createdAt: (course.createdAt instanceof Date ? course.createdAt : new Date(course.createdAt || Date.now())).toISOString(),
      category: course.category
        ? {
            id: course.category.id,
            name: course.category.name,
            slug: course.category.slug,
          }
        : undefined,
      instructors: Array.isArray(course.instructors)
        ? course.instructors.map((ci: any) => ({
            id: ci.user?.id || ci.userId,
            name: ci.user?.name || "",
          }))
        : [],
      tags: Array.isArray(course.tags)
        ? course.tags.map((ct: any) => ({
            id: ct.tag?.id || ct.tagId,
            name: ct.tag?.name || "",
            slug: ct.tag?.slug || "",
          }))
        : [],
    };
  }

  public static categoryToDocument(category: any, versionOffset = 0): SearchDocument {
    const updatedAtDate = category.updatedAt instanceof Date ? category.updatedAt : new Date(category.updatedAt || Date.now());
    return {
      id: category.id,
      entityType: "categories",
      version: updatedAtDate.getTime() + versionOffset,
      updatedAt: updatedAtDate.toISOString(),
      name: category.name,
      slug: category.slug,
      description: category.description || "",
    };
  }

  public static instructorToDocument(user: any, versionOffset = 0): SearchDocument {
    const updatedAtDate = user.updatedAt instanceof Date ? user.updatedAt : new Date(user.updatedAt || Date.now());
    return {
      id: user.id,
      entityType: "instructors",
      version: updatedAtDate.getTime() + versionOffset,
      updatedAt: updatedAtDate.toISOString(),
      name: user.name,
      bio: user.bio || "",
      roles: user.roles || [],
    };
  }

  public static tagToDocument(tag: any, versionOffset = 0): SearchDocument {
    const updatedAtDate = tag.updatedAt instanceof Date ? tag.updatedAt : new Date(tag.updatedAt || Date.now());
    return {
      id: tag.id,
      entityType: "tags",
      version: updatedAtDate.getTime() + versionOffset,
      updatedAt: updatedAtDate.toISOString(),
      name: tag.name,
      slug: tag.slug,
    };
  }
}
export default SearchMapper;
