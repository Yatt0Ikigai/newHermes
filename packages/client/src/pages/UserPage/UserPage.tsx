import React from 'react';

import Navbar from '../../components/Navbar/Navbar';

import PresentationModal from "./components/PresentationModal";

export default function UserPage() {


    return (
        <>
            <Navbar/>
            <div className=''>
                <PresentationModal/>
            </div>
        </ >
    )
}
