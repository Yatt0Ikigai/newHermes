import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


//comontents
import Navbar from "../components/NavbarLanding";
import LoadingSpinner from "../components/LoadingSpinner";

import WritePost from '../components/WritePost';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';
import PostModal from '../components/PostModal';
import StoriesMini from '../components/StoriesMini';


import storeChat from '../stores/chatStore';
import storeAuth from "../stores/loginStore";
import storeUser from '../stores/userStore';
interface chat {
  participants: String[]
  lastMessage: String
  messages: String[]
}
export default function LoginPage() {
  const navigate = useNavigate();
  const authStore = storeAuth();
  const userStore = storeUser();
  const chatStore = storeChat();


  useEffect(() => {
    chatStore.init();
    userStore.init();
  }, [])

  //if (!storeAuth.userStatus.logged && !storeUser.status.loading) navigate('/login');

  if (authStore.userStatus.loading || userStore.status.loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-white">
        <LoadingSpinner />
      </div>
    )
  }


  return (
    <div className='h-screen'>
      <div className='box'>
        <Sidebar />
        <div className='content lg:col-span-9'>
          <Navbar />
          <WritePost />
          <Post comments={[]} content={{ attachment: null, text: "Hello iys my first post :)" }} createdAt={"12"} creatorID={"63751e85e542323a25132b1b"} likes={20} />
        </div>
        <StoriesMini/>
      </div >
      <PostModal />
    </div>

  )
}

