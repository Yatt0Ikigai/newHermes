import React, { useRef, useState } from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { GoComment } from 'react-icons/go';
import { RiShareForwardLine } from 'react-icons/ri';

export default function Post(post: IPost) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const commentRef = useRef<HTMLInputElement>(null);

  return (
    <div className='bg-gray-200 w-full box-border util-padding-box util-standard-round my-4 shadow-lg h-max'>
      <section className='flex justify-start items-center'>
        <CgProfile className={"avatar-img"} />
        <div className='flex flex-col ml-2 grow'>
          <span className='text-md font-bold'>Jan Kowalski</span>
          <span className='text-sm font-light'>5 mins ago</span>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0}> <BsThreeDots className='icons p-2 bg-gray-300 rounded-full' /></label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-gray-300 rounded-box w-52">
            <li><a>Report Post</a></li>
          </ul>
        </div>
      </section>
      <section className='p-4'>
        {post.content.text}
      </section>
      <section className='flex justify-around util-child-center border-gray-500 py-2 border-t'>
        <span>{
            liked ? <AiFillLike/> : <AiOutlineLike className='icons' />
          } </span>
        <button onClick={e => {
          setShowComments(true)
          commentRef.current?.focus();
        }}><GoComment className='icons' /></button>
        <span><RiShareForwardLine className='icons' /></span>
      </section>
      <section className={`border-gray-400 pt-2 border-t ${showComments ? "visible" : "hidden"}`}>
        <div className='input bg-gray-200 flex flex-col px-0'>
          <div className='flex'>
            <CgProfile className={"avatar-img"} />
            <input type="text" placeholder="Type here" className="input input-ghost bg-opacity-0 w-full max-w-x focus:bg-transparent focus:border-0 focus:outline-0" ref={commentRef} />
          </div>
        </div>
        <div className='flex'>
          <CgProfile className={"avatar-img"} />
          <div className='flex flex-col'>
            <div className='flex flex-col'>
              <span>Bartosz Myśliń</span>
              <span>A czy Obniżka może być w górę?</span>
            </div>
            <div className='font-black text-xs'>
              <button className='pr-2'>Like it</button>
              <span>1 day</span>
            </div>
          </div>
          <div className="dropdown dropdown-end self-center">
            <label tabIndex={0}> <BsThreeDots className='icons p-2' /></label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-gray-300 rounded-box w-52">
              <li><a>Report Post</a></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

interface IPost {
  creatorID: string,
  createdAt: string,
  content: {
    text: string,
    attachment: string | null,
  },
  comments: {
    commentId: string,
    creatorId: string,
    createdAt: Date
  }[] | null,
  likes: number,
}


