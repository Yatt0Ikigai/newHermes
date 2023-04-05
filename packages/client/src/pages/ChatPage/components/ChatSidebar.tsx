import React, { useEffect, useState } from 'react';

import { Link, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

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
import { AiOutlinePlus } from 'react-icons/ai';

interface IChatData {
    chatId: string,
    chatName: string,
    chatImage: string,
}

dayjs.extend(relativeTime);


export default function ChatSide() {
    const userStore = StoreUser();
    const chatStore = StoreChat();
    const navigate = useNavigate();
    const [urlParams, setUrlParams] = useSearchParams();
    const [chats, setChats] = useState<IChat[]>([]);
    const [chatData, setChatData] = useState<IChatData | null>(null);
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
        <div className='flex flex-col w-22 border-r border-accent md:w-60 lg:w-80 util-pad border-box'>
            <section className='p-2 mb-4'>
                <div className='flex flex-col justify-center md:flex-row items-center'>
                    <span className='mb-2 text-2xl font-bold text-white grow'>Chats</span>
                    <Link to={'/chats/new'}>
                        <AiOutlinePlus className="w-6 h-6" />
                    </Link>
                </div>
                <input type="text" placeholder='Search in hermes' className='box-border hidden w-full px-4 py-2 text-white rounded-2xl md:block bg-secondaryBackground focus:outline-none' />
            </section>
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
                                        if (chat.id === chatData?.chatId) return;
                                        chatStore.openChat({
                                            chatId: chat.id,
                                            chatName: friend.firstName + ' ' + friend.lastName,
                                            chatImage: friend.id,
                                            chatParticipants: chat.participants
                                        })
                                        setChatData({
                                            chatId: chat.id,
                                            chatImage: friend.id,
                                            chatName: friend.firstName + ' ' + friend.lastName,
                                        })
                                        navigate(`/chats?chatId=${chat.id}`)
                                    }}
                                    clicked={chat.id === urlParams.get("chatId")}
                                    key={`Side-${friend.id}`} />
                            )
                        })
                    }
                </div>
            </div>
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
        <div className={`flex p-2 items-center justify-center rounded-md transition-all ${clicked ? "bg-tertiaryBackground" : "hover:bg-secondaryBackground"}`} onClick={click}>
            <div className={"w-16 h-16 rounded-full overflow-hidden flex items-center justify-center"} >
                <Avatar id={id} />
            </div>
            <section className='flex-col justify-center hidden px-2 md:flex grow'>
                <span className='font-sans text-sm font-semibold text-white'>{friendName}</span>
                <span className='text-xs font-normal '>{isMessYours ? "You: " : ""} {lastMessage ? lastMessage.message.length < 15 ? lastMessage.message : lastMessage.message.slice(0, 15) + "..." : "Noone Sent yet"}</span>
            </section>
            <section className='flex-col items-center justify-center hidden md:flex'>
                <span className='text-xxs'>{lastMessage ? longAgo : ""}</span>
            </section>
        </div>
    )
}