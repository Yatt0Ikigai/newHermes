import React, { useState } from 'react'

import { Link } from "react-router-dom";

import { BsSearch, BsBell } from "react-icons/bs";
import { GrHomeRounded } from "react-icons/gr";
import { FaUserFriends, FaBars } from "react-icons/fa";

import Avatar from '../Avatar';
import { trpc } from "../../utils/trpc";

export default function Navbar() {
    const { data } = trpc.users.getSelfInfo.useQuery();
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <div className='flex col-span-12 py-1 bg-gray-800 border-b context-box border-slate-300'>
            <div className='flex items-center gap-4'>
                <Link to={"/"} >Logo</Link>
                <BsSearch className='w-4 h-4 p-3 text-white bg-gray-600 rounded-full' />
            </div>

            <div className='flex items-center justify-center gap-2 grow'>
                <GrHomeRounded className='w-6 h-6 px-6 py-2 transition-all rounded-lg fill-white hover:bg-gray-600' />
                <FaUserFriends className='w-6 h-6 px-6 py-2 transition-all rounded-lg fill-white hover:bg-gray-600' />
                <FaBars className='w-6 h-6 px-6 py-2 transition-all rounded-lg fill-white hover:bg-gray-600' />
            </div>
            <div className='flex items-center gap-4'>
                <BsBell className='w-4 h-4 p-3 text-white bg-gray-600 rounded-full' />
                <div className='w-10 h-10 rounded-full active:scale-[0.9] active:grayscale relative' 
                    onClick={() => setOpenMenu(true)}
                >
                    {
                        data?.user ?
                                <Avatar id={data?.user?.id as string} />
                            :
                            <></>
                    }
                    {
                        openMenu && <div className='absolute bottom-0 right-0 flex flex-col translate-y-full bg-slate-700'>
                            <div className="flex">
                                Settings
                            </div>
                            <div className="flex">
                                Log out
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
