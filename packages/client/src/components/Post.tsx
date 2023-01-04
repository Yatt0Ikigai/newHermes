import React, { useRef, useState } from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { GoComment } from 'react-icons/go';
import { RiShareForwardLine } from 'react-icons/ri';
import Avatar from './Avatar';

export default function Post(post: IPost) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const commentRef = useRef<HTMLInputElement>(null);

  return (
    <div className='box-border w-full my-4 bg-gray-200 shadow-lg util-padding-box util-standard-round h-max'>
      <section className='flex items-center justify-start'>
        <div className='w-16 h-16'>
          <Avatar id={post.creatorID} />
        </div>
        <div className='flex flex-col ml-2 grow'>
          <span className='font-bold text-md'>Jan Kowalski</span>
          <span className='text-sm font-light'>5 mins ago</span>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0}> <BsThreeDots className='p-2 bg-gray-300 rounded-full icons' /></label>
          <ul tabIndex={0} className="p-2 bg-gray-300 shadow dropdown-content menu rounded-box w-52">
            <li><a>Report Post</a></li>
          </ul>
        </div>
      </section>
      <section className='p-4'>
        {post.content.text}
      </section>
      <section className='flex justify-around py-2 border-t border-gray-500 util-child-center'>
        <span>{
          liked ? <AiFillLike /> : <AiOutlineLike className='icons' />
        } </span>
        <button onClick={e => {
          setShowComments(true)
          commentRef.current?.focus();
        }}><GoComment className='icons' /></button>
        <span><RiShareForwardLine className='icons' /></span>
      </section>
      <section className={`border-gray-400 pt-2 border-t ${showComments ? "visible" : "hidden"}`}>
        <div className='flex flex-col px-0 bg-gray-200 input'>
          <div className='flex'>
            <CgProfile className={"avatar-img"} />
            <input type="text" placeholder="Type here" className="w-full bg-opacity-0 input input-ghost max-w-x focus:bg-transparent focus:border-0 focus:outline-0" ref={commentRef} />
          </div>
        </div>
        <div className='flex'>
          <CgProfile className={"avatar-img"} />
          <div className='flex flex-col'>
            <div className='flex flex-col'>
              <span>Bartosz Myśliń</span>
              <span>A czy Obniżka może być w górę?</span>
            </div>
            <div className='text-xs font-black'>
              <button className='pr-2'>Like it</button>
              <span>1 day</span>
            </div>
          </div>
          <div className="self-center dropdown dropdown-end">
            <label tabIndex={0}> <BsThreeDots className='p-2 icons' /></label>
            <ul tabIndex={0} className="p-2 bg-gray-300 shadow dropdown-content menu rounded-box w-52">
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


