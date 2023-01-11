import React, { useEffect, useState } from 'react'

import storeUser from '../stores/userStore';

import { Link } from 'react-router-dom';

import { HiOutlineNewspaper } from 'react-icons/hi';
import { BiMessageDetail } from 'react-icons/bi';
import { BsFillGearFill, BsFillPersonFill } from 'react-icons/bs';
import { FaUserFriends, FaBars } from 'react-icons/fa';
import { AiOutlineCalendar } from 'react-icons/ai';
import { IconType } from 'react-icons/lib';
import { GiBootStomp } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import Avatar from './Avatar';

export default function Sidebar() {
    const userStore = storeUser();
    const [vis, setVis] = useState(false);
    
    return (
        <>
            <div className={`box-border w-screen flex flex-col items-center 
                    absolute top-0 left-0 right-0 bottom-0 z-50 transition-all 
                    md:static md:translate-x-0 md:w-auto 
                    xl:col-span-2 h-screen
                    px-1
                  text-gray-600 bg-gray-200 ${vis ? 'translate-x-0' : '-translate-x-full'} `}>
                <Link to="/" className='flex items-center justify-center p-4 text-xl font-bold'>
                    <span className='hidden xl:block'>HermesPost</span>
                    <GiBootStomp />
                </Link>
                <section>
                    <span className='hidden text-lg font-bold text-black xl:block'>Menu</span>
                    <ul>
                        <SidebarLi
                            Icon={HiOutlineNewspaper}
                            text={'News'}
                            haveNotif={true}
                            notif={0}
                            path={'/news'}
                        />
                        <SidebarLi
                            Icon={BiMessageDetail}
                            text={'Messages'}
                            haveNotif={true}
                            notif={0}
                            path={'/chats'}
                        />
                        <SidebarLi
                            Icon={BsFillPersonFill}
                            text={'Friends'}
                            haveNotif={true}
                            notif={0}
                            path={'/friends'}
                        />
                        <SidebarLi
                            Icon={FaUserFriends}
                            text={'Communities'}
                            haveNotif={true}
                            notif={0}
                            path={'/communities'}
                        />
                        <SidebarLi
                            Icon={AiOutlineCalendar}
                            text={'Events'}
                            haveNotif={true}
                            notif={0}
                            path={'/events'}
                        />
                    </ul>
                    <span className='hidden w-full text-lg font-bold text-black xl:block '>Shortcuts</span>

                    <button className='absolute top-0 right-0 p-4 md:hidden' onClick={(e) => {
                        setVis(false);
                    }}>
                        <GrClose />
                    </button>
                </section>
                <Link to={'/settings'} className='flex items-end'>
                    <span className='md:hidden xl:block'>
                        Settings
                    </span>
                    <BsFillGearFill />
                </Link>
                <section className='flex items-center mt-auto mb-4 bg-gray-400 rounded-lg xl:py-2 xl:px-4 justify-self-end'>
                    <div className='relative w-12 h-12 rounded-full'>
                        <Avatar id={userStore.id} />
                    </div>
                    <span className='hidden xl:block'>{userStore.firstName} {userStore.lastName}</span>
                </section>

            </div>
            <div className='absolute top-0 right-0 z-40 md:hidden'>
                <button className='flex items-center justify-center m-4 bg-gray-200 rounded-full' onClick={(e) => {
                    setVis(true);
                }}>
                    <FaBars />
                
                </button>
            </div>

        </>

    )
}

const SidebarLi = ({ Icon, text, path, haveNotif, notif }: { Icon: IconType, text: string, path: string, haveNotif: boolean, notif: number }) => {
    return (
        <Link to={path} className={`flex items-center justify-center py-2 xl:grid xl:grid-cols-5 hover:text-black ${location.pathname === path ? "text-black" : ""}`}>
            <Icon className='w-6 h-6' />
            <span className='col-span-3 md:hidden xl:block'>
                {text}
            </span>
            <span>
                {/*Notification*/}
            </span>
        </Link>
    )
}