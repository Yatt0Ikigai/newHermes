import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import authStore from "../loginStore";

//comontents
import AddFriendsModal from "../components/AddFriendModal";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FriendRequestListModal from "../components/FriendRequestListModal"
interface chat {
  participants: String[]
  lastMessage: String
  messages: String[]
}
export default function LoginPage() {
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userConfirmPassword, setUserConfirmPassword] = useState("")
  const [userFirstName, setUserFirstName] = useState("")
  const [userLastName, setUserLastName] = useState("")
  const [signIn, setSignIn] = useState(true);
  const [chats, setChats] = useState<chat[]>([]);
  const store = authStore();

  if (store.isLogged) {
    return (
      <div className='h-screen flex flex-col'>
        <AddFriendsModal/>
        <FriendRequestListModal/>
        <Navbar/>
        <div className='grow main relative'>
          <Sidebar friendList={[{firstName: "", lastName: "", id: ""}]}/>
          <div className='main-content h-full'>

          </div>
        </div>
      </div>
    )
  }
  if (signIn) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="lg:text-left flex flex-col items-center">
            <h1 className="text-5xl font-bold text-center">Login now!</h1>
            <p className="py-6 text-2xl text-center">With hermes everyone is near you</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="email" className="input input-bordered" onChange={(e) => {
                  setUserEmail(e.currentTarget.value);
                }} />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="text" placeholder="password" className="input input-bordered" onChange={(e) => {
                  setUserPassword(e.currentTarget.value);
                }} />
                <div className="label">
                  <button className="label-text-alt link link-hover">Forgot password?</button>
                  <button className="label-text-alt link link-hover" onClick={() => {
                    setSignIn(false);
                  }}>Register?</button>
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={(e) => {
                  e.preventDefault();
                  if (userEmail && userPassword) store.authLogIn(userEmail, userPassword);
                }}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <form className='flex flex-col' onSubmit={(e) => {
        e.preventDefault();
        if (userEmail && userPassword && (userPassword == userConfirmPassword) && userFirstName && userLastName) {
          store.authRegister(userFirstName, userLastName, userEmail, userPassword);
        } else alert("fill again")
      }}>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="lg:text-left flex flex-col items-center">
              <h1 className="text-5xl font-bold  text-center">You can create account for Free!</h1>
              <p className="py-6 text-2xl text-center">Satisfaction guaranteed</p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">First name</span>
                  </label>
                  <input type="text" placeholder="First name" className="input input-bordered" onChange={(e) => {
                    setUserFirstName(e.currentTarget.value);
                  }} id="register-fname" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last name</span>
                  </label>
                  <input type="text" placeholder="Last name" className="input input-bordered" onChange={(e) => {
                    setUserLastName(e.currentTarget.value);
                  }} id="register-lname" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="text" placeholder="email" className="input input-bordered" onChange={(e) => {
                    setUserEmail(e.currentTarget.value);
                  }} id="register-email" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="text" placeholder="password" className="input input-bordered" onChange={(e) => {
                    setUserPassword(e.currentTarget.value);
                  }} id="register-fpassword" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input type="text" placeholder="password" className="input input-bordered" onChange={(e) => {
                    setUserConfirmPassword(e.currentTarget.value);
                  }} id="register-spassword" />
                </div>
                <div className="label">
                  <button className="label-text-alt link link-hover" onClick={() => {
                    setSignIn(true);
                  }}>Already have acc? Log in.</button>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" onClick={(e) => {
                    e.preventDefault();
                    if (userEmail && userFirstName && userLastName && (userPassword === userConfirmPassword) && userPassword)
                      store.authRegister(userFirstName, userLastName, userEmail, userPassword);
                    else alert("Make sure u filled all forms correct");
                  }}>Register</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
