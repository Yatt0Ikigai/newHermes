import { prisma } from "./prisma";
import { Prisma, Messages } from "@prisma/client"

export const createMessage = async (
    input: Partial<Prisma.MessagesCreateInput>
) => {
    return (await prisma.messages.create({
        data: input,
    }) as Messages)
}

export const gMessages = async (
    where: Partial<Prisma.MessagesWhereInput>,
    select?: Partial<Prisma.MessagesSelect>,
) => {
    return await prisma.messages.findMany({ orderBy: { createdAt: "desc" }, where, select }) as Messages[];
}

export const gMessage = async (
    where: Partial<Prisma.MessagesWhereInput>,
    select?: Partial<Prisma.MessagesSelect>,
) => {
    return await prisma.messages.findFirst({ where, select }) as Messages[];
}
