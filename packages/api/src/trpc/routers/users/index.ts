import { z } from 'zod';

import { getAvatar, updateAvatarLink } from "./controllers";
import { t, authedProcedure, procedure } from "../../utils/[trpc]";
import { createUploadLink } from "../../../utils/awsUtils";
import { findUser } from '../../../utils/userUitls';
import { TRPCError } from '@trpc/server';




const userRoute = t.router({
    getAvatar:
        authedProcedure
            .input(z.object({
                id: z.string().nullable(),
            }))
            .query(async ({ input, ctx }) => {
                let avatar 
                if( input.id ) avatar = await getAvatar({ id: input.id });
                else if( ctx.user ) avatar = await getAvatar({ id: ctx.user.id})
                else throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: `Didn't provide id or user not logged in`
                })
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
                updateAvatarLink({ id: ctx?.user?.id as string, key: input.key })
                return {
                    status: 'success',
                    data: {
                        message: "Successfuly updated avatar!"
                    }
                }
            }),

    getSelfInfo:
            procedure
            .query(async ({ ctx }) => {
                const user = await findUser(
                    { id: ctx?.user?.id },
                    {
                        id: true,
                        firstName: true,
                        lastName: true,
                    }
                )
                if(user)  return {
                    status: 'success',
                    user
                }
                else return {
                    status: 'failed',
                    user: null,
                }
            })
});


export default userRoute;