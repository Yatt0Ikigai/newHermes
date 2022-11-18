import create from "zustand";
import io, { Socket } from "socket.io-client";

import { getRequest, postRequest, deleteRequest } from "../utils/axios.util";
import { devtools } from "zustand/middleware";

import {
    IChat,
    IUser,
} from "../interfaces/userStore.interface";

const userStore = create<IUserStore>()(devtools((set, get) => ({
    status: { loading: false, error: null },
    firstName: "",
    lastName: "",
    id: "",
    friendList: [],
    friendRequestList: [],
    pendingInviteList: [],
    chatsList: [],
    socket: null,

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
                friendList: res.data.friendList,
                friendRequestList: res.data.friendRequestList,
                pendingInviteList: res.data.pendingFriendRequest,
                chatsList: res.data.chats,
            });
            if (!get().socket) {
                const socket = io('http://localhost:9000');
                socket.emit("setup", {
                    id: res.data.id
                })
                set((state) => ({
                    ...state,
                    socket
                }))
            }
        }
        else set((state) => ({
            ...state,
            status: {
                loading: false,
                error: res.data
            }
        }))
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

    unfriendUser: async (id) => {
        const res = await deleteRequest(`friends/${id}`);
        if (res.status === 200) {
            set((state) => ({
                ...state,
                friendList: state.friendList.filter((user) => user.id !== id)
            }))
        } else alert("sth went wrong")
    },

    startChat: async (userId) => {
        const isChat = get().chatsList.find((chat: any) => {
            return chat.participants.includes(userId) === true;
        })
        if (isChat) return isChat.id;
        const res = await postRequest('chats', { participants: [userId, get().id] });
        set((state) => ({
            ...state,
            chatsList: [...state.chatsList, res.data.id],
        }))
        return res.data.id;
    },

    findChat: (chatId) => {
        return get().chatsList.find(el => el.id === chatId) as IChat;
    },

    findChatByUser: (user) => {
        const res = get().chatsList.find(el => {
            return el.participants.find(x => x.id === user.id)
        }) as IChat;
        return res
    }
})))


export interface IUserStore {
    status: { loading: boolean, error: string | null },
    firstName: string,
    lastName: string,
    id: string,
    friendList: IUser[],
    friendRequestList: IUser[],
    pendingInviteList: IUser[],
    chatsList: IChat[],
    socket: Socket | null,
    sendFriendRequest: (user: IUser) => Promise<any>,
    acceptFriendRequest: (user: IUser) => Promise<any>,
    declineFriendRequest: (id: string) => Promise<any>,
    cancelFriendRequest: (id: string) => Promise<any>,
    unfriendUser: (id: string) => Promise<any>,
    getUserInfo: () => Promise<any>,
    startChat: (userId: string) => Promise<string | undefined>,
    findChat: (chatId: string) => IChat;
    findChatByUser: (user: IUser) => IChat; 
}

export default userStore;
