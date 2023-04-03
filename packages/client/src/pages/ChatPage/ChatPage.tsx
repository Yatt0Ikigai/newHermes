import React, { useEffect } from 'react'

import ChatContainer from "./components/ChatContainer";
import ChatSidebar from './components/ChatSidebar';
import Navbar from "../../components/Navbar/Navbar"

export default function ChatPage() {
    return (
        <div className='flex flex-col w-screen h-screen overflow-hidden'>
            <Navbar />
            <main className='relative flex flex-auto overflow-y-auto bg-primaryBackground'>
                        <ChatSidebar />
                        <ChatContainer />
            </main>
        </div >
    )
}


