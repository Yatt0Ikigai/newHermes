import { prisma } from "./prisma";
import { Prisma, Post } from "@prisma/client"

export const updatePost = async (
    where: Partial<Prisma.PostWhereInput>,
    data: Partial<Prisma.PostUpdateInput>) => {
    return await prisma.post.update({ where, data }) as Post
}

export const createPost = async (
    input: Partial<Prisma.PostCreateInput>
) => {
    return await prisma.post.create({ input }) as Post
}

export const gPosts = async (
    where?: Partial<Prisma.PostWhereInput>,
    select?: Partial<Prisma.PostSelect>,
) => {
    return await prisma.post.findMany({ orderBy: { createdAt: "desc" }, where, select }) as Post[];
}