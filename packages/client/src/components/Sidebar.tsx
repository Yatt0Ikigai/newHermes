import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HiViewList } from "react-icons/hi";
import { useFetch } from "react-async";

import userStore from '../userStore';

export default function Sidebar() {
    const storeUser = userStore();

    const [selectedChat, setSelectedChat] = useState<string | null>(null)

    return (
        <div className='main-friendlist h-full'>
            <section className='flex justify-around items-center'>
                <p>Chats</p>
                <label htmlFor="my-modal-6" className="btn btn-circle modal-button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 13L 18 13M 12 7l 0 11" /></svg>
                </label>
                <label htmlFor="my-modal-10" className='btn btn-circle modal-button'>
                    <HiViewList />
                </label>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn m-1 rounded-full">...</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </section>
            <input type="text" placeholder="Search" className="input input-bordered m-4 w-[calc(100%-2rem)]" />
            <section>
                {
                    storeUser.friendList.map(({firstName, lastName, id}) => {
                        return (
                            <div key={id} onClick={() => {
                                setSelectedChat(id);
                            }} className={`${id === selectedChat ? "bg-yellow-100":""}`}>
                                {firstName} {lastName}
                            </div>
                        )
                    })
                }
            </section>
        </div>
    )
}