import React, { useEffect } from 'react';
import userStore from "../userStore";

import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";


export default function FriendRequestListModal() {
    const store = userStore();


    return (
        <div>
            <input type="checkbox" id="my-modal-10" className="modal-toggle" onChange={(e) => {
                if(e.target.checked) store.userGetRequestList();
            }}/>
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box flex flex-col items-center">
                    <h3 className="font-bold text-lg text-middle">Accept or decline friend requests</h3>
                    <p className="py-4"></p>
                    <div className={"flex items-center flex-col w-full"}>
                        {
                            store.requestUsers.map((user) => {
                                return (
                                    <div className='w-full rounded p-2 text-xl flex justify-between' key={user.id}>
                                        <>{user.firstName} {user.lastName} </>
                                        <button onClick={() => {
                                            store.userAcceptFriendRequest(user.id);
                                        }}>
                                            <AiOutlineCheck />
                                        </button>
                                        <button onClick={() => {
                                            store.userDeclineFriendRequest(user.id);
                                        }}>
                                            <AiOutlineClose />
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my-modal-10" className="btn">Close</label>
                    </div>
                </div>
            </div>
        </div>
    )
}