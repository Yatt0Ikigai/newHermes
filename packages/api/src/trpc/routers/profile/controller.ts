import { findUser } from "../../../utils/prisma/userUitls";

export const getUserInfo = async ({ getUser, authorId }: { getUser: string, authorId: string }) => {
    const requestedUser = await findUser({
        id: getUser,
    }, {
        avatar: true,
        firstName: true,
        lastName: true,
        friendList: true,
        friendRequestList: true,
        pendingFriendRequest: true,
        
    });

    return {
        avatar: requestedUser.avatar,
        firstName: requestedUser.firstName,
        lastName: requestedUser.lastName,
        friendList: requestedUser.friendList.slice(9),
        friendNumber: requestedUser.friendList.length,
        owner: getUser === authorId,
        friend: requestedUser.friendList.includes(authorId),
        pendingRequest: requestedUser.friendRequestList.includes(authorId),
        sendedRequest: requestedUser.pendingFriendRequest.includes(authorId)
    }
}