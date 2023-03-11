import React, { useState } from 'react'
import { trpc } from '../../../utils/trpc';

import { GrEmoji } from "react-icons/gr";
import { RiShareForwardFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Messages({ author, message, roundTop, roundBottom, id }: { author: { firstName: string, lastName: string, } | null, message: string, id: string, roundTop: boolean, roundBottom: boolean }) {
    const [hover, setHover] = useState(false);
    var aditionalClasses = "";

    if (roundTop) aditionalClasses += " rounded-t-full ";
    else aditionalClasses += ' mt-1 '
    if (roundBottom) aditionalClasses += "rounded-b-full ";

    if (author)
        return (
            <div className='flex self-start mt-0 text-black w-min'>
                <div className='w-4 h-4'></div>
                <span
                    className={`min-w-[1rem] my-0 px-2 py-1 w-max max-w-full rounded-r-full bg-gray-200 ${aditionalClasses}`} key={id}>
                    {message}
                </span>
            </div>
        )

    return (
        <div className='flex self-end mt-0 text-black'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {
                hover && <span className='flex items-center px-2 py-1 bg-gray-700 rounded-xl'>
                    <GrEmoji className="w-6 h-6 text-white" />
                    <RiShareForwardFill className="w-6 h-6 text-white" />
                    <BsThreeDotsVertical className="w-6 h-6 text-white" />
                </span>
            }
            <span

                className={`min-w-[1rem] my-0 px-2 py-1 w-max max-w-full rounded-l-full bg-blue-400 ${aditionalClasses}`} key={id}
            >
                {message}
            </span>

            <div className='w-4 h-4'></div>
        </div>
    )
}
