import { ProductPrice, Prisma } from "@prisma/client";
import { prisma } from "../../database/client";
import { ProductPriceRepository, RepositoryContext } from "./commerce.types";

export class PrismaProductPriceRepository implements ProductPriceRepository {
  private getClient(ctx?: RepositoryContext) {
    return ctx?.tx || prisma;
  }

  public async findById(id: string, ctx?: RepositoryContext): Promise<ProductPrice | null> {
    return this.getClient(ctx).productPrice.findUnique({
      where: { id },
    }) as Promise<ProductPrice | null>;
  }

  public async findActivePricesByProductId(
    productId: string,
    ctx?: RepositoryContext
  ): Promise<ProductPrice[]> {
    return this.getClient(ctx).productPrice.findMany({
      where: {
        productId,
        active: true,
        effectiveFrom: { lte: new Date() },
        OR: [{ effectiveTo: null }, { effectiveTo: { gte: new Date() } }],
      },
    }) as Promise<ProductPrice[]>;
  }

  public async create(
    data: Prisma.ProductPriceUncheckedCreateInput,
    ctx?: RepositoryContext
  ): Promise<ProductPrice> {
    return this.getClient(ctx).productPrice.create({ data }) as Promise<ProductPrice>;
  }

  public async update(
    id: string,
    data: Prisma.ProductPriceUpdateInput,
    ctx?: RepositoryContext
  ): Promise<ProductPrice> {
    return this.getClient(ctx).productPrice.update({
      where: { id },
      data,
    }) as Promise<ProductPrice>;
  }
}

export const productPriceRepository = new PrismaProductPriceRepository();
export default productPriceRepository;
