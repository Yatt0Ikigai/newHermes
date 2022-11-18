import React, { useEffect, useState } from 'react'
import { HiViewList } from "react-icons/hi";
import { useFetch } from "react-async";

import userStore from '../stores/userStore';
import actionStore from '../stores/actionStore';
import chatStore from "../stores/chatStore";

import Avatar from './Avatar';
import { findChat } from '../../../api/src/utils/chatUtils';

export default function Sidebar() {
    const storeUser = userStore();
    const storeAction = actionStore();
    const storeChat = chatStore();

    const [filterChat, setFilterChat] = useState<string>("");

    return (
        <div className='main-friendlist h-full flex flex-col'>
            <section className='flex-1 p-4'>
                {
                    storeUser.friendList.map((user) => {
                        return (
                            <div
                                key={"sidebar-" + user.id}
                                onClick={() => {
                                    const chat = storeUser.findChatByUser(user);
                                    console.log(chat);
                                    if(chat) storeChat.openChat(chat)
                                }}
                                className="my-1">
                                <div className='flex'>
                                    <Avatar avatar='https://qph.cf2.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd' online={false}/>
                                    <p className='ml-2'>{user.firstName + " " + user.lastName}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </section>
            <input type="text" placeholder="Search" className="input input-bordered m-4 w-[calc(100%-2rem)]" value={filterChat} onChange={((e) => {
                setFilterChat(e.currentTarget.value)
            })} />
        </div>
    )
}