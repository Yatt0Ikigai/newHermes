import create from "zustand";
import axios from "axios";

const userStore = create<IUserStore>()((set) => ({
    users: [],
    requestUsers: [],
    userGetRequestList: async() => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:8080/userGetRequestList",
        }).then((res) => {
            set({ requestUsers: res.data });
        }).catch(err => {
            console.log(err);
        });
    },
    userFindUser: async (name) => {
        axios({
            method: "post",
            data: {
                username: name,
            },
            withCredentials: true,
            url: "http://localhost:8080/findUserByName",
        }).then((res) => {
            set({ users: res.data });
        }).catch(err => {
            console.log(err);
        });
    },
    userSendFriendRequest: async (id) => {
        axios({
            method: "post",
            url: "http://localhost:8080/userSendFriendRequest",
            withCredentials: true,
            data: {
                userId: id,
            }
        }).then((res) => {
            alert(res.data)
        })
    },
    userAcceptFriendRequest: async (id) => {
        axios({
            method: "post",
            url: "http://localhost:8080/userAcceptFriendRequest",
            withCredentials: true,
            data: {
                userId: id,
            }
        }).then((res) => {
            alert(res.data)
        })
    },
    userDeclineFriendRequest: async (id) => {
        axios({
            method: "post",
            url: "http://localhost:8080/userDeclineFriendRequest",
            withCredentials: true,
            data: {
                userId: id,
            }
        }).then((res) => {
            alert(res.data)
        })
    },
    userUnfriendUser: async (id) => {
        axios({
            method: "post",
            url: "http://localhost:8080/userUnfriendUser",
            withCredentials: true,
            data: {
                userId: id,
            }
        }).then((res) => {
            alert(res.data)
        })
    },
    userCancelFriendRequest: async (id) => {
        axios({
            method: "post",
            url: "http://localhost:8080/userCancelFriendRequest",
            withCredentials: true,
            data: {
                userId: id,
            }
        }).then((res) => {
            alert(res.data)
        })
    },
}))

export interface IUser {
    firstName: string,
    lastName: string,
    id: string,
    isFriend: boolean,
    userSentRequest: boolean,
    friendRequest: boolean,
}

export interface IUserStore {
    users: IUser[],
    requestUsers: {firstName: string, lastName:string, id:string}[],
    userFindUser: (name: String) => Promise<any>;
    userSendFriendRequest: (id: String) => Promise<any>,
    userAcceptFriendRequest: (id: String) => Promise<any>,
    userDeclineFriendRequest: (id: String) => Promise<any>,
    userCancelFriendRequest: (id: String) => Promise<any>,
    userUnfriendUser: (id: String) => Promise<any>,
    userGetRequestList: () => Promise<any>,
}

export default userStore;
