import { findUser } from "../../../utils/prisma/userUitls";

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

export const getFriendRequests = async ({ userId }: { userId: string }) => {
    const user = await findUser({ id: userId }, { friendRequestList: true })
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