import React from 'react'

import {CgProfile} from "react-icons/cg";
import {BsThreeDotsVertical} from "react-icons/bs";

import storeFriends from "../stores/friendStore";
import { Link } from 'react-router-dom';

export default function FriendsContainer() {
    const friendStore = storeFriends();
    return (
        <div className='grid grid-cols-12 gap-4'>
            {
                friendStore.friendList.map((friend) => {
                    return (
                        <Link className='flex items-center bg-gray-300 lg:col-span-4 md:col-span-6 sm:col-span-12' to={`/profile/${friend.id}`}>
                            <div className='h-28 w-28'>
                                <CgProfile className={"w-full h-full"} />
                            </div>
                            <div className='grow'>
                                {friend.firstName} {friend.lastName}
                            </div>
                            <div>
                                <BsThreeDotsVertical className='icon'/>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}
