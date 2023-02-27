import React, { useState } from 'react'

import { AiOutlinePlus } from 'react-icons/ai';
import AddFriendsModal from '../AddFriendModal';


export default function Navbar() {
    const [clicked, setClicked] = useState<number | null>(null);

    const onClickHandler = (key) => {
        if (clicked == key) setClicked(null);
        else setClicked(key);
    }

    return (
        <nav className="h-12 my-4">
            <ul className='carousel carousel-center rounded-box'>
                <li className={`carousel-item px-6 font-bold text-xl border-b-2 transition-all`}>
                    <label htmlFor="my-modal-6"><AiOutlinePlus /></label>
                </li>
                <li onClick={e => onClickHandler(1)} className={`carousel-item px-6 font-bold text-xl border-b-2 transition-all ${clicked === 1 ? "text-black border-b-black hover:text-gray-600" : "hover:text-black"}`}>
                    <button>All friends</button>
                </li>
                <li onClick={e => onClickHandler(2)} className={`carousel-item px-6 font-bold text-xl border-b-2 transition-all ${clicked === 2 ? "text-black border-b-black hover:text-gray-600" : "hover:text-black"}`}>
                    <button>Work</button>
                </li>
                <li onClick={e => onClickHandler(3)} className={`carousel-item px-6 font-bold text-xl border-b-2 transition-all ${clicked === 3 ? "text-black border-b-black hover:text-gray-600" : "hover:text-black"}`}>
                    <button>Highschool</button>
                </li>
                <li onClick={e => onClickHandler(4)} className={`carousel-item px-6 font-bold text-xl border-b-2 transition-all ${clicked === 4 ? "text-black border-b-black hover:text-gray-600" : "hover:text-black"}`}>
                    <button>Hometown</button>
                </li>
            </ul>

            <AddFriendsModal/>
        </nav>
    )
}
