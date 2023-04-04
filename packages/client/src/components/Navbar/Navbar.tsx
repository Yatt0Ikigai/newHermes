import React, { useState } from 'react'

import { Link, useNavigate } from "react-router-dom";

import { BsSearch, BsBell, BsChatSquare } from "react-icons/bs";
import { FaUserFriends, FaBars } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";

import Avatar from '../Avatar';
import { trpc } from "../../utils/trpc";

export default function Navbar() {
    const navigate = useNavigate();
    const { data } = trpc.users.getSelfInfo.useQuery();
    const [openMenu, setOpenMenu] = useState(false);
    const [isSearchFocus, setIsSearchFocus] = useState(false);
    const [searchedUsers, setSearchedUsers] = useState<{ id: string, firstName: string, lastName: string, avatar: string | null }[]>([]);

    const logOut = trpc.auth.logOut.useMutation({
        onSuccess: () => { navigate("/login") }
    });

    const handleSearchUser = trpc.action.searchUsers.useMutation({
        onSuccess: (data) => {
            if (data.status === "success") setSearchedUsers(data.data);
        }
    });

    return (
        <div className='flex py-1 border-b bg-primaryBackground context-box border-accent'>
            <div className='flex items-center gap-4'>
                <Link to={"/"} >Logo</Link>
                <div className="relative">
                    <input
                        onFocus={() => setIsSearchFocus(true)}
                       // onBlur={() => setIsSearchFocus(false)}
                        type="text"
                        placeholder='Search for User'
                        className='box-border px-2 text-white border focus:outline-none bg-secondaryBackground rounded-xl border-accent'
                        onChange={(e) => {
                            if (e.currentTarget.value) handleSearchUser.mutate({ username: e.currentTarget.value })
                        }} />
                    {
                        isSearchFocus && <div className='absolute bottom-0 z-10 flex flex-col w-full gap-2 p-4 -translate-x-1/2 translate-y-[calc(100%+.5rem)] left-1/2 bg-primaryBackground rounded-xl  border border-accent'>
                            {
                                searchedUsers.map((user) => {
                                    return (
                                        <Link to={`/profile/${user.id}`} className='flex items-center gap-2 text-white'>
                                            <div className='w-8 h-8 overflow-hidden rounded-full'><Avatar id={user.id} /></div>
                                            <span className='font-semibold'>{user.firstName} {user.lastName}</span>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            </div>

            <div className='flex items-center justify-center gap-2 grow'>
                <Link to={'/chats'}>
                    <BsChatSquare className='w-6 h-6 px-6 py-2 transition-all rounded-lg text-iconsNabar hover:bg-secondaryBackground' />
                </Link>
                <Link to={"/"} >
                    <BiHomeAlt className='w-6 h-6 px-6 py-2 transition-all rounded-lg text-iconsNabar hover:bg-secondaryBackground' />
                </Link>
                <Link to="/friends">
                    <FaUserFriends className='w-6 h-6 px-6 py-2 transition-all rounded-lg text-iconsNabar hover:bg-secondaryBackground' />
                </Link>
                <FaBars className='w-6 h-6 px-6 py-2 transition-all rounded-lg text-iconsNabar hover:bg-secondaryBackground' />
            </div>
            <div className='relative flex items-center gap-4'>
                <BsBell className='w-4 h-4 p-3 rounded-full text-iconsNabar bg-secondaryBackground' />
                <div className='relative'>
                    <div className='w-10 h-10 rounded-full active:scale-[0.9] active:grayscale overflow-hidden'
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        {
                            data?.user ?
                                <Avatar id={data?.user?.id as string} />
                                :
                                <></>
                        }
                    </div>
                </div>
                {
                    openMenu &&
                    <div className='absolute bottom-0 right-0 z-10 flex flex-col p-2 translate-y-full border w-60 bg-primaryBackground rounded-2xl border-accent'>
                        <Link
                            to={"/settings"}
                            className='flex items-center gap-2 px-2 py-1 text-white transition-all hover:bg-secondaryBackground rounded-2xl'>
                            <FiSettings className='w-6 h-6 p-1 rounded-full bg-secondaryBackground' />
                            <span className='font-medium'>
                                Settings
                            </span>
                        </Link>
                        <div className='flex items-center gap-2 px-2 py-1 text-white transition-all hover:bg-secondaryBackground rounded-2xl'>
                            <RiMessage2Line className='w-6 h-6 p-1 rounded-full bg-secondaryBackground' />
                            <span className='font-medium'>
                                Send opinion
                            </span>
                        </div>
                        <div className='flex items-center gap-2 px-2 py-1 text-white transition-all hover:bg-secondaryBackground rounded-2xl'
                            onClick={() => { logOut.mutate() }}>
                            <MdLogout className='w-6 h-6 p-1 rounded-full bg-secondaryBackground' />
                            <span className='font-medium'>
                                Log out
                            </span>
                        </div>
                    </div>

                }
            </div>
        </div >
    )
}
