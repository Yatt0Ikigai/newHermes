import { createMessage, gMessages } from "../utils/messageUtils";
import { findChat, updateChat, cChat } from "../utils/chatUtils";
import { updateUser, findUser } from "../utils/userUitls";

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
    return await gMessages({ inboxId: chatId });
}

export const createChat = async ({ participantsIds }: { participantsIds: string[] }) => {
    const chat = await cChat({ participantsIds: participantsIds });
    Promise.all(
        chat.participantsIds.map((userId: string) => {
            updateUser({
                id: userId,
            }, {
                chatIds: {
                    push: chat.id,
                }
            })
        })
    )
    const participants = Promise.all(
        chat.participantsIds.map((id: string) => {
            return findUser({ id }, { firstName: true, lastName: true, id: true })
        }))

    return {
        lastMessage: {
            author: null,
            message: null,
        },
        participants,
        id: chat.id
    };
}

export const getSelfInfo = async ({ selfId }: { selfId: string }) => {
    const user = await findUser({ id: selfId }, { chatIds: true });

    const chats = await Promise.all(
        user.chatIds.map(async (id: string) => {
            const chat = await findChat({ id });
            const participants = await Promise.all(
                chat.participantsIds.map(async (id: string) => {
                    return await findUser({ id }, {
                        firstName: true,
                        lastName: true,
                        id: true
                    });
                })
            )
            if(chat.lastMessage){
                const lMessage = await gMessages({ id: chat.lastMessage });
                const lastSender = await findUser({ id: lMessage[0].senderId }, { firstName: true, lastName: true, id: true });
                return {
                    lastMessage: {
                        senderId: lastSender.id,
                        author: lastSender.firstName + " " + lastSender.lastName,
                        message: lMessage[0].message,
                        timeStamp: lMessage[0].createdAt
                    },
                    participants,
                    id
                }
            }
            else{
                return {
                    lastMessage: null,
                    participants,
                    id
                }
            }
        })
    )
    
    chats.sort((a,b) => {
        if( !a.lastMessage ) return 1;
        if( !b.lastMessage ) return -1;
        return a.lastMessage.timeStamp < b.lastMessage.timeStamp ? 1 : -1;
    })
    return chats;
}