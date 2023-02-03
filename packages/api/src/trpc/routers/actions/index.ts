import { z } from 'zod';
import { t, authedProcedure } from "../../utils/[trpc]";
import { acceptFriendRequest, findUserByString } from "./controller";



const userRoute = t.router({
    acceptRequest:
        authedProcedure
            .input(z.object({
                strangerID: z.string()
            }))
            .mutation(async({ ctx, input }) => {
                await acceptFriendRequest({ friendID: input.strangerID, selfID: ctx.req.user?.id as string });
                return {
                    status: 'success',
                    data: {
                        message: 'Request succesfully accepted'
                    }
                };
            }),
    searchUsers:
    authedProcedure
    .input(z.object({
        username: z.string()
    }))
    .mutation(async({ctx,input}) => {
        const res = await findUserByString({ username: input.username, userID: ctx?.user?.id as string});
        return ({
            status:'success',
            data: res
        })
    })
});


export default userRoute;