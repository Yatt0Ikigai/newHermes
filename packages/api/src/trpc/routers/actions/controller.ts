import { TRPCError } from "@trpc/server";
import { findUser, updateUser, findManyUsers } from "../../../utils/userUitls";

export const acceptFriendRequest = async ({ friendID, selfID }: { friendID: string, selfID: string }) => {
    const user = await findUser({ id: selfID })
    const self = await findUser({ id: friendID })

    if (!user) throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Can't find user`
    })

    if (!user.pendingFriendRequest.includes(selfID)) throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Request does not exist`
    })

    const newUserPendingFriendRequest = user.pendingFriendRequest.filter((id: string) => { return id != selfID })
    const newSelfFriendRequest = self.friendRequestList.filter((id: string) => { return id != friendID })


    await updateUser({ id: friendID }, {
        pendingFriendRequest: newUserPendingFriendRequest,
        friendList: {
            push: selfID
        }
    })

    await updateUser({ id: selfID }, {
        friendRequestList: newSelfFriendRequest,
        friendList: {
            push: friendID
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
            id: true,
        },
        take: 15,
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