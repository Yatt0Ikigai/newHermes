import React from 'react';

import Navbar from '../../components/Navbar/Navbar';

import PresentationModal from "./modals/PresentationModal";
import Posts from "./layout/Posts";

export default function UserPage() {


    return (
        <div className='flex flex-col w-screen h-screen overflow-x-hidden'>
            <Navbar />
            <PresentationModal />
            <div className='box-border lg:px-40 xl:px-64'>
                <Posts />
            </div>
        </div >
    )
}
