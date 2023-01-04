import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { useParams } from 'react-router-dom';
import { getRequest } from '../utils/axios.util';
import Avatar from './Avatar';
import LoadingSpinner from './LoadingSpinner';
import Post from "./Post"
import WritePost from './WritePost';
export default function UserContainer() {
    const { userId } = useParams();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<userInfo>({
        admin: false,
        avatar: "",
        description: "",
        firstName: "",
        lastName: "",
        posts: ["1", "2"]
    });
    const [friend, setFriend] = useState(false);
    const [friendRequest, setFriendRequest] = useState(false);
    const [sentFriendRequest, setSentFriendRequest] = useState(false);


    useEffect(() => {
        const loadingCall = async () => {
            return await getRequest(`users/${userId}/publicInfo`);
        }
        loadingCall().then(async (res: any) => {
            console.log(res.data.avatar)
            setUser({
                admin: res.data.admin,
                avatar:res.data.avatar,
                description: `
                Nie udało się nawiązać połączenia
                Podczas łączenia z serwerem „www.google.com” wystąpił błąd. 
                `,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                posts: ['1', '2']
            })
            setFriend(res.data.friend)
            setFriendRequest(res.data.friendRequest)
            setSentFriendRequest(res.data.sentFriendRequest)
            setLoading(false);
        })
    }, [])

    if (loading) return <LoadingSpinner />

    return (
        <div className='px-4 content md:col-span-11 xl:col-span-10'>
            <section className='flex items-center py-4'>
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <Avatar id={userId as string} />
                    </div>
                </div>
                <div className='flex flex-col justify-center px-4'>
                    <span className='text-2xl font-bold'>
                        {user.firstName} {user.lastName}
                    </span>
                    <span className='font-medium text-md'>
                        {user.description}
                    </span>
                </div>
                <div className='dropdown dropdown-left'>
                    <label tabIndex={0}> <BsThreeDotsVertical className='w-6 h-6 p-4' /></label>
                    <ul tabIndex={0} className="p-2 bg-gray-300 shadow dropdown-content menu rounded-box w-52">
                        <li><button className='text-center text-white bg-red-400'>Delete</button></li>
                    </ul>
                </div>
            </section>
            <section>
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-12 lg:col-span-9'>
                        <WritePost />
                        <span className='py-6 text-xl font-bold'>Pubications</span>
                        {
                            user.posts.map((post) => {
                                return (
                                    <Post comments={[]} content={
                                        { attachment: null, text: 'hello' }
                                    } createdAt='' creatorID='63751e85e542323a25132b1b' likes={2} />

                                )
                            })
                        }
                    </div>
                    <div className='hidden p-4 bg-gray-200 rounded-md lg:block lg:col-span-3'>
                        <section className='flex flex-col'>
                            <span className='font-bold'>About</span>
                            <span className='font-light text-md'>47 years old Single</span>
                        </section>
                        <section>
                            <span className='font-bold'>Friends</span>
                            {
                                ["Jan Kowalski", "Rafał Kawa", "Nicola Tesla"].map((user) => {
                                    return (
                                        <FriendCard name={user} />
                                    )
                                })
                            }
                        </section>
                    </div>
                </div>
            </section>
        </div>
    )
}

const FriendCard = ({ name }: { name: string }) => {
    return (
        <div className='grid items-center grid-cols-6 py-2'>
            <Avatar id='63751e85e542323a25132b1b' />
            <span className='col-span-4'>{name}</span>
            <div className="dropdown dropdown-left">
                <label tabIndex={0}> <BsThreeDotsVertical className='justify-self-end' /></label>
                <ul tabIndex={0} className="p-2 bg-gray-300 shadow dropdown-content menu rounded-box w-52">
                    <li><button className='text-center text-white bg-blue-400'>Accept</button></li>
                    <li><button className='text-center text-white bg-red-400'>Delete</button></li>
                </ul>
            </div>

        </div>
    )
}
interface userInfo {
    firstName: string,
    lastName: string,
    description: string,
    avatar: string,
    admin: boolean,
    posts: string[]
}