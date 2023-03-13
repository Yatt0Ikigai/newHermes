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

export default function ChatContainer() {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [loading, setLoading] = useState(false);

    const chatStore = storeChat();

    const { data: init } = trpc.users.getSelfInfo.useQuery();
    const fetchMessages = trpc.messages.fetchMessages.useMutation({
        onSuccess: (data) => {
            if (data.status === 'success' && chatStore.openedChat?.id === data.data.chatID) {
                setMessages(data.data.messages);
            }
            else alert("sth went wrong");
            setLoading(false);
        }
    })

    const { message: newMessage } = getMessage();

    useEffect(() => {
        if (newMessage && chatStore.openedChat?.id === newMessage?.inboxId)
            setMessages([newMessage, ...messages]);
    }, [newMessage])

    useEffect(() => {
        if (chatStore.openedChat) {
            setLoading(true);
            fetchMessages.mutate({ chatID: chatStore.openedChat.id });
        } else {
            setLoading(true);
            setMessages([]);
        }
    }, [chatStore.openedChat])

    if (!chatStore.openedChat) return (
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
            <section className='flex items-center gap-2 py-2 border-b border-accent'>
                <div className='p-2'>
                    <div className='w-12 h-12 overflow-hidden rounded-full'>
                        <Avatar id={null} />
                    </div>
                </div>
                <span className='font-semibold text-white'>{chatStore.openedChat.name}</span>
                <div className="self-center ml-auto">
                    <div className='flex px-4'>
                        <AiOutlineInfo className='w-6 h-6 p-2 rounded-full bg-secondaryBackground' />
                    </div>
                </div>
            </section >
            {MessageBox}
            <ChatInput userId={init?.user?.id as string} />
        </div >
    )
}
