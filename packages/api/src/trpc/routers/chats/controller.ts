import { findChat, updateChat, cChat } from "../../../utils/chatUtils";
import { gMessages } from "../../../utils/messageUtils";
import { updateUser, findUser } from "../../../utils/userUitls";
import { TRPCError } from "@trpc/server";
import { io } from "../../../../index";

export const trpcCreateChat = async ({ participantsIDs, userID }: { participantsIDs: string[], userID: string }) => {
    const flag = await Promise.all(
        participantsIDs.map(async (id) => {
            if (id === userID) return true;
            return (await findUser({ id }, { friendList: true })).friendList.includes(id);
        })
    )
    if (!flag.every((el) => el === true)) throw new TRPCError({
        code: 'FORBIDDEN',
        message: `You can't create chat with not friends`
    });

    const chat = await cChat({ participantsIds: participantsIDs });

    await Promise.all(
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



export const trpcfetchSideChats = async ({ selfId }: { selfId: string }) => {
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
            if (chat.lastMessage) {
                const lMessage = await gMessages({ id: chat.lastMessage });
                const lastSender = await findUser({ id: lMessage[0].senderId }, { firstName: true, lastName: true, id: true });
                return {
                    lastMessage: {
                        senderId: lastSender.id,
                        author: lastSender.firstName + " " + lastSender.lastName,
                        message: lMessage[0].message,
                        messageId: lMessage[0].id,
                        chatId: lMessage[0].inboxId,
                        timeStamp: lMessage[0].createdAt
                    },
                    participants,
                    id
                }
            }
            else {
                return {
                    lastMessage: null,
                    participants,
                    id
                }
            }
        })
    )

    chats.sort((a, b) => {
        if (!a.lastMessage) return 1;
        if (!b.lastMessage) return -1;
        return a.lastMessage.timeStamp < b.lastMessage.timeStamp ? 1 : -1;
    })

    return chats;
}

