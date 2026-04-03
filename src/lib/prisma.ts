import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

export function getPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }
  const pool =
    globalForPrisma.pool ??
    new Pool({
      connectionString: url,
      max: process.env.NODE_ENV === "development" ? 5 : 10,
      connectionTimeoutMillis: 8_000,
      idleTimeoutMillis: 30_000,
    });
  globalForPrisma.pool = pool;
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
  globalForPrisma.prisma = prisma;
  return prisma;
}
