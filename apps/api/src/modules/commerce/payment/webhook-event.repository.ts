import { WebhookEvent, WebhookEventStatus, Prisma } from "@prisma/client";
import { prisma } from "../../../database/client";
import { RepositoryContext } from "../commerce.types";

export class PrismaWebhookEventRepository {
  private getClient(ctx?: RepositoryContext) {
    return ctx?.tx || prisma;
  }

  public async findByEventId(eventId: string, ctx?: RepositoryContext): Promise<WebhookEvent | null> {
    return this.getClient(ctx).webhookEvent.findUnique({
      where: { eventId },
    }) as Promise<WebhookEvent | null>;
  }

  public async create(data: Prisma.WebhookEventCreateInput, ctx?: RepositoryContext): Promise<WebhookEvent> {
    return this.getClient(ctx).webhookEvent.create({ data }) as Promise<WebhookEvent>;
  }

  public async updateStatus(
    id: string,
    status: WebhookEventStatus,
    processedAt?: Date,
    ctx?: RepositoryContext
  ): Promise<WebhookEvent> {
    return this.getClient(ctx).webhookEvent.update({
      where: { id },
      data: { status, processedAt },
    }) as Promise<WebhookEvent>;
  }
}

export const webhookEventRepository = new PrismaWebhookEventRepository();
export default webhookEventRepository;
