import { BaseRepository } from "../repositories/base.repository";
import { QueryParams } from "../interfaces/query.interface";
import { PaginatedResult } from "../interfaces/pagination.interface";
import { AppError } from "../errors/appError";

/**
 * Abstract Base Service orchestrating business workflows and operations.
 */
export abstract class BaseService<
  TModel,
  TCreateInput,
  TUpdateInput,
  TWhereInput,
  TRepository extends BaseRepository<TModel, TCreateInput, TUpdateInput, TWhereInput, any>
> {
  protected constructor(protected readonly repository: TRepository) {}

  public async getById(id: string): Promise<TModel> {
    const record = await this.repository.findById(id);
    if (!record) {
      throw AppError.notFound("Requested resource was not found.");
    }
    return record;
  }

  public async getOne(where: TWhereInput): Promise<TModel> {
    const record = await this.repository.findOne(where);
    if (!record) {
      throw AppError.notFound("Requested resource was not found.");
    }
    return record;
  }

  public async create(data: TCreateInput): Promise<TModel> {
    return this.repository.create(data);
  }

  public async update(id: string, data: TUpdateInput): Promise<TModel> {
    // Validate record existence
    await this.getById(id);
    return this.repository.update(id, data);
  }

  public async delete(id: string): Promise<TModel> {
    // Validate record existence
    await this.getById(id);
    return this.repository.delete(id);
  }

  public async list(where?: TWhereInput): Promise<TModel[]> {
    return this.repository.findMany(where);
  }

  public async listPaginated(
    params: QueryParams,
    where?: TWhereInput
  ): Promise<PaginatedResult<TModel>> {
    return this.repository.findPaginated(params, where);
  }
}
