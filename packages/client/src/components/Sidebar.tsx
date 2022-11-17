import React, { useEffect, useState } from 'react'
import { HiViewList } from "react-icons/hi";
import { useFetch } from "react-async";

import userStore from '../stores/userStore';
import actionStore from '../stores/actionStore';
import chatStore from "../stores/chatStore";

export default function Sidebar() {
    const storeUser = userStore();
    const storeAction = actionStore();
    const storeChat = chatStore();

    const [filterChat, setFilterChat] = useState<string>("");

    return (
        <div className='main-friendlist h-full'>
            <section className='flex justify-around items-center'>
                <p>Chats</p>
                <label htmlFor="my-modal-20" className="btn btn-circle modal-button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 13L 18 13M 12 7l 0 11" /></svg>
                </label>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn m-1 rounded-full">...</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <label htmlFor="my-modal-6">
                                Add friends
                            </label>
                        </li>
                        <li>
                            <label htmlFor="my-modal-10">
                                Requests
                            </label>
                        </li>
                    </ul>
                </div>
            </section>
            <input type="text" placeholder="Search" className="input input-bordered m-4 w-[calc(100%-2rem)]" value={filterChat} onChange={((e) => {
                setFilterChat(e.currentTarget.value)
            })} />
            <section>
                {
                    storeUser.chatsList.map((chat) => {
                        return (
                            <div
                                key={"chat-" + chat.id} className={`${storeChat.selectedChat === chat.id ? "bg-slate-100" : ""}`}
                                onClick={() => {
                                    storeChat.selectChat(chat.id);
                                    storeChat.getMessages(chat.id);
                                }}>
                                <p>{chat.participants.find((user) => {
                                    return user.id != storeUser.id;
                                })?.firstName }</p>
                                <p>{ chat.lastMessage ? chat.lastMessage.author + ": " + chat.lastMessage.message : "Noone sent message Yet"}</p>
                            </div>
                        )
                    })
                }
            </section>
        </div>
    )
}