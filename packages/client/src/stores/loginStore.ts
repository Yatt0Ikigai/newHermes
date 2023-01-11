import create from "zustand";
import { persist, devtools } from "zustand/middleware";
import axios from "axios";
import { getRequest, postRequest } from "../utils/axios.util";
const authStore = create<IauthStore>()(
    devtools(
        (set) => ({
            authIsLogged: async () => {
                const isLogged = await getRequest("is-logged");
                return isLogged.data;
            },

            authLogIn: async (email, password) => {
                const res = await postRequest(
                    "login",
                    {
                        username: email.toLowerCase(),
                        password: password,
                    });
                return res.status === 200;
            },

            authLogOut: async () => {
                const res = await getRequest("logout");
                return res.status === 200;
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
                return res.status === 200;
            },
        })))

export interface IauthStore {
    authIsLogged: () => Promise<boolean>,
    authLogIn: (email: string, password: string) => Promise<boolean>,
    authLogOut: () => Promise<boolean>,
    authRegister: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>,
}
export default authStore;
