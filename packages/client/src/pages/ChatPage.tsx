import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar';

import ChatContainer from "../components/ChatContainer";
import ChatSide from '../components/ChatSide';
export default function ChatPage() {
    return (
        <>
            <div className='grid grid-cols-12 gap-0 bg-white text-gray-600'>
                <Sidebar />
                <ChatContainer/>
                <ChatSide/>
            </div >
        </>
    )
}
