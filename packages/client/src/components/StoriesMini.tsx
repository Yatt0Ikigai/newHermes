import React from 'react'
import { BsFillPlusCircleFill, BsThreeDotsVertical } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

export default function StoriesMini() {
    return (
        <div className='col-span-2 pr-4 pt-4'>
            <div className='cont'>
                <section className='flex flex-col pb-6'>
                    <span className='font-semibold text-black pb-2'>Stories</span>
                    <div className='grid grid-cols-4 gap-1 '>
                        <BsFillPlusCircleFill className={"aspect-square text-blue-400 rounded-full w-8 h-8"} />
                        <CgProfile className={"aspect-square p-1 border-2 border-blue-400 rounded-full w-8 h-8 box-border"} />
                        <CgProfile className={"aspect-square p-1 border-2 border-blue-400 rounded-full w-8 h-8 box-border"} />
                        <CgProfile className={"aspect-square p-1 border-2 border-blue-400 rounded-full w-8 h-8 box-border"} />
                    </div>
                </section>
                <section className='flex flex-col'>
                    <span className='font-semibold text-black'>Friend Requests</span>
                    <RequestCard name='Harry Brock' />
                    <RequestCard name='Kylo Ren' />
                    <RequestCard name='Matt Brown' />
                    <RequestCard name='Din Graves' />
                </section>
            </div>
        </div>
    )
}

const RequestCard = ({ name }: { name: string }) => {
    return (
        <div className='grid grid-cols-6 items-center py-2'>
            <CgProfile className={"w-max h-max"} />
            <span className='col-span-4'>{name}</span>
            <div className="dropdown dropdown-left">
                <label tabIndex={0}> <BsThreeDotsVertical className='justify-self-end' /></label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-gray-300 rounded-box w-52">
                    <li><button className='bg-blue-400 text-center text-white'>Accept</button></li>
                    <li><button className='bg-red-400 text-center text-white'>Delete</button></li>
                </ul>
            </div>

        </div>
    )
}