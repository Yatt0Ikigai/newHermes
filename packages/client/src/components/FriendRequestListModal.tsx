import React, { useEffect, useState } from 'react';
import userStore from "../userStore";

import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import authStore from '../loginStore';


export default function FriendRequestListModal() {
    const storeUser = userStore();

    return (
        <div>
            <input type="checkbox" id="my-modal-10" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box flex flex-col items-center">
                    <h3 className="font-bold text-lg text-middle">Accept or decline friend requests</h3>
                    <p className="py-4"></p>
                    <div className='flex flex-col'>
                        {
                            storeUser.friendRequestList.length !== 0 ?
                                storeUser.friendRequestList.map((user) => {
                                    return (
                                        <div key={user.id} className={`flex`}>
                                            {user.firstName} {user.lastName}
                                            <div>
                                                <button className="btn btn-success" onClick={(e) => {
                                                    storeUser.acceptFriendRequest(
                                                        {
                                                            firstName: user.firstName,
                                                            lastName: user.lastName,
                                                            id: user.id
                                                        }
                                                    );
                                                }}>Accept</button>
                                                <button className="btn btn-error" onClick={(e) => {
                                                    storeUser.declineFriendRequest(
                                                        user.id,
                                                    );
                                                }}>Decline</button>
                                            </div>
                                        </div>
                                    )
                                }) : <>U DONT HAVE ANY REQUESTS</>
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