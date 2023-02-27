import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


//comontents
import Navbar from "../../components/Navbar/NavbarLanding";
import LoadingSpinner from "../../components/LoadingSpinner";

import WritePost from '../../components/Post/WritePost';
import Post from '../../components/Post/Post';
import Sidebar from '../../components/Sidebar';
import PostModal from '../../components/Post/PostModal';
import StoriesMini from '../../components/StoriesMini';

import useLoad from "../../hooks/useLoad";
import Cookies from 'js-cookie';
interface chat {
  participants: String[]
  lastMessage: String
  messages: String[]
}
export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get('logged_in') === 'false') navigate('/login');
  }, [Cookies.get('logged_in')]);


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

