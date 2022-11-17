import create from "zustand";
import { getMessages } from "../../../api/src/controllers/chats.controller";

import { getRequest, postRequest } from "../utils/axios.util";
import userStore from "./userStore";


const chatStore = create<IChatStore>()(
    (set) => ({
        selectedChat: "",
        messages: [],
        getMessages: async (id) => {
            const res = await getRequest(`chats/${id}`)
            if (res.status === 200) {
                set((state) => ({
                    ...state,
                    messages: res.data
                }))
            } else alert("sth went wrong")
        },
        sendMessages: async (senderId, chatId, message) => {
            const res = await postRequest(`chats/${chatId}/message`, { message })
        },
        selectChat: (id) => {
            set((state) => ({
                ...state,
                selectedChat: id,
            }))
        },
        newMess: ({ senderId, message, id }: { senderId: string, message: string, id: string }) => {
            console.log("Got msg" + [senderId, message, id])
            set((state) => ({
                ...state,
                messages: [{
                    id,
                    message,
                    senderId,
                }, ...state.messages]
            }))
        }
    })
)

export interface IChatStore {
    selectedChat: string,
    messages: { senderId: string, message: string, id: string }[],
    getMessages: (id: string) => Promise<any>,
    sendMessages: (senderId: string, chatId: string, message: string) => Promise<any>,
    selectChat: (id: string) => void,
    newMess: ({ senderId, message, id }) => void,
}


export default chatStore;