import React, { useEffect, useState } from 'react';
import userStore from "../stores/userStore";

import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import authStore from '../stores/loginStore';


export default function FriendRequestListModal() {
    const storeUser = userStore();

    return (
        <div>
            <input type="checkbox" id="my-modal-10" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="flex flex-col items-center modal-box">
                    <h3 className="text-lg font-bold text-middle">Accept or decline friend requests</h3>
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