import create from "zustand";

import { postRequest } from "./utils/axios.util";

const actionStore = create<IActionStore>()(
    (set) => ({
        searchedUsers: [],
        searchForUser: async(name) => {
            const res = await postRequest("users", {username: name})
            if(res.status === 200) set({searchedUsers: res.data})
        },
    })
)

export interface IActionStore {
    searchedUsers: {firstName: string, lastName:string, id:string, isFriend:boolean}[]
    searchForUser: (name:string) => Promise<void>,
}


export default actionStore;