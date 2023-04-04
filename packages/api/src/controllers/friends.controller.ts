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


