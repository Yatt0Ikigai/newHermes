import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


//comontents
import Navbar from "../components/NavbarLanding";
import LoadingSpinner from "../components/LoadingSpinner";

import WritePost from '../components/WritePost';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';
import PostModal from '../components/PostModal';
import StoriesMini from '../components/StoriesMini';

import useLoad from "../hooks/useLoad";
interface chat {
  participants: String[]
  lastMessage: String
  messages: String[]
}
export default function LoginPage() {
  const navigate = useNavigate();

  const { loading, error } = useLoad();

 
  if(error) navigate('/login');
  if (loading) return (
      <LoadingSpinner/>
  )
  //if (authStore.userStatus.logged && authStore.userStatus.loading === false) navigate('/login');



  return (
    <div className='h-screen'>
      <div className='box'>
        <Sidebar />
        <div className='content lg:col-span-9 xl:col-span-8'>
          <Navbar />
          <WritePost />
          <Post comments={[]} content={{ attachment: null, text: "Hello iys my first post :)" }} createdAt={"12"} creatorID={"63751e85e542323a25132b1b"} likes={20} />
        </div>
        <StoriesMini />
      </div >
      <PostModal />
    </div>

  )
}

