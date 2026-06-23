import "server-only";

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function getDatabaseUrl() {
  return process.env.DATABASE_URL ?? "file:./dev.db";
}

function createPrismaClient() {
  return new PrismaClient({
    adapter: new PrismaBetterSqlite3({ url: getDatabaseUrl() }),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

function hasEditableContentDelegates(client: PrismaClient) {
  const candidate = client as PrismaClient & {
    service?: unknown;
    facility?: unknown;
    staffProfile?: unknown;
  };

  return Boolean(candidate.service && candidate.facility && candidate.staffProfile);
}

export const prisma =
  globalForPrisma.prisma && hasEditableContentDelegates(globalForPrisma.prisma)
    ? globalForPrisma.prisma
    : createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
