import { z } from 'zod';
import { t, authedProcedure } from "../../utils/[trpc]";
import { acceptFriendRequest, findUserByString, handleRemoveFriendship, handleSendFriendshipInvite, handleCancelFriendshipInvite } from "./controller";



const userRoute = t.router({
    acceptFriendship:
        authedProcedure
            .input(z.object({
                strangerID: z.string()
            }))
            .mutation(async ({ ctx, input }) => {
                await acceptFriendRequest({ friendID: input.strangerID, selfID: ctx.user?.id as string });
                return {
                    status: 'success',
                    data: {
                        message: 'Request succesfully accepted'
                    }
                };
            }),

    removeFriendship:
        authedProcedure
            .input(z.object({
                friendId: z.string()
            }))
            .mutation(async ({ ctx, input }) => {
                await handleRemoveFriendship({ friendId: input.friendId, selfId: ctx.user?.id as string });
                return {
                    status: 'success',
                    data: {
                        message: 'Friendship succesfully removed'
                    }
                };
            }),

    sendFriendshipInvite:
        authedProcedure
            .input(z.object({
                friendId: z.string()
            }))
            .mutation(async ({ ctx, input }) => {
                await handleSendFriendshipInvite({ friendId: input.friendId, selfId: ctx.user?.id as string });
                return {
                    status: 'success',
                    data: {
                        message: 'Friendship invite succesfully send'
                    }
                };
            }),

    cancelFriendshipInvite:
        authedProcedure
            .input(z.object({
                friendId: z.string()
            }))
            .mutation(async ({ ctx, input }) => {
                await handleCancelFriendshipInvite({ friendId: input.friendId, selfId: ctx.user?.id as string });
                return {
                    status: 'success',
                    data: {
                        message: 'Friendship invite succesfully cancelled'
                    }
                };
            }),

    searchUsers:
        authedProcedure
            .input(z.object({
                username: z.string()
            }))
            .mutation(async ({ ctx, input }) => {
                const res = await findUserByString({ username: input.username, userID: ctx?.user?.id as string });
                return ({
                    status: 'success',
                    data: res
                })
            })
});


export default userRoute;