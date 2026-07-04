import { Invoice, Prisma } from "@prisma/client";
import { prisma } from "../../database/client";
import { InvoiceRepository, RepositoryContext } from "./commerce.types";

export class PrismaInvoiceRepository implements InvoiceRepository {
  private getClient(ctx?: RepositoryContext) {
    return ctx?.tx || prisma;
  }

  public async findById(id: string, ctx?: RepositoryContext): Promise<Invoice | null> {
    return this.getClient(ctx).invoice.findUnique({
      where: { id },
    }) as Promise<Invoice | null>;
  }

  public async findByInvoiceNumber(
    invoiceNumber: string,
    ctx?: RepositoryContext
  ): Promise<Invoice | null> {
    return this.getClient(ctx).invoice.findUnique({
      where: { invoiceNumber },
    }) as Promise<Invoice | null>;
  }

  public async create(
    data: Prisma.InvoiceUncheckedCreateInput,
    ctx?: RepositoryContext
  ): Promise<Invoice> {
    return this.getClient(ctx).invoice.create({ data }) as Promise<Invoice>;
  }

  public async findByOrderId(
    orderId: string,
    ctx?: RepositoryContext
  ): Promise<Invoice | null> {
    return this.getClient(ctx).invoice.findUnique({
      where: { orderId },
    }) as Promise<Invoice | null>;
  }

  public async delete(
    id: string,
    ctx?: RepositoryContext
  ): Promise<Invoice> {
    return this.getClient(ctx).invoice.delete({
      where: { id },
    }) as Promise<Invoice>;
  }

  public async countTodayInvoices(ctx?: RepositoryContext): Promise<number> {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return this.getClient(ctx).invoice.count({
      where: { createdAt: { gte: startOfDay } },
    });
  }
}

export const invoiceRepository = new PrismaInvoiceRepository();
export default invoiceRepository;
