import { createMessage, gMessages } from "../../../utils/messageUtils";
import { findChat, updateChat } from "../../../utils/chatUtils";
import { TRPCError } from "@trpc/server";
import { io } from "../../../../index";


export const trpcPostMessage = async ({ chatId, userID, message }: { chatId: string, userID: string, message: string }) => {
    const chat = await findChat({ id: chatId });
    if (!chat) throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Chat with that ID not found'
    })
    if (!chat.participantsIds.includes(userID)) throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You are not participant of that Chat'
    })

    const mes = await createMessage({
        senderId: userID,
        inboxId: chatId,
        message: message
    });

    await updateChat({ id: chatId }, { lastMessage: mes.id })

    chat.participantsIds.map((id) => {
        io.to(id).emit("messageReceived", {
            id: mes.id,
            message: mes.message,
            senderId: mes.senderId,
            chatId: chat.id,
        })
    })

    return mes;
}

export const trpcGetMessages = async ({ chatID, userID, skip }: { chatID: string, userID: string, skip?: number }) => {
    const chat = await findChat({ id: chatID });

    if (!chat) throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Chat with that ID not found'
    })

    if (!chat.participantsIds.includes(userID)) throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You are not participant of that Chat'
    })

    return await gMessages({ inboxId: chatID });
}
