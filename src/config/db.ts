// src/config/db.ts
import { PrismaClient } from "@prisma/client";

declare global {
  var __prisma: PrismaClient | undefined;
}

const prisma =
  global.__prisma ??
  new PrismaClient({
    log: ["query", "error"], // optional: useful for debugging
  });

if (process.env.NODE_ENV !== "production") global.__prisma = prisma;

export default prisma;
