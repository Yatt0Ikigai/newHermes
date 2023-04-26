import { z } from 'zod';

import { getMessages } from "./controllers";
import { t, authedProcedure } from "../../utils/[trpc]";
import { EventEmitter } from 'node:events';

const messagesRoute = t.router({
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