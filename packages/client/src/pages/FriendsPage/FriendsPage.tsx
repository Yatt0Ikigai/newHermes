import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar';

import FriendsContainer from './components/FriendsContainer';
import Navbar from '../../components/Navbar/Navbar';

export default function FriendsPage() {
    return (
        <div>
            <Navbar />
            <div className='flex'>
                <FriendsContainer />
            </div>
        </div >

    )
}
