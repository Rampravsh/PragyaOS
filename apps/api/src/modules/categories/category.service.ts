import { Category } from "@prisma/client";
import { categoryRepository, CategoryRepository } from "./category.repository";
import { CreateCategoryInput, UpdateCategoryInput } from "./category.schemas";
import { AppError } from "../../common/errors/appError";
import { slugify } from "../../utils/slugify";

export class CategoryService {
  constructor(private readonly repository: CategoryRepository = categoryRepository) {}

  /**
   * Resolves a category by ID or raises NotFound.
   */
  public async getCategory(id: string): Promise<Category> {
    const category = await this.repository.findById(id);
    if (!category) {
      throw AppError.notFound("Category not found.");
    }
    return category;
  }

  /**
   * Fetches nested recursive category trees.
   */
  public async getCategoryTree(): Promise<(Category & { _count: { courses: number } })[]> {
    return this.repository.findAll();
  }

  /**
   * Creates a new Category, enforcing hierarchy rules and auto-slugifying.
   */
  public async createCategory(input: CreateCategoryInput): Promise<Category> {
    // 1. Verify parent exists if parentId is supplied
    if (input.parentId) {
      await this.getCategory(input.parentId);
    }

    // 2. Resolve name uniqueness under same level
    const existingName = await this.repository.findByNameAndParent(input.name, input.parentId || null);
    if (existingName) {
      throw AppError.conflict("A category with this name already exists at this level.");
    }

    // 3. Resolve slug
    const rawSlug = input.slug || slugify(input.name);
    const existingSlug = await this.repository.findBySlug(rawSlug);
    if (existingSlug) {
      throw AppError.conflict(`Category slug "${rawSlug}" is already in use.`);
    }

    return this.repository.create({
      name: input.name,
      slug: rawSlug,
      description: input.description || null,
      parent: input.parentId ? { connect: { id: input.parentId } } : undefined,
    });
  }

  /**
   * Updates category details. Prevent category mapping to itself as parent.
   */
  public async updateCategory(id: string, input: UpdateCategoryInput): Promise<Category> {
    const category = await this.getCategory(id);

    // Prevent cycle connection
    if (input.parentId && input.parentId === id) {
      throw AppError.badRequest("A category cannot be its own parent.");
    }

    if (input.parentId) {
      await this.getCategory(input.parentId);
    }

    // Resolve name uniqueness under same level
    if (input.name) {
      const parentToCheck = input.parentId !== undefined ? input.parentId : category.parentId;
      const existingName = await this.repository.findByNameAndParent(input.name, parentToCheck);
      if (existingName && existingName.id !== id) {
        throw AppError.conflict("A category with this name already exists at this level.");
      }
    }

    // Resolve slug updates
    let finalSlug = category.slug;
    if (input.slug) {
      const existingSlug = await this.repository.findBySlug(input.slug);
      if (existingSlug && existingSlug.id !== id) {
        throw AppError.conflict(`Category slug "${input.slug}" is already in use.`);
      }
      finalSlug = input.slug;
    } else if (input.name) {
      // Auto-slugify changed name
      const generated = slugify(input.name);
      const existingSlug = await this.repository.findBySlug(generated);
      if (!existingSlug || existingSlug.id === id) {
        finalSlug = generated;
      }
    }

    return this.repository.update(id, {
      name: input.name,
      slug: finalSlug,
      description: input.description !== undefined ? input.description : undefined,
      parent: input.parentId
        ? { connect: { id: input.parentId } }
        : input.parentId === null
        ? { disconnect: true }
        : undefined,
    });
  }

  /**
   * Deletes a category, enforcing Restrict deletion rules for nested items.
   */
  public async deleteCategory(id: string): Promise<void> {
    await this.getCategory(id);

    // 1. Block if it has children
    const childCount = await this.repository.countChildren(id);
    if (childCount > 0) {
      throw AppError.badRequest("Cannot delete category containing nested sub-categories.");
    }

    // 2. Block if courses are actively mapped
    const courseCount = await this.repository.countCourses(id);
    if (courseCount > 0) {
      throw AppError.badRequest("Cannot delete category linked to active courses.");
    }

    await this.repository.delete(id);
  }
}

export const categoryService = new CategoryService();
export default categoryService;
