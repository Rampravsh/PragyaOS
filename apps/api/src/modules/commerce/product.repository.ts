import { Product, Prisma, ProductType } from "@prisma/client";
import { prisma } from "../../database/client";
import { ProductRepository, RepositoryContext } from "./commerce.types";

export class PrismaProductRepository implements ProductRepository {
  private getClient(ctx?: RepositoryContext) {
    return ctx?.tx || prisma;
  }

  public async findById(id: string, ctx?: RepositoryContext): Promise<Product | null> {
    return this.getClient(ctx).product.findUnique({
      where: { id },
      include: { prices: true },
    }) as Promise<Product | null>;
  }

  public async findBySku(sku: string, ctx?: RepositoryContext): Promise<Product | null> {
    return this.getClient(ctx).product.findUnique({
      where: { sku },
      include: { prices: true },
    }) as Promise<Product | null>;
  }

  public async findBySellable(
    sellableId: string,
    sellableType: ProductType,
    ctx?: RepositoryContext
  ): Promise<Product | null> {
    return this.getClient(ctx).product.findFirst({
      where: { sellableId, sellableType },
      include: { prices: true },
    }) as Promise<Product | null>;
  }

  public async create(data: Prisma.ProductCreateInput, ctx?: RepositoryContext): Promise<Product> {
    return this.getClient(ctx).product.create({ data }) as Promise<Product>;
  }

  public async update(
    id: string,
    data: Prisma.ProductUpdateInput,
    ctx?: RepositoryContext
  ): Promise<Product> {
    return this.getClient(ctx).product.update({
      where: { id },
      data,
    }) as Promise<Product>;
  }
}

export const productRepository = new PrismaProductRepository();
export default productRepository;
