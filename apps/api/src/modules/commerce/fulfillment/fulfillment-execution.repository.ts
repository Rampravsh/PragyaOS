import { FulfillmentExecution, Prisma } from "@prisma/client";
import { prisma } from "../../../database/client";
import { RepositoryContext } from "../commerce.types";

export class PrismaFulfillmentExecutionRepository {
  private getClient(ctx?: RepositoryContext) {
    return ctx?.tx || prisma;
  }

  public async findById(id: string, ctx?: RepositoryContext): Promise<FulfillmentExecution | null> {
    return this.getClient(ctx).fulfillmentExecution.findUnique({
      where: { id },
    }) as Promise<FulfillmentExecution | null>;
  }

  public async findByOrderId(orderId: string, ctx?: RepositoryContext): Promise<FulfillmentExecution | null> {
    return this.getClient(ctx).fulfillmentExecution.findFirst({
      where: { orderId },
    }) as Promise<FulfillmentExecution | null>;
  }

  public async create(
    data: Prisma.FulfillmentExecutionUncheckedCreateInput,
    ctx?: RepositoryContext
  ): Promise<FulfillmentExecution> {
    return this.getClient(ctx).fulfillmentExecution.create({ data }) as Promise<FulfillmentExecution>;
  }

  public async update(
    id: string,
    data: Prisma.FulfillmentExecutionUpdateInput,
    ctx?: RepositoryContext
  ): Promise<FulfillmentExecution> {
    return this.getClient(ctx).fulfillmentExecution.update({
      where: { id },
      data,
    }) as Promise<FulfillmentExecution>;
  }
}

export const fulfillmentExecutionRepository = new PrismaFulfillmentExecutionRepository();
export default fulfillmentExecutionRepository;
