import { findUser, updateUser } from "../utils/userUitls";

export const getSelfInfo = async ({ userId }: { userId: string }) => {
    const user = await findUser({ id: userId }, {
        friendList: true,
        friendRequestList: true,
        pendingFriendRequest: true,
    })

    const friendList = await Promise.all(
        user.friendList.map((id: string) => {
            return findUser(
                { id },
                {
                    firstName: true,
                    lastName: true,
                    id: true,
                })
        })
    )

    const friendRequestList = await Promise.all(
        user.friendRequestList.map((id: string) => {
            return findUser(
                { id },
                {
                    firstName: true,
                    lastName: true,
                    id: true,
                })
        })
    )

    const pendingFriendRequest = await Promise.all(
        user.pendingFriendRequest.map((id: string) => {
            return findUser(
                { id },
                {
                    firstName: true,
                    lastName: true,
                    id: true,
                })
        })
    )

    return {
        friendList,
        friendRequestList,
        pendingFriendRequest
    }
}

export const getFriendList = async ({ userId }: { userId: string }) => {
    const user = await findUser({ id: userId })
    const friends = await Promise.all(
        user.friendList.map((id: string) => {
            return findUser(
                { id },
                {
                    firstName: true,
                    lastName: true,
                    id: true,
                })
        })
    )
    return friends;
}

export const getFriendRequests = async ({ selfId }: { selfId: string }) => {
    const user = await findUser({ id: selfId }, { friendRequestList: true, })
    const friendRequests = Promise.all(
        user.friendRequestList.map((id: string) => {
            return findUser(
                { id },
                {
                    firstName: true,
                    lastName: true,
                    id: true,
                })
        })
    )
    return friendRequests;
}

export const declineFriendRequest = async ({ userId, selfId }: { userId: string, selfId: string }) => {
    const user = await findUser({ id: userId })

    const self = await findUser({ id: selfId })

    if (!user) throw new Error("User doesnt exist");
    if (!user.pendingFriendRequest.includes(selfId)) throw new Error("Cant decline nonexistent request");

    const newUserPendingFriendRequest = user.pendingFriendRequest.filter((id: string) => { return id != selfId })
    const newSelfFriendRequest = self.friendRequestList.filter((id: string) => { return id != userId })

    await updateUser({ id: userId }, { pendingFriendRequest: newUserPendingFriendRequest, })
    await updateUser({ id: selfId }, { friendRequestList: newSelfFriendRequest, })

    return true;
}
