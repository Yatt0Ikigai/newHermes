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
                <section className='flex justify-between items-center border-b-1 border-solid border-b-white'>
                    <Link to="/" className='font-bold text-white text-sm'>Friend Requests</Link>
                    <span className='font-black text-secondary text-lg'>{storeUser.friendRequestList.length}</span>
                </section>
                <section>
                    {
                        storeUser.friendRequestList.length != 0 ?
                            <div className='grid grid-cols-4 grid-rows-2'>
                                <CgProfile className={"avatar-img "} />
                                <section className='text-base font-bold col-span-3 flex justify-between items-center'>
                                    <span>Jan Kowalski</span>
                                    <span className="font-large text-sm">4h</span>
                                </section>
                                <section className='col-start-2 col-span-3 flex justify-between'>
                                    <button className="btn bg-secondary text-white min-h-min p-3 h-8">Accept</button>
                                    <button className="btn bg-tertiary text-white min-h-min p-3 h-8">Decline</button>
                                </section>
                            </div>
                            : ""
                    }
                </section>
            </div>

            <section className='my-2'>
                <span>BirthDays</span>
                <div className='flex'>
                    <GiPresent className='sidebar-icon mr-2' />
                    Today Noone have birthday ;c
                </div>
            </section>
            <section>
                <Prof />
                <Prof />
                <Prof />
                <Prof />
            </section>
            <section className='w-full text-center mt-8'>
                <Link to='/' className="btn normal-case font-bold rounded-full bg-tertiary text-secondary px-8 absolute bottom-0 left-0 translate-x-1/2 -translate-y-1/2">
                    See more
                </Link>
            </section>
        </div>
    )
}

const Prof = () => {
    return (
        <section className='sidebar-row my-2'>
            <CgProfile className={"avatar-img"} />
            <span className='sidebar-text'>Jan Kowalski</span>
        </section>
    )
}

