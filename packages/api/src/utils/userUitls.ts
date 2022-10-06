import { prisma } from "./prisma";
import { Prisma, Users } from "@prisma/client"

export const findUser = async (
    where: Partial<Prisma.UsersWhereInput>,
    select?: Prisma.UsersSelect) => {
    return select ? await prisma.users.findFirst({ where, select }) as Users : await prisma.users.findFirst({ where }) as Users;
}

export const updateUser = async (
    where: Partial<Prisma.UsersWhereInput>,
    data: Partial<Prisma.UsersUpdateInput>) => {
    return await prisma.users.update({ where, data }) as Users
}

export const findManyUsers = async (
    take: number,
    where: Partial<Prisma.UsersWhereInput>,
    select?: Prisma.UsersSelect,
    ) => {
    return select ? await prisma.users.findMany({ where, select, take }) as Users : await prisma.users.findMany({ where, take }) as Users;
}