import React from 'react'

import { Link } from "react-router-dom";
import PictureFrame from "../components/ImageFrame";

export default function () {
    return (
        <div className='box-border flex flex-col w-full gap-4 p-4 bg-primaryBackground rounded-2xl'>
            <div className='flex items-center justify-between w-full '>
                <span className='font-bold text-white hover:underline decoration-2'>Friends</span>
                <Link to={`/profile/x/images`} className="p-2 font-semibold transition-all rounded-xl text-primaryHighlight hover:bg-secondaryBackground">
                    See all friends
                </Link>
            </div>
            <main className='grid w-full grid-cols-3 gap-2'>
                <PictureFrame/>
                <PictureFrame/>
                <PictureFrame/>
            </main>
        </div>
    )
}

