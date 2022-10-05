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
        const res = await getRequest("user/info");
        if (res.status === 200) set({
            status: { loading: false, error: null },
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            id: res.data.id,
            friendList: res.data.friendList,
            friendRequestList: res.data.friendRequestList,
            pendingInviteList: res.data.pendingFriendRequest,
        });
        else set((state) => ({
            ...state,
            status: {
                loading: false,
                error: res.data
            }
        }))
    },

    acceptFriendRequest: async (id) => {
        const res = await postRequest(`user/request`, {
            userId: id,
        });
        if (res.status === 200) {
            set((state) => ({
                ...state,
                friendList: [...state.friendList, id],
                friendRequestList: state.friendRequestList.filter((user) => user !== id),
            }))
        } else alert("sth went wrong")
    },

    cancelFriendRequest: async (id) => {
        const res = await deleteRequest(`user/friend/request/${id}`)
        if (res.status === 200) {
            set((state) => ({
                ...state,
                pendingInviteList: state.pendingInviteList.filter((user) => user !== id)
            }))
        } else alert("sth went wrong")
    },

    declineFriendRequest: async (id) => {
        const res = await deleteRequest(`user/request/${id}`)
        if (res.status === 200) {
            set((state) => ({
                ...state,
                friendRequestList: state.friendRequestList.filter((user) => user !== id),
            }))
        } else alert("sth went wrong")
    },

    sendFriendRequest: async (id) => {
        const res = await postRequest('user/friend/request', {
            userId: id
        });
        if (res.status === 200) {
            set((state) => ({
                ...state,
                pendingInviteList: [...state.pendingInviteList, id],
            }))
        } else alert("sth went wrong")

    },

    unfriendUser: async (id) => {
        const res = await deleteRequest(`user/friend/${id}`);
        if (res.status === 200) {
            set((state) => ({
                ...state,
                friendList: state.friendList.filter((user) => user !== id)
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
    friendList: string[],
    friendRequestList: string[],
    pendingInviteList: string[],
    sendFriendRequest: (id: string) => Promise<any>,
    acceptFriendRequest: (id: string) => Promise<any>,
    declineFriendRequest: (id: string) => Promise<any>,
    cancelFriendRequest: (id: string) => Promise<any>,
    unfriendUser: (id: string) => Promise<any>,
    getUserInfo: () => Promise<any>,
}

export default userStore;
