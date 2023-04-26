import { readImg } from "../../../utils/awsUtils";
import { findUser, updateUser } from "../../../utils/prisma/userUitls";

export const getAvatar = async ({ id }: { id: string }) => {
    try {
        const user = await findUser({ id }, { avatar: true })
        if (user.avatar) return await readImg(user.avatar);
        return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png";
    } catch {
        (e: any) => {
            return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
        }
    }


}

export const updateAvatarLink = async ({ id, key }: { id: string, key: string }) => {
    return await updateUser({ id }, { avatar: key })
}

export const getUserInfoById = async ({ id, selfId }: { id: string, selfId: string }) => {
    const user = await findUser({ id: id });
    
    const res = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        friend: user.friendList.includes(selfId),
        friendRequest: user.pendingFriendRequest.includes(selfId),
        sentFriendRequest: user.friendRequestList.includes(selfId),
        admin: (id === selfId)
    }
    return res;
}