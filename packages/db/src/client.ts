// packages/db/src/client.ts

// 1. IMPORT FROM YOUR CUSTOM FOLDER
// We use the relative path to the folder we defined in schema.prisma
import { PrismaClient } from "./generated/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export const db = prisma;

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

// Export types so your app can use them (e.g. 'User', 'Bet')
export * from "./generated/client";