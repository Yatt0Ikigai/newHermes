import React from 'react'

import { FiMapPin } from "react-icons/fi";
import { BsHouseFill } from "react-icons/bs";

export default function BioModal() {
    return (
        <div className='box-border flex flex-col w-full gap-4 p-4 bg-primaryBackground rounded-2xl'>
            <span className='text-xl font-bold text-white'>
                Presentation
            </span>
            <div className='flex gap-2'>
                <BsHouseFill className='w-6 h-6' />
                <span>
                    Lives in:
                </span>
            </div>
            <div className='flex gap-2'>
                <FiMapPin className='w-6 h-6' />
                <span>
                    From:
                </span>
            </div>
        </div>
    )
}
