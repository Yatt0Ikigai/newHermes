import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import storeAuth from '../stores/loginStore';
import { trpc } from "../utils/trpc";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const authStore = storeAuth();
  const navigate = useNavigate();

  const login = trpc.auth.login.useMutation({})

  useEffect(() => {
    if (Cookies.get('logged_in') === 'true') navigate('/');
  }, [Cookies.get('logged_in')]);

  return (
    <div className="min-h-screen text-black bg-white hero">
      <div className="flex-col hero-content lg:flex-row-reverse">
        <div className="flex flex-col items-center lg:text-left">
          <h1 className="text-5xl font-bold text-center">Login now!</h1>
          <p className="py-6 text-2xl text-center">With hermes everyone is near you</p>
        </div>
        <div className="flex-shrink-0 w-full max-w-sm bg-gray-200 shadow-2xl card">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="text" placeholder="email" className="bg-gray-500 input input-bordered" onChange={(e) => {
                setUserEmail(e.currentTarget.value);
              }} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="text" placeholder="password" className="bg-gray-500 input input-bordered" onChange={(e) => {
                setUserPassword(e.currentTarget.value);
              }} />
              <div className="label">
                <button className="label-text-alt link link-hover">Forgot password?</button>
                <Link to='/register' className="label-text-alt link link-hover">Register?</Link>
              </div>
            </div>
            <div className="mt-6 form-control">
              <button className="btn btn-primary" onClick={async (e) => {
                e.preventDefault();
                var status = false;
                if (userEmail && userPassword) login.mutate({ email: userEmail, password: userPassword });
              }}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
