import React, { useState } from 'react'
import { trpc } from '../../../utils/trpc';

import { GrEmoji } from "react-icons/gr";
import { RiShareForwardFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Messages({ author, message, roundTop, roundBottom, id }: { author: { firstName: string, lastName: string, } | null, message: string, id: string, roundTop: boolean, roundBottom: boolean }) {
    const [hover, setHover] = useState(false);
    var aditionalClasses = "";

    if (roundTop) aditionalClasses += " rounded-t-lg ";
    else aditionalClasses += ' mt-1 '
    if (roundBottom) aditionalClasses += "rounded-b-lg ";

    if (author)
        return (
            <div className='flex self-start mt-0 text-black w-min'>
                <div className='w-4 h-4'></div>
                <span
                    className={`min-w-[1rem] my-0 px-2 py-1 max-w-[12rem] rounded-r-lg bg-secondaryHighlight text-white text-sm font-medium ${aditionalClasses}`} key={id}>
                    {message}
                </span>
            </div>
        )

    return (
        <div className='flex items-center self-end mt-0 text-black'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {
                hover && <span className='flex items-center gap-1 h-max'>
                    <GrEmoji className="w-4 h-4 p-1 text-icons" />
                    <RiShareForwardFill className="w-4 h-4 p-1 text-icons" />
                    <BsThreeDotsVertical className="w-4 h-4 p-1 text-icons" />
                </span>
            }
            <span
                className={`min-w-[1rem] my-0 px-4 py-2 max-w-[16rem] lg:max-w-sm break-words rounded-l-lg bg-primaryHighlight text-white text-sm font-medium ${aditionalClasses}`} key={id}
            >
                {message}
            </span>

            <div className='w-4 h-4'></div>
        </div>
    )
}
