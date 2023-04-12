import React, { useState } from 'react'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../../components/Navbar/Navbar';

import ApperanceTab from "./components/tabs/ApperanceTab";
import GeneralTab from "./components/tabs/GeneralTab";

export default function SettingsPage() {

  return (
    <div className='box-border w-screen h-screen overflow-hidden bg-primaryBackground'>
      <Navbar />
      <div className='box-border flex flex-col items-center min-w-[20rem] max-w-[60rem] text-white  bg-primaryBackground mx-auto'>
        <GeneralTab/>
        <ApperanceTab />
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

