import { PrismaClient } from "@prisma/client";
const g = globalThis as unknown as { prisma?: PrismaClient };
/** null when DATABASE_URL is not set, so the site still builds and shows empty states. */
export const db: PrismaClient | null = process.env.DATABASE_URL ? (g.prisma ??= new PrismaClient()) : null;
