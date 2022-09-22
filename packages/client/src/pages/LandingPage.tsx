import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import authStore from "../loginStore";

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
        <div className="navbar bg-base-100 border-b">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </label>
              <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Item 1</a></li>
                <li tabIndex={0}>
                  <a className="justify-between">
                    Parent
                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                  </a>
                  <ul className="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                  </ul>
                </li>
                <li><a>Item 3</a></li>
              </ul>
            </div>
            <a className="btn btn-ghost normal-case text-xl" href='/'>Hermes Post</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0">
              <li><a>Item 1</a></li>
              <li tabIndex={0}>
                <a>
                  Parent
                  <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                </a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <div className="navbar-end">
            <button className="btn btn-active btn-ghost" onClick={() => { store.authLogOut() }}>Log Out</button>
          </div>
        </div>
        <div className='grow main relative'>
          <div className='main-friendlist h-full'>
            <section className='flex justify-around items-center'>
              <p>Chats</p>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn m-1 rounded-full">...</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a>Item 1</a></li>
                  <li><a>Item 2</a></li>
                </ul>
              </div>
            </section>
            <input type="text" placeholder="Search" className="input input-bordered m-4 w-[calc(100%-2rem)]" />
            <section>
              {

              }
            </section>
          </div>
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
