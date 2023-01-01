import create from "zustand";

import { getRequest, postRequest, deleteRequest } from "../utils/axios.util";

import {
    IChat,
    IUser,
} from "../interfaces/userStore.interface";

const friendStore = create<IFriendStore>()((set, get) => ({
    friendList: [],
    friendRequestList: [],
    pendingInviteList: [],

    init: async () => {
        const res = await getRequest('friends/init');
        if (res.status === 200) {
            set((state) => ({
                ...state,
                friendList: res.data.friendList,
                friendRequestList: res.data.friendRequestList,
                pendingInviteList: res.data.pendingInviteList,

            }))
        } else alert("sth went wrong")
    },
    acceptFriendRequest: async ({ firstName, lastName, id }) => {
        const res = await postRequest(`friends`, { userId: id });
        if (res.status === 200) {
            set((state) => ({
                ...state,
                friendRequestList: state.friendRequestList.filter((user) => user.id !== id),
                friendList: [...state.friendList, { firstName, lastName, id }],
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

    sendFriendRequest: async ({ firstName, lastName, id }) => {
        const res = await postRequest('friends/requests', { userId: id });
        if (res.status === 200) {
            set((state) => ({
                ...state,
                pendingInviteList: [...state.pendingInviteList, { firstName, lastName, id }],
            }))
        } else alert("sth went wrong")
    },

    addFriendRequest: (user) => {
        const friendRequestList = get().friendRequestList;
        set((state) => ({
            ...state,
            friendRequestList: [...friendRequestList, user]
        }))
    },

    removeFriendRequest: (user) => {
        const friendRequestList = get().friendRequestList.filter((el) => el.id != user);
        set((state) => ({
            ...state,
            friendRequestList
        }))
    },

    removeFriend: (user) => {
        const friendList = get().friendList.filter((el) => el.id != user);
        set((state) => ({
            ...state,
            friendList
        }))
    },

    addFriend: (user) => {
        const friendList = get().friendList;
        set((state) => ({
            ...state,
            friendList: [user, ...friendList],
        }))
    },
    
    unfriendUser: async (id) => {
        const res = await deleteRequest(`friends/${id}`);
        if (res.status === 200) {
            set((state) => ({
                ...state,
                friendList: state.friendList.filter((user) => user.id !== id)
            }))
        } else alert("sth went wrong")
    }
}))

export interface IFriendStore {
    friendList: IUser[],
    friendRequestList: IUser[],
    pendingInviteList: IUser[],

    init: () => Promise<any>,
    sendFriendRequest: (user: IUser) => Promise<any>,
    acceptFriendRequest: (user: IUser) => Promise<any>,
    declineFriendRequest: (id: string) => Promise<any>,
    cancelFriendRequest: (id: string) => Promise<any>,

    //SOCKETS
    addFriendRequest: (user: IUser) => void;
    removeFriendRequest: (user: string) => void;
    removeFriend: (user: string) => void;
    addFriend: (user: IUser) => void;
    unfriendUser: (id:string) => Promise<any>
}

export default friendStore;