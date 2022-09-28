import { prisma } from "../utils/prisma";
import { updateUser } from "../utils/userUitls";
import { error } from "console";

export const findUserController = async ({ username, userID }: { username: string, userID: string }) => {
    try {
        const [firstName, lastName] = username.split(" ");
        const result = await prisma.users.findMany({
            where: {
                firstName: {
                    contains: firstName,
                },
                lastName: {
                    contains: lastName,
                },
                NOT: {
                    id: userID
                }
            },
            select: {
                firstName: true,
                lastName: true,
                id: true,
            },
            take: 10,
        })

        const user = await prisma.users.findFirst({
            where: {
                id: userID
            }
        })

        result.forEach((element: any) => {
            element["isFriend"] = user.friendList.includes(element.id);
            element["userSentRequest"] = user.pendingFriendRequest.includes(element.id);
            element["friendRequest"] = user.friendRequestList.includes(element.id);
        });

        return result;
    } catch (e) {
        console.log(e);
    }
}

export const sendFriendRequestController = async ({ userId, selfId }: { userId: string, selfId: string }) => {
    if (selfId === userId) throw new Error("Cant send request to yourself");
    const user = await prisma.users.findFirst({
        where: {
            id: userId
        }
    })
    if (user.friendRequestList.includes(selfId)) throw new Error("Request already sent");
    updateUser({ id: userId }, {
        friendRequestList: {
            push: selfId,
        }
    })
    updateUser({ id: selfId }, {
        pendingFriendRequest: {
            push: userId,
        }
    })
    return true;
}

export const userAcceptFriendRequestController = async ({ userId, selfId }: { userId: string, selfId: string }) => {
    if (selfId === userId) throw new Error("Cant accept yourself to friendlist");
    const user = await prisma.users.findFirst({
        where: {
            id: userId
        }
    })

    const self = await prisma.users.findFirst({
        where: {
            id: selfId
        }
    })
    if (!user) throw new Error("User doesnt exist");
    if (!user.pendingFriendRequest.includes(selfId)) throw new Error("Cant accept nonexistent request");

    const newUserPendingFriendRequest = user.pendingFriendRequest.filter((id: string) => { return id != selfId })
    const newSelfFriendRequest = self.friendRequestList.filter((id: string) => { return id != userId })

    await updateUser({ id: userId }, {
        pendingFriendRequest: newUserPendingFriendRequest,
        friendList: {
            push: selfId
        }
    })

    await updateUser({ id: selfId }, {
        friendRequestList: newSelfFriendRequest,
        friendList: {
            push: userId
        }
    })

    return true;
}



export const userDeclineFriendRequestController = async ({ userId, selfId }: { userId: string, selfId: string }) => {
    if (selfId === userId) throw new Error("Cant decline yourself");
    const user = await prisma.users.findFirst({
        where: {
            id: userId
        }
    })

    const self = await prisma.users.findFirst({
        where: {
            id: selfId
        }
    })
    if (!user) throw new Error("User doesnt exist");
    if (!user.pendingFriendRequest.includes(selfId)) throw new Error("Cant decline nonexistent request");

    const newUserPendingFriendRequest = user.pendingFriendRequest.filter((id: string) => { return id != selfId })
    const newSelfFriendRequest = self.friendRequestList.filter((id: string) => { return id != userId })

    await updateUser({ id: userId }, {
        pendingFriendRequest: newUserPendingFriendRequest,
    })

    await updateUser({ id: selfId }, {
        friendRequestList: newSelfFriendRequest,
    })

    return true;
}

export const userUnfirendUserController = async ({ userId, selfId }: { userId: string, selfId: string }) => {
    if (selfId === userId) throw new Error("Cant decline yourself");
    const user = await prisma.users.findFirst({
        where: {
            id: userId
        }
    })

    const self = await prisma.users.findFirst({
        where: {
            id: selfId
        }
    })
    if (!user) throw new Error("User doesnt exist");
    if (!user.friendList.includes(selfId)) throw new Error("Cant decline nonexistent request");

    const newUserFriendList = user.friendList.filter((id: string) => { return id != selfId })
    const newSelfFriendList = self.friendList.filter((id: string) => { return id != userId })

    await updateUser({ id: userId }, {
        friendList: newUserFriendList,
    })

    await updateUser({ id: selfId }, {
        friendList: newSelfFriendList,
    })

    return true;
}

export const userCancelFriendRequestController = async ({ userId, selfId }: { userId: string, selfId: string }) => {
    if (selfId === userId) throw new Error("Cant Cancel yourself");
    const user = await prisma.users.findFirst({
        where: {
            id: userId
        }
    })

    const self = await prisma.users.findFirst({
        where: {
            id: selfId
        }
    })
    if (!user) throw new Error("User doesnt exist");
    if (!user.friendList.includes(selfId)) throw new Error("Cant cancel nonexistent request");

    const newUserFriendRequestList = user.friendRequestList.filter((id: string) => { return id != selfId })
    const newSelfPendingFriendRequest = self.pendingFriendRequest.filter((id: string) => { return id != userId })

    await updateUser({ id: userId }, {
        friendRequestList: newUserFriendRequestList,
    })

    await updateUser({ id: selfId }, {
        pendingFriendRequest: newSelfPendingFriendRequest,
    })

    return true;
}

export const userGetRequestListController = async({selfId}: {selfId: string}) => {
    const user = await prisma.users.findUnique({
        where: {
            id: selfId
        },
        select: {
            friendRequestList: true,
        },
    })
    let res:{}[] = []
    for(let i = 0; i < 10 && i < user.friendRequestList.length; ++i){
        const reqUser = await prisma.users.findUnique({
            where: {
                id: user.friendRequestList[i],
            },
            select: {
                firstName: true,
                lastName: true,
                id: true,
            }
        })
        res.push(reqUser);
    }
    return res;
}