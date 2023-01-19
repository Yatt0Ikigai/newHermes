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

        openChat: (chatID) => {
            set((state) => ({
                ...state,
                openedChat:chatID
            }))
        },


        sendMessage: async (mess) => {
            await postRequest(`chats/${mess.chatId}/message`, { message: mess.message })
        },

        receiveMessage: (mess) => {
            let openedChat = get().openedChat;
            let chats = get().chatsList;
            //Sidebar
            let selectChat = chats.find((chat) => chat.id === mess.chatId)
            if (selectChat) {
                //bring to top
                const indexOfSelect = chats.indexOf(selectChat);
                selectChat.lastMessage = mess;
                chats.splice(indexOfSelect, 1);
                set((state) => ({
                    ...state,
                    chatsList: [selectChat as IChat, ...chats]
                }))
            } else {
                //Need Rework
                set((state) => ({
                    ...state,
                    chatsList: [{ id: mess.chatId, lastMessage: mess, name: "unknown", participants: [] }, ...chats]
                }))
            }
            //main mess
            if (openedChat && mess.chatId === openedChat) {
                const messages = get().messages;
                set((state) => ({
                    ...state,
                    messages: [mess, ...messages]
                }))
            }
        },

        closeChat: (chatId) => {

        },

        startChat: async (friendId, selfId) => {
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

        findChat: (chatId) => {
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
    openedChat: string | null,
    messages: IMessage[],
    receiveMessage: (message: IMessage) => void,
    sendMessage: (mess: ISendMess) => Promise<any>,
    closeChat: (chatId: string) => void;
    openChat: (chatID: string) => void;

    init: () => Promise<any>,
}



export default chatStore;