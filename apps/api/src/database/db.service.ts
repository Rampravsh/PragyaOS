import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "./client";

export class DatabaseService {
  private static instance: DatabaseService;
  public readonly client: PrismaClient;

  private constructor() {
    this.client = prisma;
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  /**
   * Orchestrates database queries inside a transactional context.
   * Leverages Prisma's interactive transaction API.
   */
  public async transaction<T>(
    fn: (tx: Prisma.TransactionClient) => Promise<T>,
    options?: { maxWait?: number; timeout?: number; isolationLevel?: Prisma.TransactionIsolationLevel }
  ): Promise<T> {
    return this.client.$transaction(fn, options);
  }
}

export const db = DatabaseService.getInstance();
