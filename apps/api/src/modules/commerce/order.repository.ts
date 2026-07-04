import { Order, OrderStatus, Prisma } from "@prisma/client";
import { prisma } from "../../database/client";
import { OrderRepository, RepositoryContext } from "./commerce.types";

export class PrismaOrderRepository implements OrderRepository {
  private getClient(ctx?: RepositoryContext) {
    return ctx?.tx || prisma;
  }

  public async findById(id: string, ctx?: RepositoryContext): Promise<any | null> {
    return this.getClient(ctx).order.findUnique({
      where: { id },
      include: {
        items: {
          include: { product: true, price: true },
        },
        payments: true,
        invoice: true,
      },
    });
  }

  public async findByOrderNumber(orderNumber: string, ctx?: RepositoryContext): Promise<any | null> {
    return this.getClient(ctx).order.findUnique({
      where: { orderNumber },
      include: {
        items: {
          include: { product: true, price: true },
        },
        payments: true,
        invoice: true,
      },
    });
  }

  public async createOrderWithItems(
    data: Prisma.OrderUncheckedCreateInput,
    items: Omit<Prisma.OrderItemCreateManyOrderInput, "orderId">[],
    ctx?: RepositoryContext
  ): Promise<any> {
    const client = this.getClient(ctx);
    
    const execute = async (dbClient: Prisma.TransactionClient | typeof prisma) => {
      const order = await dbClient.order.create({ data });
      const orderItemsData = items.map((item) => ({
        ...item,
        orderId: order.id,
      }));
      await dbClient.orderItem.createMany({
        data: orderItemsData,
      });
      return dbClient.order.findUnique({
        where: { id: order.id },
        include: { items: true },
      }) as Promise<Order>;
    };

    if (ctx?.tx) {
      return execute(client);
    } else {
      return prisma.$transaction(async (tx) => {
        return execute(tx);
      });
    }
  }

  public async updateOrderStatus(
    id: string,
    status: OrderStatus,
    expectedStatus: OrderStatus,
    ctx?: RepositoryContext
  ): Promise<Order> {
    return this.getClient(ctx).order.update({
      where: { id, status: expectedStatus },
      data: {
        status,
        version: { increment: 1 },
      },
    }) as Promise<Order>;
  }

  public async countTodayOrders(ctx?: RepositoryContext): Promise<number> {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return this.getClient(ctx).order.count({
      where: { createdAt: { gte: startOfDay } },
    });
  }

  public async hasActivePurchase(
    userId: string,
    productId: string,
    ctx?: RepositoryContext
  ): Promise<boolean> {
    const order = await this.getClient(ctx).order.findFirst({
      where: {
        userId,
        status: { in: [OrderStatus.PAID, OrderStatus.PENDING_PAYMENT] },
        items: { some: { productId } },
      },
    });
    return !!order;
  }
}

export const orderRepository = new PrismaOrderRepository();
export default orderRepository;
