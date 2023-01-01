import React from 'react'
import { BsFillPlusCircleFill, BsThreeDotsVertical } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import friendStore from '../stores/friendStore';
import storeFriends from "../stores/friendStore";


export default function StoriesMini() {
    const friendsStore = storeFriends();
    
    return (
        <div className='hidden col-span-2 pt-4 lg:block r-4'>
            <div className='cont'>
                <section className='flex flex-col pb-6'>
                    <span className='pb-2 font-semibold text-black'>Stories</span>
                    <div className='grid grid-cols-4 gap-1 '>
                        <BsFillPlusCircleFill className={"aspect-square text-blue-400 rounded-full w-8 h-8"} />
                        <CgProfile className={"aspect-square p-1 border-2 border-blue-400 rounded-full w-8 h-8 box-border"} />
                        <CgProfile className={"aspect-square p-1 border-2 border-blue-400 rounded-full w-8 h-8 box-border"} />
                        <CgProfile className={"aspect-square p-1 border-2 border-blue-400 rounded-full w-8 h-8 box-border"} />
                    </div>
                </section>
                <section className='flex flex-col'>
                    <span className='font-semibold text-black'>Friend Requests</span>
                    {
                        friendsStore.friendRequestList.length != 0 ? 
                        friendsStore.friendRequestList.map((user,i) => {
                            if(i > 4 ) return;
                            return(
                                <RequestCard name={user.firstName + " " + user.lastName} />
                            )
                        }) : "U don't have any requests"
                    }
                </section>
            </div>
        </div>
    )
}

const RequestCard = ({ name }: { name: string }) => {
    return (
        <div className='grid items-center grid-cols-6 py-2'>
            <CgProfile className={"w-max h-max"} />
            <span className='col-span-4'>{name}</span>
            <div className="dropdown dropdown-left">
                <label tabIndex={0}> <BsThreeDotsVertical className='justify-self-end' /></label>
                <ul tabIndex={0} className="p-2 bg-gray-300 shadow dropdown-content menu rounded-box w-52">
                    <li><button className='text-center text-white bg-blue-400'>Accept</button></li>
                    <li><button className='text-center text-white bg-red-400'>Delete</button></li>
                </ul>
            </div>

        </div>
    )
}