import React from 'react'
import { BsCardImage, BsEmojiSmile, BsCameraVideo } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg'
import Avatar from '../Avatar';

export default function WritePost() {
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (hiddenFileInput.current) hiddenFileInput.current.click();
    }

    return (
        <label htmlFor="my-modal" className='box-border flex flex-col w-full p-2 bg-primaryBackground rounded-2xl'>
            <div className='flex items-center gap-2 pb-2 m-2 border-b border-accent'>
                <div className='w-10 h-10 overflow-hidden rounded-full'>
                    <Avatar id={null} />
                </div>
                <span className="flex items-center w-full bg-transparent resize-none focus:outline-none">What's on your mind</span>
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
