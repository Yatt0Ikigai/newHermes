import React from 'react';
import { BsCardImage, BsEmojiSmile, BsMic, BsThreeDots } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { GrAttachment } from "react-icons/gr";

import storeChat from '../stores/chatStore';
import storeUser from '../stores/userStore';

export default function ChatContainer() {
    const chatStore = storeChat();
    const userStore = storeUser();

    return (
        <div className='col-span-7 util-pad flex flex-col max-h-screen box-border'>
            <section className='flex items-center pb-2 border-b-2'>
                <CgProfile className={"avatar-img"} />
                <span>Elon Musk</span>
                <div className="dropdown dropdown-end self-center ml-auto">
                    <label tabIndex={0}> <BsThreeDots className='icons p-2' /></label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-gray-300 rounded-box w-52">
                        <li><a>Delete user</a></li>
                    </ul>
                </div>
            </section>
            <section className='grow flex flex-col-reverse text-black overflow-auto'>
                {
                    chatStore.messages.map((mess) => {
                        return (
                            <span className={`m-2 util-pad util-round w-max max-w-full ${mess.senderId === userStore.id ? "self-end bg-blue-400" : "bg-gray-200"}`}>
                                {mess.message}
                            </span>
                        )
                    })
                }
            </section>
            <section className='flex bg-gray-300 util-round'>
                <GrAttachment className='m-2 w-6 h-6' />
                <input type="text" placeholder='Write Your message' className='bg-transparent p-2 border-t-2 text-black placeholder:text-black focus:outline-none grow' />
                <BsCardImage className='m-2 w-6 h-6' />
                <BsEmojiSmile className='m-2 w-6 h-6' />
                <BsMic className='m-2 w-6 h-6' />
            </section>
        </div >
    )
}
