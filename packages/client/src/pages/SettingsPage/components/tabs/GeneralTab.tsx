import React from 'react'
import Tab from "./Index";

export default function GeneralTab() {
    return (
        <section className='w-full'>
            <h2 className='py-4 text-xl border-b border-white'>Genereal settings</h2>
            <Tab
                header='Name and Surname'
                placeholder='Jan Kowalski'>
                <div className='flex justify-center grow'>
                    <form className='grid grid-cols-2 gap-y-1 gap-x-2'>
                        <label htmlFor="" className='place-self-end'>Name</label>
                        <input type="text" className='px-2 py-1 bg-transparent border focus:outline-none border-accent' />

                        <label htmlFor="" className='place-self-end'>Surname</label>
                        <input type="text" className='px-2 py-1 bg-transparent border focus:outline-none border-accent' />

                        <button className='px-4 py-2 text-white bg-primaryHighlight rounded-xl'>Submit</button>
                        <button className='px-4 py-2 text-white bg-secondaryHighlight rounded-xl'>Decline</button>
                    </form>
                </div>
            </Tab>
        </section>
    )
}
