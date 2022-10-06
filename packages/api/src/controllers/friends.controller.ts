import { findUser, updateUser } from "../utils/userUitls";

export const getFriendList = async ({ userId }: { userId: string }) => {
    try {
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
    } catch (err) {
        throw err;
    }
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

export const cancelFriendRequest = async ({ userId, selfId }: { userId: string, selfId: string }) => {
    const user = await findUser({ id: userId })
    const self = await findUser({ id: selfId })

    if (!user) throw new Error("User doesnt exist");
    if (!user.friendRequestList.includes(selfId)) throw new Error("Cant cancel nonexistent request");

    const newUserFriendRequestList = user.friendRequestList.filter((id: string) => { return id != selfId })
    const newSelfPendingFriendRequest = self.pendingFriendRequest.filter((id: string) => { return id != userId })

    await updateUser({ id: userId }, { friendRequestList: newUserFriendRequestList, })
    await updateUser({ id: selfId }, { pendingFriendRequest: newSelfPendingFriendRequest })

    return true;
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

export const sendFriendRequest = async ({ friendId, selfId }: { friendId: string, selfId: string }) => {
    console.log(friendId, selfId)
    const user = await findUser({ id: friendId })
    if (user.friendRequestList.includes(selfId)) throw new Error("Request already sent");

    await updateUser({ id: friendId }, { friendRequestList: { push: selfId, } })
    await updateUser({ id: selfId }, { pendingFriendRequest: { push: friendId, } })

    return true;
}

export const acceptFriendRequest = async ({ userId, selfId }: { userId: string, selfId: string }) => {
    const user = await findUser({ id: userId })
    const self = await findUser({ id: selfId })

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


export const unfriendUser = async ({ userId, selfId }: { userId: string, selfId: string }) => {
    const user = await findUser({ id: userId })
    const self = await findUser({ id: selfId })

    if (!user) throw new Error("User doesnt exist");
    if (!user.friendList.includes(selfId)) throw new Error("Cant decline nonexistent request");

    const newUserFriendList = user.friendList.filter((id: string) => { return id != selfId })
    const newSelfFriendList = self.friendList.filter((id: string) => { return id != userId })

    await updateUser({ id: userId }, { friendList: newUserFriendList, })
    await updateUser({ id: selfId }, { friendList: newSelfFriendList, })

    return true;
}

