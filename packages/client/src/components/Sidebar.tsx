import React, { useEffect } from 'react'

import userStore from '../stores/userStore';
import actionStore from '../stores/actionStore';
import chatStore from "../stores/chatStore";

import { Link, useLocation } from 'react-router-dom';

import { HiOutlineNewspaper } from 'react-icons/hi';
import { BiMessageDetail } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { AiOutlineCalendar } from 'react-icons/ai';



export default function Sidebar() {
    const storeUser = userStore();
    const storeAction = actionStore();
    const storeChat = chatStore();
    const location = useLocation();

    return (
        <div className='col-span-2 bg-gray-200 h-screen text-gray-600 p-5 box-border'>
            <section className='flex justify-center items-center p-4 font-bold text-xl'>
                <Link to="/">HermesPost</Link>
            </section>
            <section>
                <span className='text-black font-bold text-lg '>Menu</span>
                <ul className='grid grid-rows-6 gap-1'>
                    <li className='sidebar-row'>
                        <HiOutlineNewspaper  className='flex justify-center items-center'/>
                        <span className='col-span-3'>
                            News
                        </span>
                        <span>
                            {/*Notification*/}
                        </span>
                    </li>
                    <li className={`sidebar-row ${location.pathname === "/chats" ? "text-black" : ""}`}>
                        <BiMessageDetail />
                        <span className='col-span-3'>
                            <Link to={"/chats"}> Messages</Link>
                        </span>
                        <span>
                            {/*Notification*/}
                        </span>
                    </li>
                    <li className='sidebar-row'>
                        <BsFillPersonFill />
                        <span className='col-span-3'>
                            Friends
                        </span>
                        <span>
                            {/*Notification*/}
                        </span>
                    </li>
                    <li className='sidebar-row'>
                        <FaUserFriends />
                        <span className='col-span-3'>
                            Communities
                        </span>
                        <span>
                            {/*Notification*/}
                        </span>
                    </li>
                    <li className='sidebar-row'>
                        <AiOutlineCalendar />
                        <span className='col-span-3'>
                            Events
                        </span>
                        <span>
                            {/*Notification*/}
                        </span>
                    </li>
                </ul>
            </section>
            <section>
                <span className='text-black font-bold text-lg '>Shortcuts</span>
            </section>
        </div>
    )
}