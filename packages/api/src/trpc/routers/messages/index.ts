import { z } from 'zod';

import { getMessages, trpcPostMessage } from "./controllers";
import { t, authedProcedure } from "../../utils/[trpc]";
import { observable } from '@trpc/server/observable';
import { EventEmitter } from 'node:events';
const ee = new EventEmitter();

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
            }),

    receiveMessage:
        authedProcedure
            .input(z.object({
                chatID: z.string()
            }))
            .subscription(async ({ input, ctx }) => {
                return observable<IMessage>(emit => {
                    const onUpdate = (data: IMessage) => {
                        emit.next(data);
                    }
                    ee.on('onUpdate', onUpdate);
                    return () => {
                        ee.off('onUpdate', onUpdate)
                    }
                })
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