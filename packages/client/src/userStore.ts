import create from "zustand";
import produce from "immer";

import { getRequest, postRequest, deleteRequest } from "./utils/axios.util";

const userStore = create<IUserStore>()((set) => ({
    status: { loading: true, error: null },
    firstName: "",
    lastName: "",
    id: "",
    friendList: [],
    requestList: [],
    pendingInviteList: [],

    getUserInfo: async () => {
        const res = await getRequest("user/info");
        if (res.status === 200) set({
            status: { loading: false, error: null },
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            id: res.data.id,
            friendList: res.data.friendList,
            requestList: res.data.requestList,
            pendingInviteList: res.data.pendingFriendRequest,
        });
    },

    acceptFriendRequest: async (id, firstName, lastName) => {
        const res = await postRequest(`user/friend/request`, {
            userId: id,
        });
        if (res.status === 200) {
            set((state) => ({
                ...state,
                friendList: [...state.friendList, { firstName: firstName, lastName: lastName, id: id }],
                requestList: state.requestList.filter((user) => user.id !== id),
            }))
        } else alert("sth went wrong")
    },

    cancelFriendRequest: async (id) => {
        const res = await deleteRequest(`user/friend/request/${id}`)
        if (res.status === 200) {
            set((state) => ({
                ...state,
                pendingInviteList: state.pendingInviteList.filter((user) => user.id !== id)
            }))
        } else alert("sth went wrong")
    },

    declineFriendRequest: async (id) => {
        const res = await deleteRequest(`user/request/${id}`)
        if (res.status === 200) {
            set((state) => ({
                ...state,
                requestList: state.requestList.filter((user) => user.id !== id),
            }))
        } else alert("sth went wrong")
    },

    sendFriendRequest: async (id, firstName, lastName) => {
        const res = await postRequest('user/friend/request', {
            userId: id
        });
        if (res.status === 200) {
            set((state) => ({
                ...state,
                state: [...state.pendingInviteList, { id, firstName, lastName }],
            }))
        } else alert("sth went wrong")

    },

    unfriendUser: async (id) => {
        const res = await deleteRequest(`user/friend/${id}`);
        if (res.status === 200) {
            set((state) => ({
                friendList: state.friendList.filter((user) => user.id !== id)
            }))
        } else alert("sth went wrong")
    },
}))


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
    requestList: IUser[],
    pendingInviteList: IUser[],
    sendFriendRequest: (id: string, firstName: string, lastName: string) => Promise<any>,
    acceptFriendRequest: (id: string, firstName: string, lastName: string) => Promise<any>,
    declineFriendRequest: (id: string, firstName: string, lastName: string) => Promise<any>,
    cancelFriendRequest: (id: string, firstName: string, lastName: string) => Promise<any>,
    unfriendUser: (id: string) => Promise<any>,
    getUserInfo: () => Promise<any>,
}

export default userStore;
