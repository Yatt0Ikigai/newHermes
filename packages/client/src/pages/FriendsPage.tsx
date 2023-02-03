import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar';

import ChatContainer from "../components/ChatContainer";
import ChatSide from '../components/ChatSide';

import storeFriend from '../stores/friendStore';
import storeUser from '../stores/userStore';
import FriendsContainer from '../components/FriendsContainer';
import Navbar from '../components/NavbarFriends';

export default function FriendsPage() {
    return (
        <>
            <div className='box'>
                <Sidebar />
                <div className='content'>
                    <Navbar />
                    <FriendsContainer/>
                </div>
            </div >
        </>
    )
}
