import { QueryParams } from "../interfaces/query.interface";
import { PaginatedResult } from "../interfaces/pagination.interface";

/**
 * Abstract Base Repository delivering standard CRUD abstractions over Prisma model delegates.
 */
export abstract class BaseRepository<
  TModel,
  TCreateInput,
  TUpdateInput,
  TWhereInput,
  TDelegate extends {
    findUnique: (args: any) => Promise<any>;
    findMany: (args: any) => Promise<any>;
    count: (args: any) => Promise<number>;
    create: (args: any) => Promise<any>;
    update: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
  }
> {
  protected constructor(protected readonly delegate: TDelegate) {}

  public async findById(id: string): Promise<TModel | null> {
    return this.delegate.findUnique({
      where: { id } as any,
    });
  }

  public async findOne(where: TWhereInput): Promise<TModel | null> {
    return this.delegate.findUnique({
      where,
    } as any);
  }

  public async create(data: TCreateInput): Promise<TModel> {
    return this.delegate.create({
      data,
    } as any);
  }

  public async update(id: string, data: TUpdateInput): Promise<TModel> {
    return this.delegate.update({
      where: { id } as any,
      data,
    } as any);
  }

  public async delete(id: string): Promise<TModel> {
    return this.delegate.delete({
      where: { id } as any,
    } as any);
  }

  public async findMany(where?: TWhereInput): Promise<TModel[]> {
    return this.delegate.findMany({
      where,
    } as any);
  }

  /**
   * Helper to perform paginated database fetches.
   */
  public async findPaginated(
    params: QueryParams,
    where?: TWhereInput
  ): Promise<PaginatedResult<TModel>> {
    const page = Math.max(1, Number(params.page || 1));
    const limit = Math.max(1, Math.min(100, Number(params.limit || 10)));
    const skip = (page - 1) * limit;

    const orderBy = params.orderBy ? { [params.orderBy as string]: params.orderDir || "asc" } : undefined;

    const [data, total] = await Promise.all([
      this.delegate.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      } as any),
      this.delegate.count({
        where,
      } as any),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }
}
