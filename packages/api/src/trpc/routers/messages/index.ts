import { z } from 'zod';

import { trpcGetMessages, trpcPostMessage } from "./controllers";
import { t, authedProcedure } from "../../utils/[trpc]";

const messagesRoute = t.router({
    sendMessage:
        authedProcedure
            .input(z.object({
                chatID: z.string(),
                message: z.string(),
            }))
            .mutation(async({ input, ctx }) => {
                const message = await trpcPostMessage({
                    chatId: input.chatID,
                    message: input.message,
                    userID: ctx.req.user?.id as string
                })

                return {
                    status: 'success',
                    data: {
                        message
                    }
                };
            }),
    getMessages:
        authedProcedure
        .input(z.object({
            chatID: z.string()
        }))
        .query(async({ input, ctx}) => {
            const messages = await trpcGetMessages({
                chatID: input.chatID,
                userID: ctx.req.user?.id as string
            });
            
            return {
                status: 'success',
                data: {
                    messages
                }
            };
        })
});


export default messagesRoute;