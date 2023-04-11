import { z } from 'zod';

import { t, authedProcedure } from "../../utils/[trpc]";



const chatsRoute = t.router({
    createPost:
        authedProcedure
            .input(z.object({
                content: z.object({
                    message: z.string().optional(),
                    attachment: z.string().optional()
                })
            }))
            .mutation(async ({ input, ctx }) => {
            }),
});

export default chatsRoute;