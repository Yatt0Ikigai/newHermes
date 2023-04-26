import { z } from 'zod';
import { trpcCreateChat, trpcfetchSideChats } from "./controller";
import { t, authedProcedure } from "../../utils/[trpc]";



const chatsRoute = t.router({
    createChat:
        authedProcedure
            .input(z.object({
                participantsIDs: z.string().array()
            }))
            .mutation(async ({ input, ctx }) => {
                const chat = await trpcCreateChat({
                    participantsIDs: input.participantsIDs,
                    userID: ctx?.user?.id as string
                })

                return {
                    status: 'success',
                    data: {
                        chat
                    }
                };
            }),
    fetchChats:
        authedProcedure
            .query(async ({ ctx }) => {
                const sideChats = await trpcfetchSideChats({ selfId: ctx?.user?.id as string });
                if( sideChats ) return {
                    status: 'success',
                    data: sideChats
                }
            }),
});

export default chatsRoute;