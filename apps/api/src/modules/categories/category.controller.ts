import { Request, Response } from "express";
import { categoryService, CategoryService } from "./category.service";
import { CategoryMapper } from "./category.mapper";
import { createCategorySchema, updateCategorySchema, CreateCategoryInput, UpdateCategoryInput } from "./category.schemas";
import { validate } from "../../common/dto/base.dto";
import { SuccessResponse } from "../../common/responses/successResponse";

export class CategoryController {
  constructor(private readonly service: CategoryService = categoryService) {}

  /**
   * Retrieves category list formatted as a recursive tree node hierarchy.
   */
  public getCategoriesTree = async (_req: Request, res: Response): Promise<void> => {
    const categories = await this.service.getCategoryTree();
    const tree = CategoryMapper.toTreeDTOs(categories);
    SuccessResponse.send(res, tree);
  };

  /**
   * Retrieves detail of one category by ID.
   */
  public getCategoryById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const category = await this.service.getCategory(id);
    SuccessResponse.send(res, CategoryMapper.toResponseDTO(category));
  };

  /**
   * Creates a new Category (Admin / Super Admin restricted).
   */
  public createCategory = async (req: Request, res: Response): Promise<void> => {
    const input = validate(createCategorySchema as any, req.body) as CreateCategoryInput;
    const category = await this.service.createCategory(input);
    SuccessResponse.created(
      res,
      CategoryMapper.toResponseDTO(category),
      "Category created successfully."
    );
  };

  /**
   * Updates an existing Category (Admin / Super Admin restricted).
   */
  public updateCategory = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const input = validate(updateCategorySchema as any, req.body) as UpdateCategoryInput;
    const category = await this.service.updateCategory(id, input);
    SuccessResponse.send(
      res,
      CategoryMapper.toResponseDTO(category),
      "Category updated successfully."
    );
  };

  /**
   * Deletes a category (Admin / Super Admin restricted).
   */
  public deleteCategory = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await this.service.deleteCategory(id);
    SuccessResponse.send(res, null, "Category deleted successfully.");
  };
}

export const categoryController = new CategoryController();
export default categoryController;
