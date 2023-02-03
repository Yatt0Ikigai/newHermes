import { string } from "zod";
import { readImg, uploadImg } from "../../../utils/awsUtils";
import { findUser, updateUser } from "../../../utils/userUitls";

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