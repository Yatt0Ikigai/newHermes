import { createMessage, gMessages } from "../utils/messageUtils";
import { findChat, updateChat, cChat } from "../utils/chatUtils";
import { updateUser} from "../utils/userUitls";

export const postMessage = async ({ chatId, userId, message }: { chatId: string, userId: string, message: string }) => {
    const chat = await findChat({ id: chatId });
    if (!chat.participantsIds.includes(userId)) throw "ERROR";
    const mes = await createMessage({
        senderId: userId,
        inboxId: chatId,
        message: message
    });
    await updateChat({ id: chatId }, { lastMessage: mes.id })
    return mes;
}

export const getMessages = async ({ chatId, userId, skip }: { chatId: string, userId: string, skip?: number }) => {
    const chat = await findChat({ id: chatId });
    if (!chat.participantsIds.includes(userId)) throw "ERROR";
    return await gMessages({inboxId:chatId});
}

export const createChat = async ({ participants }: {participants:string[]}) => {
    const chat = await cChat({participantsIds: participants});
    Promise.all(
        chat.participantsIds.map((user: string) => {
            updateUser({
                id: user,
            }, {
                chatIds: {
                    push: chat.id,
                }
            })
        })
    )
    return chat.id;
}