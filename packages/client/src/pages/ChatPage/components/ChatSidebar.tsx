import React, { useEffect, useState } from 'react';

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
import getMessage from '../../../hooks/sockets/getMessage';



dayjs.extend(relativeTime);


export default function ChatSide() {
    const userStore = StoreUser();
    const chatStore = StoreChat();

    const [chats, setChats] = useState<IChat[]>([]);
    const { data } = trpc.chats.fetchChats.useQuery();
    const { message: newMessage } = getMessage();

    useEffect(() => {
        if (!newMessage) return;
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
        <div className='flex flex-col w-14 md:w-60 lg:w-80 util-pad border-box'>
            <div className='flex py-2'>
                <p className='text-xl font-bold text-white grow'>Chats</p>
                <BsThreeDots className='hidden w-6 h-6 p-1 bg-gray-600 rounded-full md:block' />
            </div>
            <input type="text" placeholder=' Search in hermes' className='hidden w-full rounded-xl md:block' />
            <div className='mt-4 overflow-auto grow'>
                <div className=''>
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
                                    if (chatStore.openedChat?.id !== chat.id)
                                        chatStore.openChat({
                                            chatId: chat.id,
                                            name: friend.firstName + ' ' + friend.lastName
                                        })
                                }}
                                clicked={chat.id === chatStore.openedChat?.id}
                                key={`Side-${friend.id}`} />
                        )
                    })
                }
                </div>
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
        <div className={`flex py-2 px-1 items-center rounded-md ${clicked ? "bg-blue-200" : "hover:bg-gray-600"}`} onClick={click}>
            <div className={"w-12 h-12 rounded-full overflow-hidden flex items-center justify-center"} >
                <Avatar id={id} />
            </div>
            <section className='flex-col justify-center hidden px-2 md:flex grow'>
                <span className='font-sans text-sm font-semibold text-white'>{friendName}</span>
                <span className='text-xs font-normal '>{isMessYours ? "You: " : ""} {lastMessage ? lastMessage.message.length < 15 ? lastMessage.message : lastMessage.message.slice(0,15) + "..." : "Noone Sent yet"}</span>
            </section>
            <section className='flex-col items-center justify-center hidden md:flex'>
                <span className='text-xxs'>{lastMessage ? longAgo : ""}</span>
            </section>
        </div>
    )
}