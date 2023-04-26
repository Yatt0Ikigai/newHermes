import { z } from 'zod';

import { t, authedProcedure, procedure } from "../../utils/[trpc]";
import { TRPCError } from '@trpc/server';
import { getUserInfo } from "./controller";



const userRoute = t.router({
    getProfileInfo:
        authedProcedure
            .input(z.object({
                id: z.string()
            }))
            .query(async ({ input, ctx }) => {
                const result = await getUserInfo({ authorId: ctx.user?.id as string, getUser: input.id })

                return {
                    status: 'success',
                    result
                }
            })
});


export default userRoute;