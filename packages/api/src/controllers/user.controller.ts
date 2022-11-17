import { prisma } from "../utils/prisma";
import { findUser, findManyUsers, updateUser } from "../utils/userUitls";
import { error } from "console";
import { findChat } from "../utils/chatUtils";
import { gMessages, gMessage } from "../utils/messageUtils";

export const findUserByString = async ({ username, userID }: { username: string, userID: string }) => {
    const [firstName, lastName] = username.split(" ");
    const result = await prisma.users.findMany({
        where: {
            firstName: { contains: firstName, },
            lastName: { contains: lastName, },
            NOT: { id: userID }
        },
        select: {
            firstName: true,
            lastName: true,
            id: true,
        },
        take: 15,
    })

    const user = await findUser({ id: userID })
    result.forEach((element: any) => { element["isFriend"] = user.friendList.includes(element.id); });
    return result;
}

export const getSelfInfo = async ({ selfId }: { selfId: string }) => {
    const user = await findUser(
        { id: selfId },
        {
            id: true,
            firstName: true,
            lastName: true,
            friendList: true,
            friendRequestList: true,
            pendingFriendRequest: true,
            chatIds: true,
        }) as any;

    if (!user) throw "User not found";

    const friendList = await Promise.all(
        user.friendList.map(async (id: string) => {
            return await findUser({ id }, {
                firstName: true,
                lastName: true,
                id: true
            });
        })
    )

    const friendRequestList = await Promise.all(
        user.friendRequestList.map(async (id: string) => {
            return await findUser({ id }, {
                firstName: true,
                lastName: true,
                id: true
            });
        })
    )

    const pendingFriendRequest = await Promise.all(
        user.pendingFriendRequest.map(async (id: string) => {
            return await findUser({ id }, {
                firstName: true,
                lastName: true,
                id: true
            });
        })
    )

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

    const res = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        friendList,
        friendRequestList,
        pendingFriendRequest,
        chats,
    }

    return res;
}

export const getPublicInfo = async ({ userId, selfId }: { userId: string, selfId: string }) => {
    const user = await findUser({ id: userId })

    const res = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        friend: user.friendList.includes(selfId),
        friendRequest: user.pendingFriendRequest.includes(selfId),
        sentFriendRequest: user.friendRequestList.includes(selfId),
        admin: (userId === selfId)
    }
    return res;
}

export const getUserNameById = async ({ userId }: { userId: string }) => {
    const res = await findUser(
        { id: userId, },
        {
            firstName: true,
            lastName: true,
            id: true,
        })

    return res;
}