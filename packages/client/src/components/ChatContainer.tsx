import React, { useEffect, useState } from 'react'

import { RiSendPlaneLine } from "react-icons/ri";
import { AiOutlineSend } from "react-icons/ai";

import chatStore from '../stores/chatStore';
import userStore from '../stores/userStore';

import Chat from "./Chat";

const Chats = () => {
    const user = userStore();
    const storeChat = chatStore();
    const storeUser = userStore();

    const [userMessage, setUserMessage] = useState("");

    return (
        <div className='absolute bottom-0 left-0 z-10'>
            {
                storeChat.openedChats.map(chat => {
                    return (
                        <div>
                            <Chat 
                                chatId={chat.chatId}
                                loading={chat.loading}
                                messages={chat.messages}
                                name={chat.name}
                                participants={chat.participants}
                                key={"chat-" + chat.chatId}
                            />
                            <section>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    if (!userMessage) return;
                                    storeChat.sendMessage({
                                        chatId: chat.chatId,
                                        message: userMessage,
                                        senderId: storeUser.id,
                                    })
                                    setUserMessage("")
                                }} className='flex justify-center items-center'>
                                    <input type="text"
                                        placeholder="Type here"
                                        className="input input-bordered input-info w-full max-w-xs"
                                        value={userMessage}
                                        onChange={(e) => {
                                            setUserMessage(e.currentTarget.value);
                                        }} />
                                    {userMessage ? <AiOutlineSend className='w-12' type="submit" /> : ""}
                                </form>

                            </section>
                        </div>

                    )
                })
            }
        </div>
    )
}

export default Chats;