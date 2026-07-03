import { Category, Prisma } from "@prisma/client";
import { prisma } from "../../database/client";

export class CategoryRepository {
  /**
   * Resolves a category by ID.
   */
  public async findById(id: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  /**
   * Resolves a category by its slug.
   */
  public async findBySlug(slug: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { slug },
    });
  }

  /**
   * Resolves parent category with name uniqueness checks.
   */
  public async findByNameAndParent(name: string, parentId: string | null): Promise<Category | null> {
    return prisma.category.findFirst({
      where: {
        name,
        parentId,
      },
    });
  }

  /**
   * Lists all categories flat, including course count relations.
   */
  public async findAll(): Promise<(Category & { _count: { courses: number } })[]> {
    return prisma.category.findMany({
      include: {
        _count: {
          select: { courses: true },
        },
      },
      orderBy: { name: "asc" },
    });
  }

  /**
   * Creates a new Category record.
   */
  public async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return prisma.category.create({
      data,
    });
  }

  /**
   * Updates an existing Category record.
   */
  public async update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category> {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  /**
   * Deletes a Category record.
   */
  public async delete(id: string): Promise<Category> {
    return prisma.category.delete({
      where: { id },
    });
  }

  /**
   * Counts children categories for safety checks.
   */
  public async countChildren(parentId: string): Promise<number> {
    return prisma.category.count({
      where: { parentId },
    });
  }

  /**
   * Counts mapped courses to enforce Restrict deletion rules.
   */
  public async countCourses(categoryId: string): Promise<number> {
    return prisma.course.count({
      where: { categoryId },
    });
  }
}

export const categoryRepository = new CategoryRepository();
export default categoryRepository;
