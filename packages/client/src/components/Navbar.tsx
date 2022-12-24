import React, { MouseEventHandler, useState } from 'react'

export default function Navbar() {
    const [clicked, setClicked] = useState<number | null>(null);

    const onClickHandler = (key) => {
        if (clicked == key) setClicked(null);
        else setClicked(key);
    }

    return (
        <nav className="h-12 my-4">
            <ul className='flex justify-between text-xl'>
                <li onClick={e => onClickHandler(1)} className={`font-bold text-xl border-b-2 transition-all ${clicked === 1 ? "text-black border-b-black hover:text-gray-600" : "hover:text-black"}`}>
                    <button>Posts</button>
                </li>
                <li onClick={e => onClickHandler(2)} className={`font-bold text-xl border-b-2 transition-all ${clicked === 2 ? "text-black border-b-black hover:text-gray-600" : "hover:text-black"}`}>
                    <button>Photos</button>
                </li>
                <li onClick={e => onClickHandler(3)} className={`font-bold text-xl border-b-2 transition-all ${clicked === 3 ? "text-black border-b-black hover:text-gray-600" : "hover:text-black"}`}>
                    <button>Videos</button>
                </li>
                <li onClick={e => onClickHandler(4)} className={`font-bold text-xl border-b-2 transition-all ${clicked === 4 ? "text-black border-b-black hover:text-gray-600" : "hover:text-black"}`}>
                    <button>Recommendations</button>
                </li>
            </ul>
        </nav>
    )
}
