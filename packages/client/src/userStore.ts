import create from "zustand";
import produce from "immer";

import { getRequest, postRequest, deleteRequest } from "./utils/axios.util";
import { devtools } from "zustand/middleware";

const userStore = create<IUserStore>()(devtools((set) => ({
    status: { loading: false, error: null },
    firstName: "",
    lastName: "",
    id: "",
    friendList: [],
    friendRequestList: [],
    pendingInviteList: [],

    getUserInfo: async () => {
        set((state) => ({
            ...state,
            status: { loading: true, error: null },
        }))
        const res = await getRequest("users/self");
        if (res.status === 200) {
            set({
                status: { loading: false, error: null },
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                id: res.data.id,
                friendList: (await getRequest(`friends/list/${res.data.id}`)).data,
                friendRequestList: (await getRequest(`friends/requests`)).data,
                pendingInviteList: res.data.pendingFriendRequest,
            });
        }
        else set((state) => ({
            ...state,
            status: {
                loading: false,
                error: res.data
            }
        }))
    },

    acceptFriendRequest: async ({firstName,lastName,id}) => {
        const res = await postRequest(`friends`, { userId: id });
        if (res.status === 200) {
            set((state) => ({
                ...state,
                 friendRequestList: state.friendRequestList.filter((user) => user.id !== id),
                 friendList: [...state.friendList,{firstName,lastName,id}],
            }))
        } else alert("sth went wrong")
    },

    cancelFriendRequest: async (id) => {
        const res = await deleteRequest(`friends/requests/self/${id}`);
        if (res.status === 200) {
            set((state) => ({
                ...state,
                pendingInviteList: state.pendingInviteList.filter((user) => user.id !== id)
            }))
        } else alert("sth went wrong")
    },

    declineFriendRequest: async (id) => {
        const res = await deleteRequest(`friends/requests/others/${id}`)
        if (res.status === 200) {
            set((state) => ({
                ...state,
                 friendRequestList: state.friendRequestList.filter((user) => user.id !== id),
            }))
        } else alert("sth went wrong")
    },

    sendFriendRequest: async ({firstName,lastName,id}) => {
        const res = await postRequest('friends/requests', { userId: id });
        if (res.status === 200) {
            set((state) => ({
                ...state,
                pendingInviteList: [...state.pendingInviteList, {firstName,lastName,id}],
            }))
        } else alert("sth went wrong")

    },

    unfriendUser: async (id) => {
        const res = await deleteRequest(`friends/${id}`);
        if (res.status === 200) {
            set((state) => ({
                ...state,
                friendList: state.friendList.filter((user) => user.id !== id)
            }))
        } else alert("sth went wrong")
    },

})))


interface IUser {
    firstName: string,
    lastName: string,
    id: string,
}
export interface IUserStore {
    status: { loading: boolean, error: string | null },
    firstName: string,
    lastName: string,
    id: string,
    friendList: IUser[],
    friendRequestList: IUser[],
    pendingInviteList: IUser[],
    sendFriendRequest: (user:IUser) => Promise<any>,
    acceptFriendRequest: (user:IUser) => Promise<any>,
    declineFriendRequest: (id:string) => Promise<any>,
    cancelFriendRequest: (id:string) => Promise<any>,
    unfriendUser: (id:string) => Promise<any>,
    getUserInfo: () => Promise<any>,
}

export default userStore;
