import { gMessages } from "../../../utils/prisma/messageUtils";
import { findChat } from "../../../utils/prisma/chatUtils";
import { TRPCError } from "@trpc/server";

export const getMessages = async ({ chatID, userID, skip }: { chatID: string, userID: string, skip?: number }) => {
    const chat = await findChat({ id: chatID });

    if (!chat) throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Chat with that ID not found'
    })

    if (!chat.participantsIds.includes(userID)) throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You are not participant of that Chat'
    })

    return {
        chatID: chat.id,
        messages: await gMessages({ inboxId: chatID })
    }
}
