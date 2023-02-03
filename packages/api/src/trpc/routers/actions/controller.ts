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