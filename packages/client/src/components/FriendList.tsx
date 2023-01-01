import React from 'react'
import { GiPresent } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import userStore from "../stores/userStore"

export default function FriendList() {
    const storeUser = userStore();

    return (
        <div className='sidebar justify-self-end'>
            <div>
                <section className='flex items-center justify-between border-solid border-b-1 border-b-white'>
                    <Link to="/" className='text-sm font-bold text-white'>Friend Requests</Link>
                    <span className='text-lg font-black text-secondary'>{storeUser.friendRequestList.length}</span>
                </section>
                <section>
                    {
                        storeUser.friendRequestList.length != 0 ?
                            <div className='grid grid-cols-4 grid-rows-2'>
                                <CgProfile className={"avatar-img "} />
                                <section className='flex items-center justify-between col-span-3 text-base font-bold'>
                                    <span>Jan Kowalski</span>
                                    <span className="text-sm font-large">4h</span>
                                </section>
                                <section className='flex justify-between col-span-3 col-start-2'>
                                    <button className="h-8 p-3 text-white btn bg-secondary min-h-min">Accept</button>
                                    <button className="h-8 p-3 text-white btn bg-tertiary min-h-min">Decline</button>
                                </section>
                            </div>
                            : ""
                    }
                </section>
            </div>

            <section className='my-2'>
                <span>BirthDays</span>
                <div className='flex'>
                    <GiPresent className='mr-2 sidebar-icon' />
                    Today Noone have birthday ;c
                </div>
            </section>
            <section>
                <Prof />
                <Prof />
                <Prof />
                <Prof />
            </section>
            <section className='w-full mt-8 text-center'>
                <Link to='/' className="absolute bottom-0 left-0 px-8 font-bold normal-case translate-x-1/2 -translate-y-1/2 rounded-full btn bg-tertiary text-secondary">
                    See more
                </Link>
            </section>
        </div>
    )
}

const Prof = () => {
    return (
        <section className='my-2 sidebar-row'>
            <CgProfile className={"avatar-img"} />
            <span className='sidebar-text'>Jan Kowalski</span>
        </section>
    )
}

