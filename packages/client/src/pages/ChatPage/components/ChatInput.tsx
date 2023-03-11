import React, { useState } from 'react'
import storeChat from '../../../stores/chatStore';

import { BiSend } from "react-icons/bi";
import { AiOutlineLike, AiOutlineSmile } from "react-icons/ai";

import { socket } from '../../../App';
import HoverBox from "../../../components/HoverBox";

export default function ChatInput({ userId }: { userId: string }) {
    const [input, setInput] = useState("");
    const [active, setActive] = useState(false);

    const chatStore = storeChat();

    return (
        <section className='relative'>
            <form action="" className='flex justify-center grow'
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!chatStore.openedChat) return;
                    socket.emit('sendMessage', {
                        chatId: chatStore.openedChat.id,
                        userId: userId,
                        content: input
                    });
                    setInput("");
                }}>
                <div className="flex items-center w-full my-4">
                    <div className="flex items-center px-2 py-1 bg-white border-t-2 rounded-full grow">
                        <input type="text" placeholder='Aa' className='h-4 text-black bg-transparent grow placeholder:text-black focus:outline-none'
                            value={input} onChange={(e) => setInput(e.currentTarget.value)}
                            onFocus={(e) => setActive(true)}
                            onBlur={(e) => setActive(false)}
                        />
                        <AiOutlineSmile className="w-6 h-6 text-black" />
                    </div>

                    <HoverBox description='Send Like'>
                        <div className='w-6 h-6 mx-2 overflow-hidden'>
                            <AiOutlineLike className={`w-6 h-6 transition-all ${active ? "translate-y-full" : "translate-y-0"}`} />
                            <BiSend className={`w-6 h-6 transition-all ${active ? "-translate-y-full" : "translate-y-full"}`} />
                        </div>
                    </HoverBox>
                </div>
            </form>
        </section>
    )
}
