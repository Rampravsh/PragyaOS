import { Request, Response } from "express";
import { searchService, SearchService } from "./search.service";
import { validate } from "../../common/dto/base.dto";
import { SuccessResponse } from "../../common/responses/successResponse";
import {
  searchQuerySchema,
  autocompleteSchema,
  reindexEntitySchema,
} from "./search.schemas";

export class SearchController {
  constructor(private readonly service: SearchService = searchService) {}

  /**
   * GET /search — Execute full-text query
   */
  public search = async (req: Request, res: Response): Promise<void> => {
    const raw = validate(searchQuerySchema, req.query);
    const query = {
      q: raw.q ?? "",
      page: raw.page ?? 1,
      limit: raw.limit ?? 20,
      category: raw.category,
      difficulty: raw.difficulty,
      language: raw.language,
      tags: raw.tags,
      sort: raw.sort ?? "relevance",
    };
    const result = await this.service.search(query);
    SuccessResponse.send(res, result, "Search results retrieved successfully.");
  };

  /**
   * GET /search/suggestions — Get query suggestions
   */
  public autocomplete = async (req: Request, res: Response): Promise<void> => {
    const raw = validate(autocompleteSchema, req.query);
    const query = {
      q: raw.q,
      limit: raw.limit ?? 5,
      index: raw.index ?? "courses",
    };
    const suggestions = await this.service.autocomplete(query);
    SuccessResponse.send(res, suggestions, "Suggestions retrieved successfully.");
  };

  /**
   * GET /search/popular — Return list of popular searches
   */
  public getPopular = async (req: Request, res: Response): Promise<void> => {
    // Return empty popular list (analytics placeholder)
    SuccessResponse.send(res, [], "Popular search queries retrieved successfully.");
  };

  /**
   * GET /search/health — Health check (Admin only)
   */
  public health = async (req: Request, res: Response): Promise<void> => {
    const healthInfo = await this.service.health();
    SuccessResponse.send(res, healthInfo, "Search status retrieved successfully.");
  };

  /**
   * POST /search/reindex — Reindex a specific entity
   */
  public reindexEntity = async (req: Request, res: Response): Promise<void> => {
    const input = validate(reindexEntitySchema, req.body);
    await this.service.reindexEntity(input);
    SuccessResponse.send(res, null, `Manual reindexing enqueued for ${input.entityType}:${input.entityId}.`);
  };

  /**
   * POST /search/reindex/all — Trigger complete index rebuilding
   */
  public reindexAll = async (req: Request, res: Response): Promise<void> => {
    const result = await this.service.reindexAll();
    SuccessResponse.send(res, result, `Full indexing enqueued. Total tasks: ${result.enqueued}.`);
  };
}

export const searchController = new SearchController();
export default searchController;
