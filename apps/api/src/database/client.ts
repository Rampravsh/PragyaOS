import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { config } from "../config";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const pool = new Pool({ connectionString: config.database.url });
const adapter = new PrismaPg(pool);

export const prisma =
  global.prisma ||
  new PrismaClient({
    adapter,
    log: config.env === "development" ? ["query", "info", "warn", "error"] : ["error"],
  });

if (config.env !== "production") {
  global.prisma = prisma;
}
