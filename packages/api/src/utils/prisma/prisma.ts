import { PrismaClient } from '@prisma/client';
declare var global: any;

declare global {
    var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();