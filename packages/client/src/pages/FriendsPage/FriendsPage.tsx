import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar';

import FriendsContainer from './components/FriendsContainer';
import Navbar from '../../components/Navbar/NavbarFriends';

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
