import React, { useEffect, useState } from 'react'
import storeChat from '../../../stores/chatStore';

import { BiSend } from "react-icons/bi";
import { AiOutlineLike, AiOutlineSmile, AiOutlineGif } from "react-icons/ai";
import { BsCardImage } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";

import { socket } from '../../../App';
import HoverBox from "../../../components/HoverBox";

export default function ChatInput({ userId }: { userId: string }) {
    const [input, setInput] = useState("");
    const [active, setActive] = useState(false);

    const chatStore = storeChat();

    useEffect(() => {
        if (input && !active) setActive(true);
        else if (!input && active) setActive(false);
    }, [input])

    return (
        <section className='relative'>
            <form action="" className='flex justify-center grow'
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!chatStore.openedChat || !input) return;
                    socket.emit('sendMessage', {
                        chatId: chatStore.openedChat.chatId as string,
                        userId: userId,
                        content: input
                    });
                    setInput("");
                }}>
                <div className="flex items-center w-full gap-2 my-4">
                    <BiPlus className="w-6 h-6 text-primaryHighlight" />
                    <BsCardImage className="w-6 h-6 text-primaryHighlight" />
                    <AiOutlineGif className="w-6 h-6 text-primaryHighlight" />
                    <div className="flex items-center px-2 py-1 bg-white border-t-2 rounded-full grow">
                        <input type="text" placeholder='Aa' className='h-4 px-2 text-black bg-transparent rounded-2xl grow placeholder:text-black focus:outline-none'
                            value={input} onChange={(e) => {
                                setInput(e.currentTarget.value);
                            }}
                        />
                        <AiOutlineSmile className="w-6 h-6 text-primaryHighlight" />
                    </div>
                    <HoverBox description='Send Like'>
                        <div className='relative w-6 h-6 mx-2 overflow-hidden'>
                            <button type='button'
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!chatStore.openedChat) return;
                                    socket.emit('sendMessage', {
                                        chatId: chatStore.openedChat.chatId,
                                        userId: userId,
                                        content: "👍"
                                    });
                                }}>
                                <AiOutlineLike className={`absolute top-0 w-6 h-6 transition-all text-primaryHighlight ${active ? "translate-y-full" : "translate-y-0"}`} />
                            </button>
                            <button type="submit">
                                <BiSend className={`absolute top-0 w-6 h-6 transition-all text-primaryHighlight ${active ? "translate-0" : "translate-y-full"}`} />
                            </button>
                        </div>
                    </HoverBox>
                </div>
            </form >
        </section >
    )
}
