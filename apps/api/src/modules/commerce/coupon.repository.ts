import { Coupon, Prisma } from "@prisma/client";
import { prisma } from "../../database/client";
import { CouponRepository, RepositoryContext } from "./commerce.types";

export class PrismaCouponRepository implements CouponRepository {
  private getClient(ctx?: RepositoryContext) {
    return ctx?.tx || prisma;
  }

  public async findById(id: string, ctx?: RepositoryContext): Promise<Coupon | null> {
    return this.getClient(ctx).coupon.findUnique({
      where: { id },
    }) as Promise<Coupon | null>;
  }

  public async findByCode(code: string, ctx?: RepositoryContext): Promise<Coupon | null> {
    return this.getClient(ctx).coupon.findUnique({
      where: { code: code.toUpperCase() },
    }) as Promise<Coupon | null>;
  }

  public async incrementRedemptions(id: string, ctx?: RepositoryContext): Promise<Coupon> {
    return this.getClient(ctx).coupon.update({
      where: { id },
      data: {
        redemptionsCount: { increment: 1 },
      },
    }) as Promise<Coupon>;
  }

  public async create(data: Prisma.CouponCreateInput, ctx?: RepositoryContext): Promise<Coupon> {
    const formattedData = {
      ...data,
      code: data.code.toUpperCase(),
    };
    return this.getClient(ctx).coupon.create({ data: formattedData }) as Promise<Coupon>;
  }

  public async update(
    id: string,
    data: Prisma.CouponUpdateInput,
    ctx?: RepositoryContext
  ): Promise<Coupon> {
    const formattedData = {
      ...data,
      ...(data.code && { code: (data.code as string).toUpperCase() }),
    };
    return this.getClient(ctx).coupon.update({
      where: { id },
      data: formattedData,
    }) as Promise<Coupon>;
  }
}

export const couponRepository = new PrismaCouponRepository();
export default couponRepository;
