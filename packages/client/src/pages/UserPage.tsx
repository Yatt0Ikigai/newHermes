import React, { useEffect, useState } from 'react'
import { useParams, Navigate } from "react-router-dom";
import { getRequest, postRequest } from "../utils/axios.util";

import lStore from "../loginStore";
import uStore from '../userStore';
import LoadingSpinner from '../components/LoadingSpinner';

export default function UserPage() {
    const { userId } = useParams();
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        admin: false,
        friend: false,
        friendRequest: false,
        sentFriendRequest: false,
    });

    const loginStore = lStore();
    const userStore = uStore();

    useEffect(() => {
        const loadingCall = async () => {
            return await getRequest(`users/${userId}/publicInfo`);
        }
        loadingCall().then(async (res: any) => {
            setUserInfo({
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                admin: res.data.admin,
                friend: res.data.friend,
                friendRequest: res.data.friendRequest,
                sentFriendRequest: res.data.sentFriendRequest,
            })
            setLoading(false);
        })
    }, [])

    useEffect(() => {
        console.log(userInfo.friend, userInfo.friendRequest, userInfo.sentFriendRequest)
    }, [userInfo])

    if (loading) return <LoadingSpinner />
    return (
        <div className="container bg-gray-300 h-full rounded-xl grid items-center grid-cols-2">
            <div>
                <div className="avatar online placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-52">
                        <span className="text-xl">JO</span>
                        {userInfo.admin ? <>U ARE ADMIN</> : ""}
                    </div>
                </div>
            </div>

            <div className=''>
                <div className='w-full'>
                    <section className='flex flex-col justify-center'>
                        {userInfo.firstName}
                        {userInfo.lastName}
                    </section>
                    <section>
                        {
                            userInfo.friend &&
                            <button className="btn btn-error" onClick={(e) => {
                                if (userId) userStore.unfriendUser(userId);
                                setUserInfo({ ...userInfo, friend: false })
                            }}>Remove Friend</button>}
                        {
                            userInfo.friendRequest &&
                            <div>
                                <button className="btn btn-success" onClick={(e) => {
                                    if (userId) userStore.acceptFriendRequest(
                                        {
                                            firstName: userInfo.firstName,
                                            lastName: userInfo.lastName,
                                            id: userId
                                        }
                                    );
                                    setUserInfo({ ...userInfo, friend: true, friendRequest: false })
                                }}>Accept</button>
                                <button className="btn btn-error" onClick={(e) => {
                                    if (userId) userStore.declineFriendRequest(
                                        userId,
                                    );
                                    setUserInfo({ ...userInfo, friend: false, friendRequest: false })
                                }}>Decline</button>
                            </div>
                        }
                        {
                            userInfo.sentFriendRequest &&
                            <button className="btn btn-warning" onClick={(e) => {
                                if (userId) userStore.cancelFriendRequest(
                                    userId
                                );
                                setUserInfo({ ...userInfo, sentFriendRequest: false })
                            }}>Cancel</button>
                        }
                        {
                            !userInfo.sentFriendRequest && !userInfo.friendRequest && !userInfo.friend &&
                            <button className="btn btn-info" onClick={(e) => {
                                if (userId) userStore.sendFriendRequest(
                                    {
                                        firstName: userInfo.firstName,
                                        lastName: userInfo.lastName,
                                        id: userId
                                    }
                                );
                                setUserInfo({ ...userInfo, sentFriendRequest: true })
                            }}>Invite User</button>
                        }
                    </section>
                </div>
            </div>
        </div >
    )
}
