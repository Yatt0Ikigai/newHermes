import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";

import { useNavigate } from 'react-router-dom';
import { trpc } from '../../../utils/trpc';
import Avatar from '../../../components/Avatar';

export default function FriendsContainer() {
    const { data: friends } = trpc.friends.fetchFriendList.useQuery();
    const navigate = useNavigate();

    return (
        <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
            {
                friends?.status === 'success' && friends.data.friendList.map((friend) => {
                    return (
                        <div className='flex items-center h-full overflow-hidden bg-gray-300 rounded-md' onClick={(e) => {
                            navigate(`/profile/${friend.id}`)
                        }}>
                            <div className='w-20 h-20 '>
                                <Avatar id={friend.id}/>
                            </div>
                            <div className='grow'>
                                {friend.firstName} {friend.lastName}
                            </div>

                            <div className="dropdown dropdown-left" onClick={(e) => {
                                e.stopPropagation();
                            }}>
                                <label tabIndex={0}> <BsThreeDotsVertical className='p-4' /></label>
                                <ul tabIndex={0} className="p-2 bg-gray-300 shadow dropdown-content menu rounded-box w-52">
                                    <li><button className='text-center text-white bg-red-400'>Delete</button></li>
                                </ul>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
