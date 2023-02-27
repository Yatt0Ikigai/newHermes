import React, { useState } from 'react';
import { trpc } from "../utils/trpc";
import { IUser } from "../../types";

import { Link } from 'react-router-dom';

export default function AddFriendsModal() {
    const [users, setUsers] = useState<IUser[]>([]);
    const searchUsers = trpc.action.searchUsers.useMutation({
        onSuccess: (data) => {
            if (data.status === 'success') setUsers(data.data);
        }
    });

    return (
        <div>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-middle">
                <div className="flex flex-col items-center bg-gray-300 modal-box">
                    <h3 className="text-lg font-bold text-middle">Search for new friends</h3>
                    <p className="py-4"></p>
                    <input type="text" placeholder="Type here" className="w-full max-w-xs m-2 input input-bordered input-info" onChange={((e) => {
                        searchUsers.mutate({ username: e.target.value });

                    })} />
                    <div className={"flex items-center flex-col w-full"}>
                        {
                            users.map((user) => {
                                return (
                                    <Link to={`/profile/${user.id}`} className="flex justify-between w-full p-2 text-xl rounded btn-outline" key={user.id}>
                                        {user.firstName} {user.lastName}
                                    </Link>
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