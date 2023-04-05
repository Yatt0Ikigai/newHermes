import { findChat, updateChat, cChat } from "../../../utils/chatUtils";
import { gMessages } from "../../../utils/messageUtils";
import { updateUser, findUser } from "../../../utils/userUitls";
import { TRPCError } from "@trpc/server";

export const trpcCreateChat = async ({ participantsIDs, userID }: { participantsIDs: string[], userID: string }) => {
    const flag = await Promise.all(
        participantsIDs.map(async (id) => {
            if (id === userID) return true;
            return (await findUser({ id }, { friendList: true })).friendList.includes(userID);
        })
    )
    if (!flag.every((el) => el === true)) throw new TRPCError({
        code: 'FORBIDDEN',
        message: `You can't create chat with not friends`
    });

    const chat = await cChat({ participantsIds: [...participantsIDs, userID] });

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

    const participants = await Promise.all(
        chat.participantsIds.map(async (id: string) => {
            return await findUser({ id }, { firstName: true, lastName: true, id: true })
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
                        id: lMessage[0].id,
                        senderId: lastSender.id,
                        inboxId: lMessage[0].inboxId,
                        message: lMessage[0].message,
                        createdAt: lMessage[0].createdAt,
                        author: lastSender.firstName + " " + lastSender.lastName,
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
        return a.lastMessage.createdAt < b.lastMessage.createdAt ? 1 : -1;
    })

    return chats;
}

