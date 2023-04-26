import { prisma } from "./prisma";
import { Prisma, Post } from "@prisma/client"

export const updateUser = async (
    where: Partial<Prisma.PostWhereInput>,
    data: Partial<Prisma.PostUpdateInput>) => {
    return await prisma.post.update({ where, data }) as Post
}

export const createPost = async (
    data: Partial<Prisma.PostCreateInput>
) => {
    return await prisma.post.update({ data }) as Post
}
