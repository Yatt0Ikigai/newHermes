import React, { useEffect, useState } from 'react';

import { AiOutlinePlus } from "react-icons/ai";
import { CgProfile } from 'react-icons/cg';

import StoreUser from "../stores/userStore";
import StoreChat from "../stores/chatStore";

import { IMessage } from "../interfaces/chatStore.interface";

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import { BsThreeDots } from 'react-icons/bs';
import Avatar from './Avatar';

dayjs.extend(relativeTime);


export default function ChatSide() {
    const userStore = StoreUser();
    const chatStore = StoreChat();

    return (
        <div className='flex flex-col col-span-2 lg:col-span-3 util-pad'>
            <div className='hidden lg:flex'>
                <input type="text" placeholder='Search' className='grow' />
                <AiOutlinePlus />
            </div>
            <div className='flex-grow overflow-auto'>
                <label htmlFor="my-modal-4" className='flex items-center justify-center py-4 lg:hidden'>
                    <BsThreeDots className='w-6 h-6 rounded-full sm:w-7 sm:h-7 lg:w-8 lg:h-8' />
                </label>
                {
                    chatStore.chatsList.map((chat) => {
                        const friend = chat.participants.find((u) => u.id != userStore.id);
                        if (friend) return (
                            <Chat
                                id={friend.id}
                                friendName={friend.firstName + ' ' + friend.lastName}
                                lastMessage={chat.lastMessage}
                                isMessYours={chat.lastMessage?.senderId === userStore.id}
                                click={() => {
                                    chatStore.loadMessages(chat.id)
                                }}
                                clicked={chat.id === chatStore.openedChat?.id} />
                        )
                    })
                }
            </div>



            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="cursor-pointer modal">
                <label className="relative modal-box" htmlFor="">
                    <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                </label>
            </label>
        </div>
    )
}


const Chat = ({ id, friendName, lastMessage, click, clicked, isMessYours }: { id: string, friendName: string, lastMessage: IMessage | null, click: () => void, clicked: boolean, isMessYours: boolean }) => {
    const [longAgo, setLongAgo] = useState(dayjs(lastMessage ? lastMessage.timeStamp : 0).fromNow());
    useEffect(() => {
        const interval = setInterval(() => {
            if (lastMessage) setLongAgo(dayjs(lastMessage.timeStamp).fromNow());
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (lastMessage) setLongAgo(dayjs(lastMessage.timeStamp).fromNow());
    }, [lastMessage]);

    return (
        <div className={`grid lg:grid-cols-5 py-2 justify-center ${clicked ? "bg-gray-400" : ""}`} onClick={click}>
            <span className='flex items-center justify-center'>
                <div className={"w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full overflow-hidden"} >
                    <Avatar id={id} />
                </div>
            </span>
            <section className='flex-col justify-center hidden col-span-3 lg:flex'>
                <span className='text-sm font-semibold'>{friendName}</span>
                <span className='text-xs font-normal'>{isMessYours ? "You: " : ""} {lastMessage ? lastMessage.message : "Noone Sent yet"}</span>
            </section>
            <section className='flex-col items-center justify-center hidden lg:flex'>
                <span className='text-xxs'>{lastMessage ? longAgo : ""}</span>
            </section>

        </div>
    )
}