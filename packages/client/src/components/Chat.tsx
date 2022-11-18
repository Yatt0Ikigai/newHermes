import React, { useEffect } from 'react'
import { IChat } from "../interfaces/chatStore.interface";
import userStore from '../stores/userStore';
import LoadingSpinner from "./LoadingSpinner";


export default function (chat: IChat) {
    const storeUser = userStore();

    const messagesEndRef = React.createRef<HTMLDivElement>()

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [chat.loading])

    return (
        <div className='w-64 h-96 
                        bg-gray-900 overflow-auto rounded-xl
                        p-4 flex flex-col-reverse'
        >
            <div ref={messagesEndRef} />
            {
                chat.loading ? <LoadingSpinner /> :
                    chat.messages.map(el => {
                        return (
                            <div
                                className={`rounded px-3 py-1 my-1 ${el.senderId === storeUser.id ? 
                                "self-end rounded-tr-sm bg-blue-400" : "self-start rounded-lr-sm bg-slate-400"}`}>
                                {el.message}
                            </div>
                        )
                    })}
        </div>
    )
}
