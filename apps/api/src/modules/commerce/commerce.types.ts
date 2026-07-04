import {
  Prisma,
  Product,
  ProductPrice,
  Coupon,
  Order,
  PaymentAttempt,
  Invoice,
  Refund,
  OrderStatus,
  ProductType,
} from "@prisma/client";

export interface RepositoryContext {
  tx?: Prisma.TransactionClient;
}

export interface ProductRepository {
  findById(id: string, ctx?: RepositoryContext): Promise<Product | null>;
  findBySku(sku: string, ctx?: RepositoryContext): Promise<Product | null>;
  findBySellable(sellableId: string, sellableType: ProductType, ctx?: RepositoryContext): Promise<Product | null>;
  create(data: Prisma.ProductCreateInput, ctx?: RepositoryContext): Promise<Product>;
  update(id: string, data: Prisma.ProductUpdateInput, ctx?: RepositoryContext): Promise<Product>;
}

export interface ProductPriceRepository {
  findById(id: string, ctx?: RepositoryContext): Promise<ProductPrice | null>;
  findActivePricesByProductId(productId: string, ctx?: RepositoryContext): Promise<ProductPrice[]>;
  create(data: Prisma.ProductPriceUncheckedCreateInput, ctx?: RepositoryContext): Promise<ProductPrice>;
  update(id: string, data: Prisma.ProductPriceUpdateInput, ctx?: RepositoryContext): Promise<ProductPrice>;
}

export interface CouponRepository {
  findById(id: string, ctx?: RepositoryContext): Promise<Coupon | null>;
  findByCode(code: string, ctx?: RepositoryContext): Promise<Coupon | null>;
  incrementRedemptions(id: string, ctx?: RepositoryContext): Promise<Coupon>;
  create(data: Prisma.CouponCreateInput, ctx?: RepositoryContext): Promise<Coupon>;
  update(id: string, data: Prisma.CouponUpdateInput, ctx?: RepositoryContext): Promise<Coupon>;
}

export interface OrderRepository {
  findById(id: string, ctx?: RepositoryContext): Promise<Order | null>;
  findByOrderNumber(orderNumber: string, ctx?: RepositoryContext): Promise<Order | null>;
  createOrderWithItems(
    data: Prisma.OrderUncheckedCreateInput,
    items: Omit<Prisma.OrderItemCreateManyOrderInput, "orderId">[],
    ctx?: RepositoryContext
  ): Promise<Order>;
  updateOrderStatus(
    id: string,
    status: OrderStatus,
    expectedStatus: OrderStatus,
    ctx?: RepositoryContext
  ): Promise<Order>;
}

export interface PaymentRepository {
  findById(id: string, ctx?: RepositoryContext): Promise<PaymentAttempt | null>;
  findByGatewayOrderId(gatewayOrderId: string, ctx?: RepositoryContext): Promise<PaymentAttempt | null>;
  findByGatewayPaymentId(gatewayPaymentId: string, ctx?: RepositoryContext): Promise<PaymentAttempt | null>;
  create(data: Prisma.PaymentAttemptUncheckedCreateInput, ctx?: RepositoryContext): Promise<PaymentAttempt>;
  update(id: string, data: Prisma.PaymentAttemptUpdateInput, ctx?: RepositoryContext): Promise<PaymentAttempt>;
}

export interface InvoiceRepository {
  findById(id: string, ctx?: RepositoryContext): Promise<Invoice | null>;
  findByInvoiceNumber(invoiceNumber: string, ctx?: RepositoryContext): Promise<Invoice | null>;
  create(data: Prisma.InvoiceUncheckedCreateInput, ctx?: RepositoryContext): Promise<Invoice>;
}

export interface RefundRepository {
  findById(id: string, ctx?: RepositoryContext): Promise<Refund | null>;
  findByGatewayRefundId(gatewayRefundId: string, ctx?: RepositoryContext): Promise<Refund | null>;
  create(data: Prisma.RefundUncheckedCreateInput, ctx?: RepositoryContext): Promise<Refund>;
}
