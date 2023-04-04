import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import Avatar from '../../../components/Avatar'
import { useParams } from 'react-router-dom'
import OutsideAlerter from '../../../utils/outsideAlerter';

import { trpc } from "../../../utils/trpc";

export default function PresentationModal() {
  const [userInfo, setUserInfo] = useState({
    isYou: false,
    isFriend: false,
    isInvited: false,
    sendedInvite: false
  })
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();
  const { data } = trpc.profile.getProfileInfo.useQuery({ id: userId as string }, {
    onSuccess: (e) => {
      setUserInfo((prev) => ({ isYou: e.result.owner, isFriend: e.result.friend, isInvited: e.result.pendingRequest, sendedInvite: e.result.sendedRequest }))
      setIsLoading(false);
    }
  });
  const [menu, setMenu] = useState<string | null>("posts");
  const location = useLocation();
  useEffect(() => {
    const link = window.location.href.split("/");
    if (link.length < 6) setMenu('posts');
    if (link[5] === "info") setMenu("info");
    if (link[5] === "friends") setMenu("friends");
    if (link[5] === "pictures") setMenu("pictures");
  }, [location])

  const handleUnfriend = trpc.action.removeFriendship.useMutation({
    onSuccess: (e) => { if (e.status === "success") setUserInfo((prev) => ({ ...prev, isFriend: false })); setIsLoading(false); }
  })

  const handleSendInvite = trpc.action.sendFriendshipInvite.useMutation({
    onSuccess: (e) => { if (e.status === "success") setUserInfo((prev) => ({ ...prev, isInvited: true })); setIsLoading(false); }
  })

  const handleCancelInvite = trpc.action.cancelFriendshipInvite.useMutation({
    onSuccess: (e) => { if (e.status === "success") setUserInfo((prev) => ({ ...prev, isInvited: false })); setIsLoading(false); }
  })

  const handleAcceptInvite = trpc.action.acceptFriendship.useMutation({
    onSuccess: (e) => { if (e.status === "success") setUserInfo((prev) => ({ ...prev, sendedInvite: false, isFriend: true })); setIsLoading(false); }
  })

  const handleDeclineInvite = trpc.action.declineFrienship.useMutation({
    onSuccess: (e) => { if (e.status === "success") setUserInfo((prev) => ({ ...prev, sendedInvite: false, isFriend: false })); setIsLoading(false); }
  })

  return (
    <div className='flex flex-col w-screen bg-primaryBackground box'>
      <div className='h-[20rem] bg-black md:h-[25rem] rounded-b-2xl'>
        {/* BACKGROUND TODO */}
      </div>
      <div className='flex flex-col items-center gap-4 px-4 pb-4 border-b md:flex-row border-accent md:pb-0'>
        <div className='relative -translate-y-4'>
          <div className="w-40 h-40 overflow-hidden rounded-full">
            <Avatar id={userId as string} />
          </div>
        </div>
        <div className='flex flex-col justify-center md:translate-y-4'>
          <span className='text-2xl font-bold text-white'>
            {data?.result?.firstName} {data?.result?.lastName}
          </span>
          <span className='font-medium text-md'>
            {data?.result.friendNumber} Friends
          </span>
        </div>
        {
          userInfo.isFriend && <FriendButtons callback={() => handleUnfriend.mutate({ friendId: userId as string })} />
        }
        {
          userInfo.sendedInvite && <DecideFriendshipButton acceptCallback={() => {
            handleAcceptInvite.mutate({ friendId: userId as string });
          }} declineCallback={() => {
            handleDeclineInvite.mutate({ friendId: userId as string });
          }} />
        }
        {
          !userInfo.isFriend && !userInfo.isYou && !userInfo.sendedInvite && <InviteButtons pendingInvite={userInfo.isInvited} inviteCallback={() => {
            setIsLoading(true);
            handleSendInvite.mutate({ friendId: userId as string })
          }
          } removeInviteCallback={() => {
            setIsLoading(true);
            handleCancelInvite.mutate({ friendId: userId as string })
          }} isLoading={isLoading} />
        }
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

import { AiOutlineUserDelete } from "react-icons/ai";
import outsideAlerter from "../../../utils/outsideAlerter";
import LoadingSpinner from '../../../components/LoadingSpinner';


const FriendButtons = ({ callback }: { callback: () => void }) => {
  const [click, setClick] = useState(false);
  const clickRef = useRef<HTMLDivElement>(null);

  outsideAlerter({
    ref: clickRef, callback: () => {
      setClick(false);
    }
  })


  return (
    <div className='flex items-center gap-2 md:ml-auto'>
      <div className='relative' ref={clickRef} >
        <button
          onClick={() => setClick(!click)}
          className='px-4 py-2 font-medium text-white transition-all rounded-md bg-secondaryBackground h-max hover:brightness-125 active:scale-95'>
          Friend
        </button>
        {
          click && <div
            className='text-white p-4 flex flex-col absolute bottom-0 left-1/2 translate-y-[calc(100%+.2rem)] -translate-x-1/2 border border-accent bg-secondaryBackground rounded-xl'>
            <div className='flex gap-2'>
              <AiOutlineUserDelete className='w-6 h-6' />
              <button onClick={callback}>Unfriend</button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

const DecideFriendshipButton = ({ acceptCallback, declineCallback }: { acceptCallback: () => void, declineCallback: () => void }) => {
  return (
    <div className='flex items-center gap-2 md:ml-auto'>
      <button
        onClick={() => {
          acceptCallback();
        }}
        className='px-4 py-2 font-medium text-white transition-all rounded-md bg-primaryHighlight h-max hover:brightness-125 active:scale-95'>
        Accept
      </button>
      <button
        onClick={() => {
          declineCallback();
        }}
        className='px-4 py-2 font-medium text-white transition-all rounded-md bg-accent h-max hover:brightness-125 active:scale-95'>
        Decline
      </button>
    </div>
  )
}

const InviteButtons = ({ pendingInvite, inviteCallback, removeInviteCallback, isLoading }: { pendingInvite: boolean, inviteCallback: () => void, removeInviteCallback: () => void, isLoading: boolean }) => {
  return (
    <div className='flex items-center gap-2 md:ml-auto'>
      <div className='relative' >
        {
          pendingInvite ?
            <button
              onClick={() => {
                removeInviteCallback();
              }}
              className='px-4 py-2 font-medium text-white transition-all rounded-md bg-primaryHighlight h-max hover:brightness-125 active:scale-95'>
              {isLoading ? <>Wait...</> : <>Cancel Request</>}
            </button>
            :
            <button
              onClick={() => {
                inviteCallback();
              }}
              className='px-4 py-2 font-medium text-white transition-all rounded-md bg-primaryHighlight h-max hover:brightness-125 active:scale-95'>
              {isLoading ? <>Wait...</> : <>Send request</>}

            </button>
        }
      </div>
    </div>
  )
}

