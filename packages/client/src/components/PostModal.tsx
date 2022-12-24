import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BsCardImage, BsEmojiSmile } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'

export default function PostModal() {
    return (
        <div>
            <input type="checkbox" id="my-modal" className="modal-toggle shadow-lg" />
            <div className="modal text-black">
                <div className="modal-box bg-gray-200 p-3 util-standard-round">
                    <section className='relative w-full flex items-center'>
                        <h3 className="font-bold text-lg grow flex items-center justify-center">Create Post</h3>
                        <div className="">
                            <label htmlFor="my-modal">
                                <AiOutlineClose className='w-8 h-8' />
                            </label>
                        </div>
                    </section>
                    <section className='py-2'>
                        <textarea placeholder='What are you thinking about?'
                            className='bg-inherit resize-none focus:outline-none w-full'></textarea>
                    </section>
                    <section className='border border-gray-700 util-standard-round p-2 flex items-center'>
                        <span className='grow'>Add to post</span>
                        <button className='p-2'><BsCardImage /></button>
                        <button className='p-2'><BsEmojiSmile /></button>
                        <button className='p-2'><GoLocation /></button>
                    </section>
                    <button className='btn w-full box-border my-2'>Publish</button>
                </div>
            </div>
        </div>
    )
}
