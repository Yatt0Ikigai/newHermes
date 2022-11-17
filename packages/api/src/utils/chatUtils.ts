import { prisma } from "./prisma";
import { Prisma, Inboxes } from "@prisma/client"

export const findChat = async (
    where: Partial<Prisma.InboxesWhereInput>,
    select?: Prisma.InboxesSelect) => {
    return select ? await prisma.inboxes.findFirst({ where, select }) as Inboxes : await prisma.inboxes.findFirst({ where }) as Inboxes;
}

export const updateChat = async (
    where: Partial<Prisma.InboxesWhereInput>,
    data: Partial<Prisma.InboxesUpdateInput>) => {
    return await prisma.inboxes.update({ where, data }) as Inboxes
}

export const cChat = async (
    input: Partial<Prisma.InboxesCreateInput>,
) => {
    return await prisma.inboxes.create({ data: input }) as Inboxes;
}