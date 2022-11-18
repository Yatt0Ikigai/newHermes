import create from "zustand";
import { getMessages } from "../../../api/src/controllers/chats.controller";

import { getRequest, postRequest } from "../utils/axios.util";
import userStore from "./userStore";

import { IMessage, IChat, ISendMess } from "../interfaces/chatStore.interface";
import { IChat as IChatUserStore } from "../interfaces/userStore.interface";

const chatStore = create<IChatStore>()(
    (set, get) => ({
        selectedChat: "",
        openedChats: [],

        loadMessages: async (chatId) => {
            const res = await getRequest(`chats/${chatId}`)
            if (res.status === 200) {
                var chats = get().openedChats;
                var chat = chats.find((ch) => ch.chatId === chatId) as IChat
                chat.messages = res.data;
                chat.loading = false;
                chats = chats.map((ch) => ch.chatId === chatId ? chat : ch);
                set((state) => ({
                    ...state,
                    openedChats: chats
                }));
            } else alert("sth went wrong")
        },

        sendMessage: async (mess) => {
            await postRequest(`chats/${mess.chatId}/message`, { message: mess.message })
        },

        receivedMessage: (mess) => {
            var chats = get().openedChats;
            var specificChat = get().openedChats.find(ch => ch.chatId === mess.chatId);
            if (specificChat) {
                specificChat.messages = [mess, ...specificChat.messages];
                chats = chats.map((ch) => ch.chatId === mess.chatId ? specificChat as IChat : ch)
                set((state) => ({
                    ...state,
                    openedChats: chats,
                }))
            } else {

            }
        },

        openChat: (chat) => {
            var isOpened = get().openedChats.find((ch) => ch.chatId === chat.id)
            if (isOpened) return;
            const newChat = {
                chatId: chat.id,
                loading: true,
                messages: [],
                name: "",
                participants: chat.participants,
            } as IChat;
            set((state) => ({
                ...state,
                openedChats: [newChat, ...get().openedChats]
            }))
            get().loadMessages(newChat.chatId);
        }
    })
)

export interface IChatStore {
    openedChats: IChat[],
    receivedMessage: (message: IMessage) => void,
    loadMessages: (chatId: string) => Promise<any>,
    sendMessage: (mess: ISendMess) => Promise<any>,
    openChat: (chat: IChatUserStore) => void;
}


export default chatStore;