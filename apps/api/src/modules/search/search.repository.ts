import { Prisma, SearchSyncLog, SearchSyncStatus } from "@prisma/client";
import { prisma } from "../../database/client";
import { SearchSyncLogRepository, RepositoryContext } from "./search.types";

export class PrismaSearchSyncLogRepository implements SearchSyncLogRepository {
  private getClient(ctx?: RepositoryContext) {
    return ctx?.tx || prisma;
  }

  public async createLog(
    data: Prisma.SearchSyncLogUncheckedCreateInput,
    ctx?: RepositoryContext
  ): Promise<SearchSyncLog> {
    return this.getClient(ctx).searchSyncLog.create({ data });
  }

  public async updateStatus(
    id: string,
    status: SearchSyncStatus,
    attempts: number,
    lastError?: string | null,
    ctx?: RepositoryContext
  ): Promise<SearchSyncLog> {
    return this.getClient(ctx).searchSyncLog.update({
      where: { id },
      data: {
        status,
        attempts,
        lastError: lastError ?? null,
        processedAt: status === "INDEXED" || status === "FAILED" ? new Date() : null,
      },
    });
  }

  public async findPending(limit = 100, ctx?: RepositoryContext): Promise<SearchSyncLog[]> {
    return this.getClient(ctx).searchSyncLog.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "asc" },
      take: limit,
    });
  }

  public async findByEntity(
    entityType: string,
    entityId: string,
    ctx?: RepositoryContext
  ): Promise<SearchSyncLog | null> {
    return this.getClient(ctx).searchSyncLog.findFirst({
      where: { entityType, entityId },
      orderBy: { createdAt: "desc" },
    });
  }
}

export const searchSyncLogRepository = new PrismaSearchSyncLogRepository();
export default searchSyncLogRepository;
