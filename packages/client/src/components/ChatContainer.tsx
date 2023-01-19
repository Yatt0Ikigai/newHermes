import React, { useEffect, useState } from 'react';
import { BsCardImage, BsEmojiSmile, BsMic, BsThreeDots } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { GrAttachment } from "react-icons/gr";


import { trpc } from "../utils/trpc";
import storeChat from '../stores/chatStore';
import storeUser from '../stores/userStore';

export default function ChatContainer() {
    const chatStore = storeChat();
    const userStore = storeUser();

    const sendMessage = trpc.messages.sendMessage.useMutation();
    const { data: messages, refetch: refetchMessages } = trpc.messages.getMessages.useQuery({ chatID: (chatStore.openedChat ? chatStore.openedChat : "") })
    
    useEffect(() => {
        refetchMessages();
    }, [chatStore.openedChat])
    
    const [input, setInput] = useState("");

    return (
        <div className='box-border flex flex-col max-h-screen col-span-10 md:col-span-9 lg:col-span-8 xl:col-span-7 util-pad'>
            <section className='flex items-center pb-2 border-b-2'>
                <CgProfile className={"avatar-img"} />
                <span>Elon Musk</span>
                <div className="self-center ml-auto dropdown dropdown-end">
                    <label tabIndex={0}> <BsThreeDots className='p-2 icons' /></label>
                    <ul tabIndex={0} className="p-2 bg-gray-300 shadow dropdown-content menu rounded-box w-52">
                        <li><a>Delete user</a></li>
                    </ul>
                </div>
            </section>
            <section className='flex flex-col-reverse overflow-auto text-black grow'>
                {
                    messages?.data.messages.map((mess) => {
                        return (
                            <span className={`m-2 util-pad util-round w-max max-w-full ${mess.senderId === userStore.id ? "self-end bg-blue-400" : "bg-gray-200"}`}>
                                {mess.message}
                            </span>
                        )
                    })
                }
            </section>
            <section className='flex bg-gray-300 util-round'>
                <GrAttachment className='w-4 h-4 m-1 sm:w-6 sm:h-6 sm:m-2' />
                <form action="" onSubmit={(e) => {
                    e.preventDefault();
                    if (!chatStore.openedChat) return;
                    sendMessage.mutate({
                        chatID: chatStore.openedChat,
                        message: input
                    })
                    setInput("");
                }} className="grow">
                    <input type="text" placeholder='Write Your message' className='w-full p-2 text-black bg-transparent border-t-2 placeholder:text-black focus:outline-none'
                        value={input} onChange={(e) => setInput(e.currentTarget.value)} />
                </form>
                <BsCardImage className='w-4 h-4 m-1 sm:w-6 sm:h-6 sm:m-2' />
                <BsEmojiSmile className='w-4 h-4 m-1 sm:w-6 sm:h-6 sm:m-2' />
                <BsMic className='w-4 h-4 m-1 sm:w-6 sm:h-6 sm:m-2' />
            </section>
        </div >
    )
}
