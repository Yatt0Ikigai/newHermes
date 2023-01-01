import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar';

import ChatContainer from "../components/ChatContainer";
import ChatSide from '../components/ChatSide';

import storeFriend from '../stores/friendStore';
import storeUser from '../stores/userStore';
import FriendsContainer from '../components/FriendsContainer';
import Navbar from '../components/NavbarFriends';

export default function FriendsPage() {
    const userStore = storeUser();
    const friendStore = storeFriend();

    useEffect(() => {
        friendStore.init();
        userStore.init();
    }, [])

    return (
        <>
            <div className='grid grid-cols-12 gap-10 text-gray-600 bg-white'>
                <Sidebar />
                <div className='col-span-10'>
                    <Navbar />
                    <FriendsContainer/>
                </div>
            </div >
        </>
    )
}
