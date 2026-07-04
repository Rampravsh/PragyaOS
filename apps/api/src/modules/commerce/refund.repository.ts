import { Refund, Prisma } from "@prisma/client";
import { prisma } from "../../database/client";
import { RefundRepository, RepositoryContext } from "./commerce.types";

export class PrismaRefundRepository implements RefundRepository {
  private getClient(ctx?: RepositoryContext) {
    return ctx?.tx || prisma;
  }

  public async findById(id: string, ctx?: RepositoryContext): Promise<Refund | null> {
    return this.getClient(ctx).refund.findUnique({
      where: { id },
    }) as Promise<Refund | null>;
  }

  public async findByGatewayRefundId(
    gatewayRefundId: string,
    ctx?: RepositoryContext
  ): Promise<Refund | null> {
    return this.getClient(ctx).refund.findUnique({
      where: { gatewayRefundId },
    }) as Promise<Refund | null>;
  }

  public async create(
    data: Prisma.RefundUncheckedCreateInput,
    ctx?: RepositoryContext
  ): Promise<Refund> {
    return this.getClient(ctx).refund.create({ data }) as Promise<Refund>;
  }
}

export const refundRepository = new PrismaRefundRepository();
export default refundRepository;
