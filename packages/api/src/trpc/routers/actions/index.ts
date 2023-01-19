import { z } from 'zod';
import { t, authedProcedure } from "../../utils/[trpc]";
import { acceptFriendRequest } from "./controller";



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
        
});


export default userRoute;