import { TRPCError } from "@trpc/server";
import { findUser } from "../../../utils/prisma/userUitls";
import { createPost, gPosts } from "../../../utils/prisma/postUtils";

export const postPost = async ({ userId, content }: { userId: string, content: { image?: string, message: string } }) => {
    const user = await findUser({ id: userId })

    if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' })

    const post = await createPost({
        authorId: userId,
        content: {
            text: content.message
        }
    })

    return post;
}

export const getPosts = async() => {
    return await gPosts();
}