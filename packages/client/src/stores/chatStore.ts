import create from "zustand";
import { getMessages } from "../../../api/src/controllers/chats.controller";

import { getRequest, postRequest } from "../utils/axios.util";
import userStore from "./userStore";

import { IMessage, IChat, ISendMess } from "../interfaces/chatStore.interface";
import { IChat as IChatUserStore } from "../interfaces/userStore.interface";

const chatStore = create<IChatStore>()(
    (set, get) => ({
        openedChat: null,
        messages: [],
        loadMessages: async (chatId) => {
            console.log(get().messages)
            set((state) => ({
                openedChat: {
                    id: chatId,
                    loading: true,
                }
            }));
            const res = await getRequest(`chats/${chatId}`)
            if (res.status === 200) {
                set((state) => ({
                    ...state,
                    messages: res.data,
                    openedChat: {
                        id: chatId,
                        loading: false,
                    }
                }));
            } else alert("sth went wrong")
        },

        sendMessage: async (mess) => {
            await postRequest(`chats/${mess.chatId}/message`, { message: mess.message })
        },

        receivedMessage: (mess) => {
            const chat = get().openedChat;
            if (chat && mess.chatId === chat.id) {
                const messages = get().messages;
                set((state) => ({
                    ...state,
                    messages: [mess,...messages]
                }))
            }
        },

        closeChat: (chatId) => {

        }
    })
)

export interface IChatStore {
    openedChat: { id: string, loading: boolean } | null,
    messages: IMessage[],
    receivedMessage: (message: IMessage) => void,
    loadMessages: (chatId: string) => Promise<any>,
    sendMessage: (mess: ISendMess) => Promise<any>,
    closeChat: (chatId: string) => void;
}



export default chatStore;