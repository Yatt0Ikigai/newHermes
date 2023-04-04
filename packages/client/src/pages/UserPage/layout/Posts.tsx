import React from 'react'

import PicturesModal from "../modals/PicturesModal";
import FriendsModal from "../modals/FriendModal";
import WritePost from "../../../components/Post/WritePost";

import { trpc } from '../../../utils/trpc';
import { useParams } from 'react-router-dom';

export default function Posts() {
  const { userId } = useParams();
  const { data } = trpc.profile.getProfileInfo.useQuery({ id: userId as string });

  return (
    <div className='box-border flex flex-col w-full gap-2 px-20 py-8 md:flex-row md:px-0'>
      <div className='flex flex-col gap-8 grow-[2]'>
        <PicturesModal />
        <FriendsModal />
      </div>
      <div className='grow-[3]'>
        {data?.result?.owner && <WritePost />}
      </div>
    </div>
  )
}
