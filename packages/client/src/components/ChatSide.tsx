import React, { useEffect, useState } from 'react';

import { AiOutlinePlus } from "react-icons/ai";
import { CgProfile } from 'react-icons/cg';

import StoreUser from "../stores/userStore";
import StoreChat from "../stores/chatStore";

import { IMessage } from "../interfaces/chatStore.interface";

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);


export default function ChatSide() {
    const userStore = StoreUser();
    const chatStore = StoreChat();

    return (
        <div className='flex flex-col col-span-3 util-pad'>
            <div className='flex'>
                <input type="text" placeholder='Search' className='grow' />
                <AiOutlinePlus />
            </div>
            <div className='flex-grow overflow-auto'>
                {
                    chatStore.chatsList.map((chat) => {
                        const friend = chat.participants.find((u) => u.id != userStore.id);
                        if (friend) return (
                            <Chat
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
        </div>
    )
}


const Chat = ({ friendName, lastMessage, click, clicked, isMessYours }: { friendName: string, lastMessage: IMessage | null, click: () => void, clicked: boolean, isMessYours: boolean }) => {
    const [longAgo, setLongAgo] = useState(dayjs(lastMessage ? lastMessage.timeStamp : 0).fromNow());
    useEffect(() => {
        const interval = setInterval(() => {
            if(lastMessage) setLongAgo(dayjs(lastMessage.timeStamp).fromNow());
        },  10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if(lastMessage) setLongAgo(dayjs(lastMessage.timeStamp).fromNow());
    },[lastMessage])
    return (
        <div className={`grid grid-cols-5 py-4 justify-center ${clicked ? "bg-gray-400" : ""}`} onClick={click}>
            <span className='flex items-center justify-center'>
                <CgProfile className={"avatar-img"} />
            </span>
            <section className='flex flex-col justify-center col-span-3'>
                <span className='text-sm font-semibold'>{friendName}</span>
                <span className='text-xs font-normal'>{isMessYours ? "You: " : ""} {lastMessage ? lastMessage.message : "Noone Sent yet"}</span>
            </section>
            <section className='flex flex-col items-center justify-center'>
                <span className='text-xs font-extralight'>{lastMessage ? longAgo : ""}</span>
                <span className='visible w-4 p-2 text-xs text-center bg-blue-400 rounded-full'>11</span>
            </section>
        </div>
    )
}