import { TRPCError } from "@trpc/server";
import { findUser, updateUser, findManyUsers } from "../../../utils/prisma/userUitls";

export const acceptFriendRequest = async ({ friendId, selfId }: { friendId: string, selfId: string }) => {
    const user = await findUser({ id: friendId })
    const self = await findUser({ id: selfId })

    console.log(user, self)
    if (!user) throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Can't find user`
    })

    if (!user.pendingFriendRequest.includes(selfId)) throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Request does not exist`
    })

    const newUserPendingFriendRequest = user.pendingFriendRequest.filter((id: string) => { return id != selfId })
    const newSelfFriendRequest = self.friendRequestList.filter((id: string) => { return id != friendId })


    await updateUser({ id: friendId }, {
        pendingFriendRequest: newUserPendingFriendRequest,
        friendList: {
            push: selfId
        }
    })

    await updateUser({ id: selfId }, {
        friendRequestList: newSelfFriendRequest,
        friendList: {
            push: friendId
        }
    })

    return true;
}


export const findUserByString = async ({ username, userID }: { username: string, userID: string }) => {
    const [firstName, lastName] = username.split(" ");
    const result = await findManyUsers({
        where: {
            firstName: { contains: firstName, },
            lastName: { contains: lastName, },
            NOT: { id: userID }
        },
        select: {
            firstName: true,
            lastName: true,
            avatar: true,
            id: true,
        },
        take: 10,
    })

    const user = await findUser({ id: userID })
    result.forEach((element: any) => { element["isFriend"] = user.friendList.includes(element.id); });
    return result;
}

export const handleRemoveFriendship = async ({ selfId, friendId }: { selfId: string, friendId: string}) => {
    const self = await findUser({ id: selfId })
    const friend = await findUser({ id: friendId })

    if (!friend) throw new Error("User doesnt exist");
    if (!friend.friendList.includes(selfId)) throw new Error("Cant decline nonexistent request");

    const updatedSelfFriendList = self.friendList.filter((id: string) => { return id != friendId })
    const updatedFriendFriendList = friend.friendList.filter((id: string) => { return id != selfId })

    await updateUser({ id: friendId }, { friendList: updatedSelfFriendList, })
    await updateUser({ id: selfId }, { friendList: updatedFriendFriendList, })

    return true;

}

export const handleSendFriendshipInvite = async ({ friendId, selfId }: { friendId: string, selfId: string }) => {
    const friend = await findUser({ id: friendId })
    if (friend.friendRequestList.includes(selfId)) throw new Error("Request already sent");

    await updateUser({ id: friendId }, { friendRequestList: { push: selfId, } })
    await updateUser({ id: selfId }, { pendingFriendRequest: { push: friendId, } })

    return true;
}

export const handleCancelFriendshipInvite = async ({ friendId, selfId }: { friendId: string, selfId: string }) => {
    const friend = await findUser({ id: friendId })
    const self = await findUser({ id: selfId })

    if (!friend) throw new Error("User doesnt exist");
    if (!friend.friendRequestList.includes(selfId)) throw new Error("Cant cancel nonexistent request");

    const newUserFriendRequestList = friend.friendRequestList.filter((id: string) => { return id != selfId })
    const newSelfPendingFriendRequest = self.pendingFriendRequest.filter((id: string) => { return id != friendId })

    await updateUser({ id: friendId }, { friendRequestList: newUserFriendRequestList, })
    await updateUser({ id: selfId }, { pendingFriendRequest: newSelfPendingFriendRequest })

    return true;
}

export const handleDeclineFriendshipInvite = async ({ friendId, selfId }: { friendId: string, selfId: string }) => {
    const friend = await findUser({ id: friendId })
    const self = await findUser({ id: selfId })

    if (!friend) throw new Error("User doesnt exist");
    if (!friend.pendingFriendRequest.includes(selfId)) throw new Error("Cant decline nonexistent request");

    const newUserPendingFriendRequest = friend.pendingFriendRequest.filter((id: string) => { return id != selfId })
    const newSelfFriendRequest = self.friendRequestList.filter((id: string) => { return id != friendId })

    await updateUser({ id: friendId }, { pendingFriendRequest: newUserPendingFriendRequest, })
    await updateUser({ id: selfId }, { friendRequestList: newSelfFriendRequest, });

    return true;
}