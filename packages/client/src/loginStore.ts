import create, { StateCreator } from "zustand";
import { persist, devtools } from "zustand/middleware";
import axios from "axios";

const authStore = create<IauthStore>()(
    devtools(
        persist((set) => ({
            isLogged: false,
            authLogIn: async (email, password) => {
                axios({
                    method: "post",
                    data: {
                        username: email.toLowerCase(),
                        password: password,
                    },
                    withCredentials: true,
                    url: "http://localhost:8080/login",
                }).then(res => {
                    if (res.data === "SUCCESFUL LOGGED") set({ isLogged: true })
                }).catch(err => {
                    if (err.response.status === 401) alert("Wrong email or password");
                });
            },
            authLogOut: async () => {
                axios({
                    method: "get",
                    withCredentials: true,
                    url: "http://localhost:8080/logout",
                }).then(res => {
                    console.log(res);
                    set({ isLogged: false })
                });
            },
            authRegister: async (firstName, lastName, email, password) => {
                console.log(firstName,lastName,email,password);
                axios({
                    method: "post",
                    data: {
                        email: email.toLowerCase(),
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                    },
                    withCredentials: true,
                    url: "http://localhost:8080/register",
                }).then(res => {
                    if (res.data === "SUCCESFULY REGISTERED") set({ isLogged: true });
                    else alert(res);
                }).catch(err => {
                    if (err.response.status === 401) alert("Wrong email or password");
                });
            }
        }), {
            name: "authStore",
            getStorage: () => sessionStorage,
        })))

export interface IauthStore {
    isLogged: boolean,
    authLogIn: (email: string, password: string) => Promise<void>,
    authLogOut: () => Promise<void>,
    authRegister: (firstName: string, lastName: string, email: string, password: string) => Promise<void>,
}
export default authStore;
