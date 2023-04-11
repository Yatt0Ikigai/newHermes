import React, { useEffect, useState } from 'react'
import UploadImage from './components/UploadImage'
import { ToastContainer } from "react-toastify";
import UploadFileInput from "../../components/UploadFileInput";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar/Navbar';

export default function SettingsPage() {
  const [avatar, setAvatar] = useState<File | null>(null);
  return (
    <div className='box-border w-screen h-screen overflow-hidden bg-primaryBackground'>
      <Navbar />
      <div className='box-border flex flex-col items-center min-w-[20rem] max-w-[60rem] text-white  bg-primaryBackground mx-auto'>
        <section className='w-full'>
          <h2 className='py-4 text-xl border-b border-white'>Genereal settings</h2>
          <Tab
            header='Name and Surname'
            placeholder='Jan Kowalski'>
            <div className='flex justify-center grow'>
              <form className='grid grid-cols-2 gap-y-1 gap-x-2'>
                <label htmlFor="" className='place-self-end'>Name</label>
                <input type="text" className='px-2 py-1 bg-transparent border focus:outline-none border-accent' />

                <label htmlFor="" className='place-self-end'>Surname</label>
                <input type="text" className='px-2 py-1 bg-transparent border focus:outline-none border-accent' />

                <button className='px-4 py-2 text-white bg-primaryHighlight rounded-xl'>Submit</button>
                <button className='px-4 py-2 text-white bg-secondaryHighlight rounded-xl'>Decline</button>
              </form>
            </div>
          </Tab>
        </section>
        <section className='w-full'>
          <h2 className='py-4 text-xl border-b border-white'>Appearance settings</h2>
          <Tab
            header='Avatar'>
            <div className='flex justify-center grow'>
              <form className='grid grid-cols-2 gap-y-1 gap-x-2'>
                <UploadFileInput setFunction={() => { }}>
                  <button className='px-4 py-2 bg-primaryHighlight'>Upload Avatar</button>
                </UploadFileInput>
              </form>
            </div>
          </Tab>
        </section>
        <section className='w-full'>
          <h2 className='py-4 text-xl border-b border-white'>Security settings</h2>
          <Tab
            header='Email'
            placeholder='awsd@gmail.com'>
            <div className='flex justify-center grow'>
              <form className='grid grid-cols-2 gap-y-1 gap-x-2'>
                <label htmlFor="" className='place-self-end'>New Email</label>
                <input type="text" className='px-2 py-1 bg-transparent border focus:outline-none border-accent' />

                <button className='px-4 py-2 text-white bg-primaryHighlight rounded-xl'>Submit</button>
                <button className='px-4 py-2 text-white bg-secondaryHighlight rounded-xl'>Decline</button>
              </form>
            </div>
          </Tab>
          <Tab
            header='Password'>
            <div className='flex justify-center grow'>
              <form className='grid grid-cols-2 gap-y-1 gap-x-2'>
                <label htmlFor="" className='place-self-end'>Old Password</label>
                <input type="text" className='px-2 py-1 bg-transparent border focus:outline-none border-accent' />

                <label htmlFor="" className='place-self-end'>New Password</label>
                <input type="text" className='px-2 py-1 bg-transparent border focus:outline-none border-accent' />

                <label htmlFor="" className='place-self-end'>Confirm New Password</label>
                <input type="text" className='px-2 py-1 bg-transparent border focus:outline-none border-accent' />

                <button className='px-4 py-2 text-white bg-primaryHighlight rounded-xl'>Submit</button>
                <button className='px-4 py-2 text-white bg-secondaryHighlight rounded-xl'>Decline</button>
              </form>
            </div>
          </Tab>
        </section>
      </div>
      <ToastContainer position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
    </div>
  )
}

const Tab = ({
  header, placeholder, children
}: { header: string, placeholder?: string, children: React.ReactChild | React.ReactChildren }) => {
  const [active, setActive] = useState(false);

  return (
    <button className={`box-border flex items-center justify-between w-full gap-4 px-4 py-2 m-2 -translate-x-2 border-b border-accent ${active ? "" : "hover:bg-secondaryBackground"}`} onClick={() => setActive(true)}>
      <h3>{header}</h3>
      {
        active ?
          children
          :
          <>
            <span className='mr-auto text-gray-400'>{placeholder}</span>
            <span className='text-primaryHighlight'>Edit</span>
          </>

      }
    </button>
  )
}