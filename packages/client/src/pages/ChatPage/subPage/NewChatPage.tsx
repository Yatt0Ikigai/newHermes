import React, { useEffect, useRef, useState } from 'react'

import ChatSidebar from '../components/ChatSidebar';
import Navbar from "../../../components/Navbar/Navbar"
import { trpc } from '../../../utils/trpc';
import Avatar from '../../../components/Avatar';
import { useNavigate } from 'react-router-dom';
import storeChat from '../../../stores/chatStore';
import outsideAlerter from '../../../utils/outsideAlerter';

export default function NewChatPage() {
    const { data: user } = trpc.users.getSelfInfo.useQuery();
    const { data: friends } = trpc.friends.fetchFriendList.useQuery();
    const { data: chats } = trpc.chats.fetchChats.useQuery();
    const createChat = trpc.chats.createChat.useMutation({
        onSuccess: (data) => {
            const friend = data.data.chat.participants.find(person => person.id != user?.user?.id) as { firstName: string, lastName: string, id: string };
            chatStore.openChat({
                chatId: data.data.chat.id,
                chatName: friend.firstName + " " + friend.lastName,
                chatImage: friend.id,
                chatParticipants: [friend]
            })
            navigate(`/chats?chatId=${data.data.chat.id}`)
        }
    })
    const inputRef = useRef<HTMLDivElement>(null);
    const [focus, setFocus] = useState(false);
    const [userInput, setUserInput] = useState("");
    const chatStore = storeChat();
    const navigate = useNavigate();

    outsideAlerter({ ref: inputRef, callback: () => { setFocus(false)}})

    return (
        <div className='flex flex-col w-screen h-screen overflow-hidden'>
            <Navbar />
            <main className='relative flex flex-auto overflow-y-auto bg-primaryBackground '>
                <ChatSidebar />
                <div className='flex p-2 border-b border-accent h-6 gap-2 font-xl text-white relative grow' ref={inputRef}>
                    <span>To:</span>
                    <input type="text" className='bg-transparent focus:outline-none' value={userInput} onChange={(e) => setUserInput(e.currentTarget.value)} onClick={() => setFocus(true)} />
                    {
                        focus && <div className='w-80 h-96 px-4 py-2 rounded-xl border border-accent absolute z-10 bg-primaryBackground top-[calc(100%-.5rem)] left-8 flex flex-col overflow-y-auto'>
                            {friends?.data.friendList.map((friend) => {
                                const friendName = friend.firstName + " " + friend.lastName;
                                if (friendName.toLocaleLowerCase().includes(userInput.toLowerCase() as string))
                                    return (
                                        <button className='flex gap-2 pt-2 text-white items-center' onClick={(e) => {
                                            const chat = chats?.data.find(chat => {
                                                return chat.participants.some(user => user.id === friend.id)
                                            })
                                            if (chat) {
                                                chatStore.openChat({
                                                    chatId: chat.id,
                                                    chatName: friend.firstName + " " + friend.lastName,
                                                    chatImage: friend.id,
                                                    chatParticipants: [friend]
                                                })
                                                navigate(`/chats?chatId=${chat.id}`);
                                            }
                                            else createChat.mutate({ participantsIDs: [friend.id] })

                                        }}>
                                            <div className='w-8 h-8 rounded-full overflow-hidden '>
                                                <Avatar id={friend.id} />
                                            </div>
                                            <span className='font-light'>
                                                {friend.firstName + " " + friend.lastName}
                                            </span>
                                        </button>
                                    )
                            })
                            }
                        </div>
                    }
                </div>
            </main>
        </div >
    )
}


