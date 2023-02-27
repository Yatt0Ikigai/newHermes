import React from 'react'
import { BsCardImage, BsEmojiSmile, BsCameraVideo } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg'

export default function WritePost() {
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (hiddenFileInput.current) hiddenFileInput.current.click();
    }

    return (
        <label htmlFor="my-modal" className='box-border flex items-center justify-center w-full h-12 p-2 bg-gray-200 util-standard-round util-standard-shadow'>
            <CgProfile className={"avatar-img"} />
            <span className="flex items-center w-full p-2 bg-transparent resize-none focus:outline-none h-14">What's on your mind</span>
            <BsCardImage className='w-6 h-6 m-2'/>
            <BsEmojiSmile className='w-6 h-6 m-2'/>
            <BsCameraVideo className='w-8 h-8 pl-2 border-l-2 text-secondaryBlue border-gray'/>
        </label >
    )
}
