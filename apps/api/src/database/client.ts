import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { config } from "../config";
import { execSync } from "child_process";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

import { parse } from "pg-connection-string";

let connectionString = config.database.url;
if (connectionString.includes("pooled.db.prisma.io")) {
  try {
    const output = execSync("nslookup pooled.db.prisma.io 8.8.8.8", { encoding: "utf8", timeout: 3000 });
    const ips = output.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g) || [];
    const dbIp = ips.find((ip) => ip !== "8.8.8.8");
    if (dbIp) {
      connectionString = connectionString.replace("pooled.db.prisma.io", dbIp);
    }
  } catch (err) {
    connectionString = connectionString.replace("pooled.db.prisma.io", "139.180.184.222");
  }
}

if (connectionString.includes("sslmode=require") && !connectionString.includes("sslaccept=")) {
  connectionString += "&sslaccept=accept_invalid_certs";
}

// Assign to process.env so that the native Prisma Query Engine inherits the resolved URL and SSL parameters
process.env.DATABASE_URL = connectionString;

console.log("🔌 Database Connection String (sanitized):", connectionString.replace(/:[^@/]+@/, ":****@"));
console.log("🔌 PG Env vars:", Object.keys(process.env).filter(k => k.startsWith("PG")));

const pgConfig = parse(connectionString) as any;
if (connectionString.includes("sslmode=require") || connectionString.includes("sslmode=prefer")) {
  pgConfig.ssl = {
    servername: "pooled.db.prisma.io",
  };
}

const pool = new Pool(pgConfig);
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
