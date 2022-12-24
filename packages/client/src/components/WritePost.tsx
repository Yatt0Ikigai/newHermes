import React from 'react'
import { BsCardImage, BsEmojiSmile, BsCameraVideo } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg'

export default function WritePost() {
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (hiddenFileInput.current) hiddenFileInput.current.click();
    }

    return (
        <label htmlFor="my-modal" className='w-full h-12 bg-gray-200 util-standard-round util-standard-shadow flex p-2 justify-center items-center box-border'>
            <CgProfile className={"avatar-img"} />
            <span className="bg-transparent resize-none focus:outline-none w-full p-2 h-14 flex items-center">What's on your mind</span>
            <BsCardImage className='m-2 w-6 h-6'/>
            <BsEmojiSmile className='m-2 w-6 h-6'/>
            <BsCameraVideo className='w-8 h-8 text-secondaryBlue border-l-2 border-gray pl-2'/>
        </label >
    )
}
