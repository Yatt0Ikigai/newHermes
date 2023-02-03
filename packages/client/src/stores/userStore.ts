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
    socket: null,
    init: async () => {
        set((state) => ({
            ...state,
            status: { loading: true, error: null },
        }))
        const res = await getRequest("users/init");
        if (res.status === 200) {
            set({
                status: { loading: false, error: null },
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                id: res.data.id,
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
    setSocket: (socket) => {
        set((state) => ({
            ...state,
            socket
        }))
    }
})))


export interface IUserStore {
    status: { loading: boolean, error: string | null },
    id: string,
    firstName: string,
    lastName: string,

    socket: Socket | null,

    init: () => Promise<any>,
    setSocket: (Socket) => void,

}

export default userStore;
