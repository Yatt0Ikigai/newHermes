import { z } from 'zod';

import { getMessages, trpcPostMessage } from "./controllers";
import { t, authedProcedure } from "../../utils/[trpc]";
import { EventEmitter } from 'node:events';

const messagesRoute = t.router({
    sendMessage:
        t.procedure
            .input(z.object({
                chatID: z.string(),
                message: z.string(),
            }))
            .mutation(async ({ input, ctx }) => {
                const message = await trpcPostMessage({
                    chatId: input.chatID,
                    message: input.message,
                    userID: ctx.user?.id as string
                })
                
                return {
                    status: 'success',
                    data: {
                        message
                    }
                };
            }),

    fetchMessages:
        authedProcedure
            .input(z.object({
                chatID: z.string(),
            }))
            .mutation(async ({ input, ctx }) => {
                const messages = await getMessages({ chatID: input.chatID, userID: ctx.user?.id as string });
                return {
                    status: 'success',
                    data: messages
                };
            })
});

interface IMessage {
    messageId: string
    senderId: string,
    chatId: string,
    message: string,
    timeStamp: string,
}

export default messagesRoute;