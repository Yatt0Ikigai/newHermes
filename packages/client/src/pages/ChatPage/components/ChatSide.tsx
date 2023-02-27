import React, { useContext, useEffect, useState } from 'react';

import { AiOutlinePlus } from "react-icons/ai";

import StoreUser from "../../../stores/userStore";
import StoreChat from "../../../stores/chatStore";

import { trpc } from '../../../utils/trpc';

import { IMessage } from "../../../../types";

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import { BsThreeDots } from 'react-icons/bs';
import Avatar from '../../../components/Avatar';
import { IChat } from "../../../../types";
import { socket } from '../../../App';
import getMessage from '../../../hooks/sockets/getMessage';

dayjs.extend(relativeTime);


export default function ChatSide() {
    const userStore = StoreUser();
    const chatStore = StoreChat();

    const [chats, setChats] = useState<IChat[]>([]);

    const { data } = trpc.chats.fetchChats.useQuery();
    /*
        useEffect(() => {
            if (socket) {
                socket.on('newMessage', (message: IMessage) => {
                    console.log("Yey")
                    const filteredChat = chats.find((chat) => chat.id === message.chatId);
                    const newChats = chats.filter((chat) => message.chatId !== chat.id);
                    console.log(filteredChat, message.chatId)
                    if (!filteredChat) return;
                    setChats([{
                        lastMessage: message,
                        participants: filteredChat?.participants,
                        id: filteredChat?.id,
    
                    }, ...newChats])
    
                }) 
            }
            return () => {
                socket?.off('newMessage');
            };
        }) 
    */
    const { message: newMessage } = getMessage();

    useEffect(() => {
        if(!newMessage) return;
        const filteredChat = chats.find((chat) => chat.id === newMessage?.inboxId);
        const newChats = chats.filter((chat) => newMessage?.inboxId !== chat.id);
        if (!filteredChat) return
        setChats([{
            lastMessage: newMessage,
            participants: filteredChat?.participants,
            id: filteredChat?.id,

        }, ...newChats])
    }, [newMessage])
    
    useEffect(() => {
        if (data?.status === 'success') setChats(data.data);
    }, [data])

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
                    chats.map((chat) => {
                        const friend = chat.participants.find((u) => u.id != userStore.id);
                        if (friend) return (
                            <Chat
                                id={friend.id}
                                friendName={friend.firstName + ' ' + friend.lastName}
                                lastMessage={chat.lastMessage}
                                isMessYours={chat.lastMessage?.senderId === userStore.id}
                                click={() => {
                                    if (chatStore.openedChat === chat.id) chatStore.openChat("");
                                    else chatStore.openChat(chat.id)
                                }}
                                clicked={chat.id === chatStore.openedChat}
                                key={`Side-${friend.id}`} />
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
    const [longAgo, setLongAgo] = useState(dayjs(lastMessage ? lastMessage.createdAt : 0).fromNow());
    useEffect(() => {
        const interval = setInterval(() => {
            if (lastMessage) setLongAgo(dayjs(lastMessage.createdAt).fromNow());
        }, 10000);
        return () => clearInterval(interval);
    }, [lastMessage]);

    useEffect(() => {
        if (lastMessage) setLongAgo(dayjs(lastMessage.createdAt).fromNow());
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