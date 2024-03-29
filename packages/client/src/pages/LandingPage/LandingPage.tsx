import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import Navbar from "../../components/Navbar/Navbar";
import WritePost from '../../components/Post/WritePost';
import Post from '../../components/Post/Post';

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
    <div className='h-screen bg-secondaryBackground'>
      <Navbar />
      <div className='px-10 md:px-32 lg:px-52 xl:px-96 mt-10'>
        <div className='content lg:col-span-9 xl:col-span-8'>
          <WritePost />
          <Post comments={[]} content={{ attachment: null, text: "Hello iys my first post :)" }} createdAt={"12"} creatorID={"63751e85e542323a25132b1b"} likes={20} />
        </div>
      </div >
    </div>

  )
}

