import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { trpc } from '../../../utils/trpc';
import Avatar from '../../../components/Avatar';

import { IUser } from '../../../interfaces/userStore.interface';

export default function FriendsContainer() {
    const [friends, setFriends] = useState<IUser[]>();
    const { data, isLoading } = trpc.friends.fetchFriendRequests.useQuery(undefined, {
        onSuccess: (data) => {
            setFriends(data.data)
        }
    });
    const acceptInvite = trpc.action.acceptFriendship.useMutation({
        onSuccess: (data) => {
            setFriends((state) => state?.filter((el) => el.id !== data.data.friendId))
        }
    });
    const declineInvite = trpc.action.declineFrienship.useMutation({
        onSuccess: (data) => {
            setFriends((state) => state?.filter((el) => el.id !== data.data.friendId))
        }
    });

    if (isLoading) return <></>
    return (
        <div className='p-4'>
            <span className='text-xl font-semibold text-white'>
                Friend Invites
            </span>
            <div className='grid w-full grid-cols-3 gap-4 mt-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 bg-tertiaryBackground'>
                {
                    friends && friends.map((friend) => {
                        return (
                            <FriendCard
                                id={friend.id}
                                firstName={friend.firstName}
                                lastName={friend.lastName}
                                acceptCallback={() => acceptInvite.mutate({ friendId: friend.id })}
                                declineCallback={() => declineInvite.mutate({ friendId: friend.id })}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

const FriendCard = ({ acceptCallback, id, firstName, lastName, declineCallback }: { acceptCallback: () => void, declineCallback: () => void, firstName: string, lastName: string, id: string, }) => {
    return (
        <div className='flex flex-col items-center h-full overflow-hidden rounded-md bg-secondaryBackground' >
            <Link className='w-full overflow-hidden aspect-square' to={`/profile/${id}`}>
                <Avatar id={id} />
            </Link>
            <div className='box-border flex flex-col w-full gap-2 px-4 pb-4 text-[rgb(255,255,255)]'>
                <div className='font-medium '>
                    {firstName} {lastName}
                </div>
                <button className='px-2 py-1 font-medium transition-none rounded-md bg-primaryHighlight hover:brightness-105 active:scale-95' onClick={(e) => { acceptCallback() }}>
                    Accept
                </button>
                <button className='px-2 py-1 font-medium rounded-md bg-primaryBackground hover:brightness-105 active:scale-95 trasition-all'  onClick={(e) => { declineCallback() }}>
                    Decline
                </button>
            </div>
        </div>
    )
}