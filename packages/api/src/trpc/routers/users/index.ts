import { z } from 'zod';

import { getAvatar, updateAvatarLink } from "./controllers";
import { t, authedProcedure } from "../../utils/[trpc]";
import { createUploadLink } from "../../../utils/awsUtils";




const userRoute = t.router({
    getAvatar:
        authedProcedure
            .input(z.object({
                id: z.string(),
            }))
            .query(async ({ input, ctx }) => {
                const avatar = await getAvatar({ id: input.id })
                return {
                    status: 'success',
                    data: {
                        avatar
                    }
                };
            }),


    getUploadLink:
        authedProcedure
            .mutation(async () => {
                return {
                    status: 'success',
                    data: {
                        link: await createUploadLink()
                    }
                }
            }),

    changeAvatarLink:
        authedProcedure
            .input(z.object({
                key: z.string(),
            }))
            .mutation(async ({ ctx, input }) => {
                updateAvatarLink({ id: ctx.req.user?.id as string, key: input.key })
                return {
                    status: 'success',
                    data: {
                        message: "Successfuly updated avatar!"
                    }
                }
            })
});


export default userRoute;