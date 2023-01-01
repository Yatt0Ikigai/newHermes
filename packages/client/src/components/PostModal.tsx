import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BsCardImage, BsEmojiSmile } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'

export default function PostModal() {
    return (
        <div>
            <input type="checkbox" id="my-modal" className="shadow-lg modal-toggle" />
            <div className="text-black modal">
                <div className="p-3 bg-gray-200 modal-box util-standard-round">
                    <section className='relative flex items-center w-full'>
                        <h3 className="flex items-center justify-center text-lg font-bold grow">Create Post</h3>
                        <div className="">
                            <label htmlFor="my-modal">
                                <AiOutlineClose className='w-8 h-8' />
                            </label>
                        </div>
                    </section>
                    <section className='py-2'>
                        <textarea placeholder='What are you thinking about?'
                            className='w-full resize-none bg-inherit focus:outline-none'></textarea>
                    </section>
                    <section className='flex items-center p-2 border border-gray-700 util-standard-round'>
                        <span className='grow'>Add to post</span>
                        <button className='p-2'><BsCardImage /></button>
                        <button className='p-2'><BsEmojiSmile /></button>
                        <button className='p-2'><GoLocation /></button>
                    </section>
                    <button className='box-border w-full my-2 btn'>Publish</button>
                </div>
            </div>
        </div>
    )
}
