import React from 'react'

import { Link } from "react-router-dom";
import PictureFrame from "../components/ImageFrame";

export default function () {
    return (
        <div className='box-border flex flex-col w-full p-4 bg-primaryBackground rounded-2xl'>
            <div className='box-border flex items-center justify-between'>
                <span className='font-bold text-white hover:underline decoration-2'>Images</span>
                <Link to={`/profile/x/images`} className="p-2 font-semibold transition-all rounded-xl text-primaryHighlight hover:bg-secondaryBackground">
                    See all images
                </Link>
            </div>
            <main className='grid grid-cols-3 gap-2'>
                <PictureFrame/>
                <PictureFrame/>
                <PictureFrame/>
            </main>
            <footer>
                
            </footer>
        </div>
    )
}

