import React, { useEffect } from 'react'
import UploadImage from '../components/UploadImage'
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

export default function SettingsPage() {

  return (
    <>
      <div className='flex flex-col items-center w-screen h-screen bg-gray-200'>
        <section>
          <span>Genereal settings</span>
          <UploadImage />
          <BasicCompontent />
        </section>
        <section>
          <button onClick={async () => {

          }}>trpc</button>
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
    </>
  )
}


const BasicCompontent = () => {

  return (
    <div>
    </div>
  )
}