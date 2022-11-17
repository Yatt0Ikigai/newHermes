import React, { useEffect, useState } from 'react'
import { RiSendPlaneLine } from "react-icons/ri";
import chatStore from '../stores/chatStore';
import userStore from '../stores/userStore';


const Chats = () => {
    const user = userStore();
    const storeChat = chatStore();
    const storeUser = userStore();

    const [userMessage, setUserMessage] = useState("");

    return (
        <div className='flex flex-col bg-gray-500 h-full'>
            <section className='grow flex-col-reverse flex overflow-y-auto'>
                {storeChat.messages.map((message) => {
                    return (
                        <div key={message.id} className={`flex flex-col w-max px-2 m-1 ${message.senderId === user.id ? "self-end" : "self-start"}`}>
                            <main className={`w-max px-3 lg:text-xl md:text-lg ${message.senderId === user.id ? "bg-black self-end rounded-r rounded-l-lg" : "bg-blue-900 rounded-l rounded-r-lg"}`}>
                                {message.message}
                            </main>
                        </div>
                    )
                })}
            </section>

            <section className='w-full'>
                <div className="form-control w-full">
                    <form action="" onSubmit={(e) => {
                        e.preventDefault();
                        if (!userMessage) return;
                        storeChat.sendMessages(user.id, storeChat.selectedChat, userMessage)
                        setUserMessage("")
                    }}>
                        <div className="input-group">
                            <input type="text" placeholder="Search…" className="input input-bordered w-full"
                                onChange={(e) => {
                                    setUserMessage(e.currentTarget.value);
                                }} value={userMessage} />
                            <button className="btn btn-square" type='submit'>
                                <RiSendPlaneLine />
                            </button>
                        </div>
                    </form>
                </div>
            </section >
        </div >
    )
}

export default Chats;