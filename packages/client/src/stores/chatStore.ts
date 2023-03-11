import create from "zustand";

import { getRequest, postRequest } from "../utils/axios.util";
import userStore from "./userStore";

import { IMessage, IChat, ISendMess } from "../interfaces/chatStore.interface";
import { IChat as IChatUserStore } from "../interfaces/userStore.interface";

const chatStore = create<IChatStore>()(
    (set, get) => ({
        openedChat: null,
        messages: [],
        chatsList: [],

        openChat: (obj: {
            chatId: string,
            name: string
        }) => {
            set((state) => ({
                ...state,
                openedChat: {
                    id: obj.chatId,
                    name: obj.name
                }
            }))
        },

        startChat: async (friendId: string, selfId: string) => {
            const isChat = get().chatsList.find((chat: any) => {
                return chat.participats.includes(friendId) === true;
            })
            if (isChat) return isChat.id;
            const res = await postRequest('chats', { participants: [friendId, selfId] });
            set((state) => ({
                ...state,
                chatsList: [...state.chatsList, res.data.chat],
            }))
            console.log(res.data.chat)
            return res.data;
        },

        findChat: (chatId: string) => {
            return get().chatsList.find(el => el.id === chatId) as IChat;
        },

        init: async () => {
            const res = await getRequest("chats/init");
            set((state) => ({
                ...state,
                chatsList: [...res.data]
            }))
            console.log(res.data);
        }
    })
)

export interface IChatStore {
    chatsList: IChat[],
    openedChat: {
        name: string,
        id: string
    } | null,
    messages: IMessage[],
    openChat: (obj: {
        chatId: string,
        name: string
    }) => void;

    init: () => Promise<any>,
}



export default chatStore;