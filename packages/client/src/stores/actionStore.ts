import create from "zustand";

import { getRequest, postRequest } from "../utils/axios.util";

const actionStore = create<IActionStore>()(
    (set) => ({
        searchedUsers: [],
        searchForUsers: async (name) => {
            const res = await postRequest("users", { username: name })
            if (res.status === 200) set({ searchedUsers: res.data })
        },
        getUserNameById: async (id) => {
            const res = await getRequest(`users/${id}`);
            if (res.status === 200) return res.data;
            return "SOMETHING WENT WRONG"
        }
    })
)

export interface IActionStore {
    searchedUsers: { firstName: string, lastName: string, id: string, isFriend: boolean }[]
    searchForUsers: (name: string) => Promise<void>,
    getUserNameById: (id: string) => Promise<string>
}


export default actionStore;