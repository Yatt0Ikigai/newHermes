import React, { useRef, useState } from 'react'
import { BsCardImage, BsEmojiSmile, BsCameraVideo } from 'react-icons/bs';
import { AiOutlineClose } from "react-icons/ai";
import Avatar from '../Avatar';
import Portal from "../../components/Portal";

export default function WritePost() {
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);
    const [mount, setMount] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (hiddenFileInput.current) hiddenFileInput.current.click();
    }

    return (
        <label htmlFor="my-modal" className='box-border flex flex-col w-full p-2 bg-primaryBackground rounded-2xl'>
            <div className='flex items-center gap-2 pb-2 m-2 border-b border-accent'>
                <div className='w-10 h-10 overflow-hidden rounded-full'>
                    <Avatar id={null} />
                </div>
                <button
                    className="flex items-center w-full bg-transparent resize-none focus:outline-none"
                    onClick={() => {
                        setMount(true);
                    }}>
                    What's on your mind
                </button>
                {mount &&
                    <Portal>
                        <WritePostModal closeFunction={() => {
                            setMount(false);
                        }} />
                    </Portal>
                }
            </div>
            <div className='flex justify-between'>
                <div className='flex items-center justify-center w-full py-2 hover:bg-tertiaryBackground rounded-xl'>
                    <BsCardImage className='w-6 h-6 mx-1 text-green-500 ' />
                    <span>Add Image</span>
                </div>
                <div className='flex items-center justify-center w-full hover:bg-tertiaryBackground rounded-xl'>
                    <BsEmojiSmile className='w-6 h-6 mx-1 text-yellow-300' />
                    <span>How you feel</span>
                </div>
                <div className='flex items-center justify-center w-full hover:bg-tertiaryBackground rounded-xl'>
                    <BsCameraVideo className='w-6 h-6 mx-1 text-red-600' />
                    <span>LiveStream</span>
                </div>
            </div>
        </label >
    )
}


const WritePostModal = ({ closeFunction }: { closeFunction: () => void }) => {
    const textRef = useRef<HTMLTextAreaElement>(null);
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='flex flex-col p-4 border border-accent bg-primaryBackground w-[40rem] rounded-2xl'>
                <div className='relative flex items-center justify-center pb-2 border-b border-accent'>
                    <span className='text-xl font-bold text-white'>Create Post</span>
                    <button className='absolute top-0 right-0 p-1 rounded-full'>
                        <AiOutlineClose className='w-6 h-6' onClick={closeFunction} />
                    </button>
                </div>
                <div className='flex items-center py-2'>
                    <div className='w-12 h-12 overflow-hidden rounded-full'>
                        <Avatar id={null} />
                    </div>
                    <span className='text-sm font-bold text-white'>
                        Piotr Berestka
                    </span>
                </div>
                <textarea placeholder={"What do you think?"} ref={textRef} className='z-50 text-2xl font-medium text-white bg-transparent resize-none placeholder:text-gray-400 focus:outline-none' />
                <div className='box-border p-4 flex border border-accent rounded-xl mb-4 items-center'>
                    <span className='mr-auto text-white'>Add to post</span>
                    <span className='p-2 hover:bg-secondaryBackground rounded-full'>
                        <BsCardImage className='w-6 h-6  text-green-500' />
                    </span>
                    <span className='p-2 hover:bg-secondaryBackground rounded-full'>
                        <BsEmojiSmile className='w-6 h-6 text-yellow-300' />
                    </span>
                </div>
                <button className='bg-primaryHighlight w-full py-2 text-white font-bold rounded-xl'>
                    Publish Post
                </button>
            </div>

        </div>
    )
}