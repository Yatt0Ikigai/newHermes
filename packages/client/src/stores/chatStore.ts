import create from "zustand";

import { IChat } from "../interfaces/chatStore.interface";
import { IUser } from "../interfaces/userStore.interface";

const chatStore = create<IChatStore>()(
    (set, get) => ({
        openedChat: null,
        messages: [],
        chatsList: [],

        openChat: (chat) => {
            set((state) => ({
                ...state,
                openedChat: chat,
            }))
        },
    })
)

export interface IChatStore {
    chatsList: IChat[],
    openedChat: {
        chatId: string,
        chatImage: string,
        chatName: string,
        chatParticipants: IUser[]
    } | null,
    openChat: (obj: {
        chatId: string,
        chatImage: string,
        chatName: string,
        chatParticipants: IUser[]
    }) => void;
}



export default chatStore;