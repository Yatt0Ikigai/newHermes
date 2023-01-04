import { prisma } from "../utils/prisma";
import { findUser, findManyUsers, updateUser } from "../utils/userUitls";
import { readImg } from "../utils/awsUtils";


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
        }) as any;

    if (!user) throw "User not found";

    const friendList = await Promise.all(
        user.friendList.map(async (id: string) => {
            return await findUser({ id }, {
                firstName: true,
                lastName: true,
                id: true,
            });
        })
    )

    const friendRequestList = await Promise.all(
        user.friendRequestList.map(async (id: string) => {
            return await findUser({ id }, {
                firstName: true,
                lastName: true,
                id: true,
            });
        })
    )

    const pendingFriendRequest = await Promise.all(
        user.pendingFriendRequest.map(async (id: string) => {
            return await findUser({ id }, {
                firstName: true,
                lastName: true,
                id: true,
            });
        })
    )



    const res = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        friendList,
        friendRequestList,
        pendingFriendRequest,
    }

    return res;
}

export const getPublicInfo = async ({ userId, selfId }: { userId: string, selfId: string }) => {
    const user = await findUser({ id: userId });
    
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
    return await findUser({ id: userId }, {
        firstName: true,
        lastName: true,
        id: true,
    });
}