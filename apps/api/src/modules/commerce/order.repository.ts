import { Order, OrderStatus, Prisma } from "@prisma/client";
import { prisma } from "../../database/client";
import { OrderRepository, RepositoryContext } from "./commerce.types";

export class PrismaOrderRepository implements OrderRepository {
  private getClient(ctx?: RepositoryContext) {
    return ctx?.tx || prisma;
  }

  public async findById(id: string, ctx?: RepositoryContext): Promise<Order | null> {
    return this.getClient(ctx).order.findUnique({
      where: { id },
      include: {
        items: {
          include: { product: true, price: true },
        },
        payments: true,
        invoice: true,
      },
    }) as Promise<Order | null>;
  }

  public async findByOrderNumber(orderNumber: string, ctx?: RepositoryContext): Promise<Order | null> {
    return this.getClient(ctx).order.findUnique({
      where: { orderNumber },
      include: {
        items: {
          include: { product: true, price: true },
        },
        payments: true,
        invoice: true,
      },
    }) as Promise<Order | null>;
  }

  public async createOrderWithItems(
    data: Prisma.OrderUncheckedCreateInput,
    items: Omit<Prisma.OrderItemCreateManyOrderInput, "orderId">[],
    ctx?: RepositoryContext
  ): Promise<Order> {
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
      data: { status },
    }) as Promise<Order>;
  }
}

export const orderRepository = new PrismaOrderRepository();
export default orderRepository;
