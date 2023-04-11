import React from 'react';

import Navbar from '../../components/Navbar/Navbar';

import PresentationModal from "./modals/PresentationModal";
import Posts from "./layout/Posts";
import { useParams } from 'react-router-dom';
import { trpc } from '../../utils/trpc';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function UserPage() {
    const { userId } = useParams();
    const { data, isLoading } = trpc.profile.getProfileInfo.useQuery({ id: userId as string });

    if (isLoading) return (
        <div className='flex items-center justify-center w-screen h-screen'>
            <LoadingSpinner/>
        </div>
        )
    
    
    return (
        <div className='flex flex-col w-screen h-screen overflow-x-hidden bg-secondaryBackground'>
            <Navbar />
            <PresentationModal />
            <div className='box-border lg:px-40 xl:px-64'>
                <Posts />
            </div>
        </div >
    )
}
