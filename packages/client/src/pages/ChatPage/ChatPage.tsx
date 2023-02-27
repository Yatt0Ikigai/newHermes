import React from 'react'
import Sidebar from '../../components/Sidebar';

import ChatContainer from "./components/ChatContainer";
import ChatSide from './components/ChatSide';


export default function ChatPage() {
    return (
        <>
            <div className='box'>
                <Sidebar />
                <ChatContainer/>
                <ChatSide/>
            </div >
        </>
    )
}
