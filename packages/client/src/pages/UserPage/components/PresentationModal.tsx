import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import Avatar from '../../../components/Avatar'
import { useParams } from 'react-router-dom'

export default function PresentationModal() {
  const { userId } = useParams();
  const [menu, setMenu] = useState<string | null>("posts");
  const location = useLocation();

  useEffect(() => {
    const link = window.location.href.split("/");
    if (link.length < 6) setMenu('posts');
    if (link[5] === "info") setMenu("info");
    if (link[5] === "friends") setMenu("friends");
    if (link[5] === "pictures") setMenu("pictures");
  }, [location])

  return (
    <div className='box-border flex flex-col w-screen bg-primaryBackground lg:px-40 xl:px-64'>
      <div className='h-[20rem] bg-black md:h-[25rem] rounded-b-2xl'>
        {/* BACKGROUND TODO */}
      </div>
      <div className='flex flex-col items-center gap-4 px-4 pb-4 border-b md:flex-row border-accent md:pb-0'>
        <div className='w-40 h-40 overflow-hidden -translate-y-4 rounded-full'>
          <Avatar id={null} />
        </div>
        <div className='flex flex-col justify-center md:translate-y-4'>
          <span className='text-2xl font-bold text-white'>
            Piotr Berestka
          </span>
          <span className='font-medium text-md'>
            202 Friends
          </span>
        </div>
        <div className='flex items-center gap-2 md:ml-auto'>
          <div className='px-4 py-2 font-medium text-white rounded-md bg-secondaryBackground h-max'>
            Friend
          </div>
          <div className='px-4 py-2 font-medium text-white rounded-md bg-primaryHighlight h-max'>
            Send Message
          </div>
        </div>
      </div>
      <div className='flex justify-center gap-2 md:justify-start'>
        <Tab highlight={menu === "posts"} info={"Posts"} path={`/profile/${userId}`} />
        <Tab highlight={menu === "info"} info={"Informations"} path={`/profile/${userId}/info`} />
        <Tab highlight={menu === "friends"} info={"Friends"} path={`/profile/${userId}/friends`} />
        <Tab highlight={menu === "pictures"} info={"Pictures"} path={`/profile/${userId}/pictures`} />
      </div>
    </div>
  )
}

const Tab = ({ path, highlight, info }: { path: string, highlight: boolean, info: string }) => {
  return (
    <Link to={path} className={`relative text-base p-3 m-1 rounded-md transition-all ${highlight ? "text-primaryHighlight" : "hover:bg-tertiaryBackground"}`}>
      <span>
        {info}
      </span>
      <div className={`absolute left-0 bottom-0 w-full h-1 rounded-2xl translate-y-full ${highlight ? "bg-primaryHighlight" : ""}`}>
        &nbsp;
      </div>
    </Link>
  )
}