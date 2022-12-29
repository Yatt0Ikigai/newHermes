import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar';

import ChatContainer from "../components/ChatContainer";
import ChatSide from '../components/ChatSide';

import storeChat from '../stores/chatStore';
import storeAuth from "../stores/loginStore";
import storeUser from '../stores/userStore';

export default function ChatPage() {
    const authStore = storeAuth();
    const userStore = storeUser();
    const chatStore = storeChat();
  
  
    useEffect(() => {
      chatStore.init();
      userStore.init();
    }, [])
    
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
