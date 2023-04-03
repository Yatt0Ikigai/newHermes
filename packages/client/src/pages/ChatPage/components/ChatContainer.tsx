import React, { useEffect, useState } from 'react';

import { trpc } from "../../../utils/trpc";
import storeChat from '../../../stores/chatStore';
import { IMessage } from "../../../interfaces/messages.interface";
import getMessage from "../../../hooks/sockets/getMessage";
import LoadingSpinner from '../../../components/LoadingSpinner';

import Message from "./Messages";
import Avatar from '../../../components/Avatar';

import ChatInput from "./ChatInput";
import { AiOutlineInfo } from 'react-icons/ai';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { IChat } from '../../../../types';


export default function ChatContainer() {
    const { data: init } = trpc.users.getSelfInfo.useQuery();
    const [urlParams, setUrlParams] = useSearchParams();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const { message: newMessage } = getMessage();
    
    const { data } = trpc.chats.fetchChats.useQuery(undefined,{
        onSuccess: function (data) {
            if( chatStore.openedChat ) return;
            const chatId = urlParams.get('chatId');
            const chats = data.data as IChat[];
            chats.map((chat) => {
                if( chat.id != chatId ) return;
                const friend = chat.participants.find((u) => u.id != init?.user?.id);
                chatStore.openChat({
                    chatId: chat.id,
                    chatName: friend?.firstName + ' ' + friend?.lastName,
                    chatImage: friend?.id as string,
                    chatParticipants: chat.participants
                })
            })
        }
    });

    const chatStore = storeChat();

    const fetchMessages = trpc.messages.fetchMessages.useMutation({
        onSuccess: (data) => {
            if (data.status === 'success') setMessages(data.data.messages);
            else alert("sth went wrong");
            setLoading(false);
        }
    })

    useEffect(() => {
        const chatId = urlParams.get("chatId");
        if (newMessage && chatId === newMessage.inboxId) setMessages([newMessage, ...messages])
    }, [newMessage])

    useEffect(() => {
        const chatId = urlParams.get("chatId");
        if (chatId) {
            setLoading(true);
            fetchMessages.mutate({ chatID: chatId })
        }
    }, [urlParams])

    
    if (!urlParams.get("chatId")) return (
        <section className={'flex items-center justify-center grow'}>
            Open any chat
        </section>
    )

    let MessageBox =
        <section className={'flex items-center justify-center grow'}>
            <LoadingSpinner />
        </section>


    if (!loading && messages)
        MessageBox =
            <section className='flex flex-col-reverse overflow-auto grow'>
                {
                    messages.map((mess, index) => {
                        const roundTop = messages.length == (index + 1) || messages[index].senderId !== messages[index + 1].senderId;
                        const roundBottom = index == 0 || messages[index].senderId !== messages[index - 1].senderId;

                        return (
                            <Message author={mess.senderId === init?.user?.id ? null : {
                                firstName: "Jan",
                                lastName: "Kowalski"
                            }} id={mess.id} message={mess.message} roundBottom={roundBottom} roundTop={roundTop} />
                        )
                    })
                }
            </section>

    if (!loading && !messages)
        MessageBox =
            <section className='flex overflow-auto text-black grow'>
                There's no messages yet.
            </section>


    return (
        <div className='box-border flex flex-col h-full grow'>
            <div className='flex items-center gap-2 py-2 border-b border-accent '>
                <Link to={`/profile/${chatStore.openedChat?.chatImage}`} className="flex items-center gap-2 px-2 py-1 mx-2 rounded-2xl hover:bg-secondaryBackground">
                    <div className='w-12 h-12 overflow-hidden rounded-full'>
                        <Avatar id={chatStore.openedChat?.chatImage as string} />
                    </div>
                    <span className='font-semibold text-white'>{chatStore.openedChat?.chatName}</span>
                </Link>
                <div className="self-center ml-auto">
                    <div className='flex px-4'>
                        <AiOutlineInfo className='w-6 h-6 p-2 rounded-full bg-secondaryBackground' />
                    </div>
                </div>
            </div >
            {MessageBox}
            <ChatInput userId={init?.user?.id as string} />
        </div >
    )
}
