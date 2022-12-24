import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authStore from "../stores/loginStore";
import userStore from '../stores/userStore';

//comontents
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";

import WritePost from '../components/WritePost';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';
import PostModal from '../components/PostModal';
import StoriesMini from '../components/StoriesMini';
interface chat {
  participants: String[]
  lastMessage: String
  messages: String[]
}
export default function LoginPage() {
  const navigate = useNavigate();
  const storeAuth = authStore();
  const storeUser = userStore();


  useEffect(() => {
    storeUser.getUserInfo();
  }, [])

  //if (!storeAuth.userStatus.logged && !storeUser.status.loading) navigate('/login');

  if (storeAuth.userStatus.loading || storeUser.status.loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-white">
        <LoadingSpinner />
      </div>
    )
  }


  return (
    <>
      <div className='grid grid-cols-12 gap-10 bg-white text-gray-600'>
        <Sidebar />
        <div className='col-span-8'>
          <Navbar />
          <WritePost />
          <Post comments={[]} content={{ attachment: null, text: "Hello iys my first post :)" }} createdAt={"12"} creatorID={"1"} likes={20} />
        </div>
        <StoriesMini/>
      </div >
      <PostModal />
    </>

  )
}

