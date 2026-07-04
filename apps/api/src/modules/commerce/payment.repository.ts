import { PaymentAttempt, Prisma } from "@prisma/client";
import { prisma } from "../../database/client";
import { PaymentRepository, RepositoryContext } from "./commerce.types";

export class PrismaPaymentRepository implements PaymentRepository {
  private getClient(ctx?: RepositoryContext) {
    return ctx?.tx || prisma;
  }

  public async findById(id: string, ctx?: RepositoryContext): Promise<PaymentAttempt | null> {
    return this.getClient(ctx).paymentAttempt.findUnique({
      where: { id },
    }) as Promise<PaymentAttempt | null>;
  }

  public async findByGatewayOrderId(
    gatewayOrderId: string,
    ctx?: RepositoryContext
  ): Promise<PaymentAttempt | null> {
    return this.getClient(ctx).paymentAttempt.findFirst({
      where: { gatewayOrderId },
    }) as Promise<PaymentAttempt | null>;
  }

  public async findByGatewayPaymentId(
    gatewayPaymentId: string,
    ctx?: RepositoryContext
  ): Promise<PaymentAttempt | null> {
    return this.getClient(ctx).paymentAttempt.findUnique({
      where: { gatewayPaymentId },
    }) as Promise<PaymentAttempt | null>;
  }

  public async create(
    data: Prisma.PaymentAttemptUncheckedCreateInput,
    ctx?: RepositoryContext
  ): Promise<PaymentAttempt> {
    return this.getClient(ctx).paymentAttempt.create({ data }) as Promise<PaymentAttempt>;
  }

  public async update(
    id: string,
    data: Prisma.PaymentAttemptUpdateInput,
    ctx?: RepositoryContext
  ): Promise<PaymentAttempt> {
    return this.getClient(ctx).paymentAttempt.update({
      where: { id },
      data,
    }) as Promise<PaymentAttempt>;
  }
}

export const paymentRepository = new PrismaPaymentRepository();
export default paymentRepository;
