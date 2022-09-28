import React, { useState } from 'react';
import userStore, { IUser } from "../userStore";

import {AiOutlineCloseCircle, AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import {GrAdd} from "react-icons/gr";
import {MdCancelScheduleSend} from "react-icons/md";

export default function AddFriendsModal() {
    const store = userStore();

    return (
        <div>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box flex flex-col items-center">
                    <h3 className="font-bold text-lg text-middle">Search for new friends</h3>
                    <p className="py-4"></p>
                    <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs m-2" onChange={((e) => {
                        store.userFindUser(e.currentTarget.value);
                    })}/>
                    <div className={"flex items-center flex-col w-full"}>
                        {store.users.map((user: IUser) => {
                            return (
                                <div className="w-full btn-outline rounded p-2 text-xl flex justify-between" key={user.id}>
                                    <section>
                                        {user.firstName} {user.lastName}
                                    </section>
                                    {
                                        user.isFriend &&
                                        <>
                                            Friend
                                            <button onClick={()=>{
                                                store.userUnfriendUser(user.id);
                                            }}>
                                                <AiOutlineCloseCircle className='outline-red'/>
                                            </button>
                                        </>
                                    }
                                    {
                                        user.userSentRequest &&
                                        <>
                                            Pending
                                            <button onClick={()=>{
                                                store.userCancelFriendRequest(user.id);
                                            }}>
                                                <MdCancelScheduleSend className='outline-red'/>
                                            </button>
                                        </>
                                    }
                                    {
                                        user.friendRequest &&
                                        <>
                                            Request
                                            <button onClick={()=>{
                                                store.userAcceptFriendRequest(user.id);
                                            }}>
                                                <AiOutlineCheck/>
                                            </button>
                                            <button onClick={()=>{
                                                store.userDeclineFriendRequest(user.id);
                                            }}>
                                                <AiOutlineClose/>
                                            </button>
                                        </>
                                    }
                                    {
                                        !user.isFriend && !user.userSentRequest && !user.friendRequest &&
                                        <>
                                            Add
                                            <button onClick={()=>{
                                                store.userSendFriendRequest(user.id);
                                            }}>
                                                <GrAdd/>
                                            </button>
                                        </>
                                    }
                                </div>
                            )
                        })}
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my-modal-6" className="btn">Close</label>
                    </div>
                </div>
            </div>
        </div >
    )
}

/*
              <label htmlFor="my-modal-6" className="btn btn-circle modal-button">
              </label>

              Button to activate modal
*/