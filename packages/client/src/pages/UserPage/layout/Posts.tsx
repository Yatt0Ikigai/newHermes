import React from 'react'

import PicturesModal from "../modals/PicturesModal";
import FriendsModal from "../modals/FriendModal";

import WritePost from "../../../components/Post/WritePost";

export default function Posts() {
  return (
    <div className='box-border flex flex-col w-full gap-2 px-20 py-8 md:flex-row md:px-0'>
      <div className='flex flex-col gap-8 grow-[2]'>
        <PicturesModal/>
        <FriendsModal/>
      </div>
      <div className='grow-[3]'>
         <WritePost/>
      </div>
    </div>
  )
}
