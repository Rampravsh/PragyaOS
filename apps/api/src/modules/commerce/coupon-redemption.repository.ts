import { CouponRedemption, Prisma } from "@prisma/client";
import { prisma } from "../../database/client";
import { CouponRedemptionRepository, RepositoryContext } from "./commerce.types";

export class PrismaCouponRedemptionRepository implements CouponRedemptionRepository {
  private getClient(ctx?: RepositoryContext) {
    return ctx?.tx || prisma;
  }

  /**
   * Counts existing redemptions for a specific user and coupon code.
   */
  public async countUserRedemptions(
    couponId: string,
    userId: string,
    ctx?: RepositoryContext
  ): Promise<number> {
    return this.getClient(ctx).couponRedemption.count({
      where: { couponId, userId },
    });
  }

  /**
   * Creates a coupon redemption entry.
   */
  public async create(
    data: Prisma.CouponRedemptionUncheckedCreateInput,
    ctx?: RepositoryContext
  ): Promise<CouponRedemption> {
    return this.getClient(ctx).couponRedemption.create({ data }) as Promise<CouponRedemption>;
  }
}

export const couponRedemptionRepository = new PrismaCouponRedemptionRepository();
export default couponRedemptionRepository;
