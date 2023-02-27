import { createMessage, gMessages } from "../../../utils/messageUtils";
import { findChat, updateChat } from "../../../utils/chatUtils";
import { TRPCError } from "@trpc/server";
import { findUser } from "../../../utils/userUitls";


export const trpcPostMessage = async ({ chatId, userID, message }: { chatId: string, userID: string, message: string }) => {


    return 'mes';
}

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
