import create from "zustand";
import { persist, devtools } from "zustand/middleware";
import axios from "axios";
import { getRequest, postRequest } from "./utils/axios.util";
const authStore = create<IauthStore>()(
    devtools(
        (set) => ({
            userStatus: { logged: false, loading: true, error: null },
            authIsLogged: async () => {
                const res = await getRequest("is-logged");
                if (res.status === 200) set({ userStatus: { logged: true, loading: false, error: null } });
                else if (res.status === 290) set({ userStatus: { logged: false, loading: false, error: null } });
                else set({ userStatus: { logged: false, loading: false, error: res.data } });
            },

            authLogIn: async (email, password) => {
                const res = await postRequest(
                    "login",
                    {
                        username: email.toLowerCase(),
                        password: password,
                    })
                if (res.status === 200) set({ userStatus: { logged: true, loading: false, error: null } });
                else set({ userStatus: { logged: false, loading: false, error: res.data } });
            },

            authLogOut: async () => {
                const res = await getRequest("logout");
                if (res.status === 200) set({ userStatus: { logged: false, loading: false, error: null } });
            },

            authRegister: async (firstName, lastName, email, password) => {
                const res = await postRequest(
                    "register",
                    {
                        email: email.toLowerCase(),
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                    });
                if (res.status === 200) set({ userStatus: { logged: true, loading: false, error: null } });
                set({ userStatus: { logged: false, loading: false, error: null } })
            },
        })))

export interface IauthStore {
    userStatus: { logged: boolean, loading: boolean, error: string | null },
    authIsLogged: () => Promise<void>,
    authLogIn: (email: string, password: string) => Promise<void>,
    authLogOut: () => Promise<void>,
    authRegister: (firstName: string, lastName: string, email: string, password: string) => Promise<void>,
}
export default authStore;
