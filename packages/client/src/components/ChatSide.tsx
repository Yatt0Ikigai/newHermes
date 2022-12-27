import React, { MouseEventHandler } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import { CgProfile } from 'react-icons/cg';

import StoreUser from "../stores/userStore";
import StoreChat from "../stores/chatStore";

export default function ChatSide() {
    const userStore = StoreUser();
    const chatStore = StoreChat();

    console.log(userStore.chatsList)
    return (
        <div className='col-span-3 util-pad flex flex-col'>
            <div className='flex'>
                <input type="text" placeholder='Search' className='grow' />
                <AiOutlinePlus />
            </div>
            <div className='flex-grow overflow-auto'>
                {
                    userStore.chatsList.map((chat) => {
                        const friend = chat.participants.find((u) => u.id != userStore.id);
                        if (friend) return (
                            <Chat
                                friendName={friend.firstName + ' ' + friend.lastName} 
                                lastMessage={chat.lastMessage.message ? chat.lastMessage.message : "Noone Sent msg yet" }
                                lastMessageAuth={chat.lastMessage.author}
                                click={() => {
                                    chatStore.loadMessages(chat.id)
                                }}
                                clicked={chat.id === chatStore.openedChat?.id}/>
                        )
                    })
                }
            </div>
        </div>
    )
}


const Chat = ({ friendName, lastMessage, click, clicked, lastMessageAuth }: { friendName: string, lastMessage: string, click:() => void, clicked: boolean, lastMessageAuth: string | null}) => {
    return (
        <div className={`grid grid-cols-5 py-4 justify-center ${clicked ? "bg-gray-400" : ""}`} onClick={click}>
            <span className='flex justify-center items-center'>
                <CgProfile className={"avatar-img"} />
            </span>
            <section className='col-span-3 flex flex-col justify-center'>
                <span className='text-sm font-semibold'>{friendName}</span>
                <span className='text-xs font-normal'>{lastMessageAuth}: {lastMessage}</span>
            </section>
            <section className='flex flex-col justify-center items-center'>
                <span className='text-xs'>2h</span>
                <span className='text-xs p-2 rounded-full bg-blue-400 w-4 text-center visible'>11</span>
            </section>
        </div>
    )
}