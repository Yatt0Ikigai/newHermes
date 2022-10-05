import React, { useEffect } from 'react';
import userStore from "../userStore";

import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";


export default function FriendRequestListModal() {
    const store = userStore();

    return (
        <div>
            <input type="checkbox" id="my-modal-10" className="modal-toggle"/>
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box flex flex-col items-center">
                    <h3 className="font-bold text-lg text-middle">Accept or decline friend requests</h3>
                    <p className="py-4"></p>

                    <div className="modal-action">
                        <label htmlFor="my-modal-10" className="btn">Close</label>
                    </div>
                </div>
            </div>
        </div>
    )
}