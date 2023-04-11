import React, { useRef, useState } from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { GoComment } from 'react-icons/go';
import { RiShareForwardLine } from 'react-icons/ri';
import Avatar from '../Avatar';
import { Link } from 'react-router-dom';

export default function Post(post: IPost) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const commentRef = useRef<HTMLInputElement>(null);

  return (
    <div className='box-border w-full p-4 my-4 text-white border shadow-lg rounded-xl bg-primaryBackground util-padding-box util-standard-round h-max border-accent'>
      <section className='flex items-center justify-start'>
        <Link to={`/profile/${post.creatorID}`} className='w-10 h-10 overflow-hidden rounded-md'>
          <Avatar id={post.creatorID} />
        </Link>
        <div className='flex flex-col ml-2 grow'>
        <Link to={`/profile/${post.creatorID}`} className='font-bold text-md'>Jan Kowalski</Link>
          <span className='text-sm font-light'>5 mins ago</span>
        </div>
      </section>
      <section className='py-4'>
        {post.content.text}
      </section>
      <section className='flex justify-around py-2 border-t border-accent util-child-center'>
        <span>{
          liked ? <AiFillLike onClick={() => { setLiked(false) }} /> : <AiOutlineLike onClick={() => { setLiked(true) }} className='icons' />
        } </span>
        <button onClick={e => {
          setShowComments(!showComments)
          commentRef.current?.focus();
        }}><GoComment className='icons' /></button>
      </section>
      <section className={`border-accent pt-2 border-t ${showComments ? "visible" : "hidden"}`}>
        <div className='flex h-12 gap-2'>
          <div className={'h-full aspect-square rounded-full overflow-hidden'}>
            <Avatar id={null} />
          </div>
          <input type="text" placeholder="Type here" className="px-4 grow bg-secondaryBackground rounded-xl focus:outline-none" ref={commentRef} />
        </div>
        <div>

        </div>
      </section>
    </div>
  )
}

const Comment = ({ authorId }: { authorId: string}) => {
  return (
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


