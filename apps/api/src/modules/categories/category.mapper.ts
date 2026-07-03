import { Category } from "@prisma/client";
import { CategoryResponse, CategoryTreeNode } from "./category.types";

export class CategoryMapper {
  /**
   * Maps a raw Category db model to a CategoryResponse DTO.
   */
  public static toResponseDTO(
    category: Category & { _count?: { courses: number } }
  ): CategoryResponse {
    return {
      id: category.id,
      parentId: category.parentId,
      name: category.name,
      slug: category.slug,
      description: category.description,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      _count: category._count ? { courses: category._count.courses } : undefined,
    };
  }

  /**
   * Maps multiple raw Category db models.
   */
  public static toResponseDTOs(
    categories: (Category & { _count?: { courses: number } })[]
  ): CategoryResponse[] {
    return categories.map((c) => this.toResponseDTO(c));
  }

  /**
   * Recursively builds a nested CategoryTreeNode tree from a flat list of categories.
   */
  public static toTreeDTOs(
    categories: (Category & { _count?: { courses: number } })[]
  ): CategoryTreeNode[] {
    const map = new Map<string, CategoryTreeNode>();
    const roots: CategoryTreeNode[] = [];

    // First pass: create nodes for all items
    categories.forEach((cat) => {
      map.set(cat.id, {
        ...this.toResponseDTO(cat),
        children: [],
      });
    });

    // Second pass: link child nodes to parents or push to root array
    categories.forEach((cat) => {
      const node = map.get(cat.id)!;
      if (cat.parentId && map.has(cat.parentId)) {
        const parent = map.get(cat.parentId)!;
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  }
}
export default CategoryMapper;
