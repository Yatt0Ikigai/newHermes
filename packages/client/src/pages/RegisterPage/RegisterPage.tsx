import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import authStore from '../../stores/loginStore';
import { trpc } from '../../utils/trpc';
export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const storeAuth = authStore();
  const navigate = useNavigate();
  const register = trpc.auth.register.useMutation({
    onSuccess: () => {
      navigate('/login');
    }
  })

  return (
    <div>
      <form className='flex flex-col' onSubmit={(e) => {
        e.preventDefault();
        if (email && password && (password == confirmPassword) && firstName && lastName) {
          storeAuth.authRegister(firstName, lastName, email, password);
        } else alert("fill again")
      }}>
        <div className="min-h-screen text-white hero bg-primaryBackground">
          <div className="flex-col hero-content lg:flex-row-reverse">
            <div className="flex flex-col items-center lg:text-left">
              <h1 className="text-5xl font-bold text-center">You can create account for Free!</h1>
              <p className="py-6 text-2xl text-center">Satisfaction guaranteed</p>
            </div>
            <div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-secondaryBackground">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="font-semibold">First name</span>
                  </label>
                  <input type="text" placeholder="First name" className="px-4 py-2 m-1 border rounded-md bg-primaryBackground focus:outline-none border-accent " onChange={(e) => {
                    setFirstName(e.currentTarget.value);
                  }} id="register-fname" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="font-semibold">Last name</span>
                  </label>
                  <input type="text" placeholder="Last name" className="px-4 py-2 m-1 border rounded-md bg-primaryBackground focus:outline-none border-accent " onChange={(e) => {
                    setLastName(e.currentTarget.value);
                  }} id="register-lname" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="font-semibold">Email</span>
                  </label>
                  <input type="text" placeholder="email" className="px-4 py-2 m-1 border rounded-md bg-primaryBackground focus:outline-none border-accent " onChange={(e) => {
                    setEmail(e.currentTarget.value);
                  }} id="register-email" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="font-semibold">Password</span>
                  </label>
                  <input type="text" placeholder="password" className="px-4 py-2 m-1 border rounded-md bg-primaryBackground focus:outline-none border-accent " onChange={(e) => {
                    setPassword(e.currentTarget.value);
                  }} id="register-fpassword" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="font-semibold">Confirm Password</span>
                  </label>
                  <input type="text" placeholder="password" className="px-4 py-2 m-1 border rounded-md bg-primaryBackground focus:outline-none border-accent " onChange={(e) => {
                    setConfirmPassword(e.currentTarget.value);
                  }} id="register-spassword" />
                </div>
                <div className="label">
                  <Link to={'/login'} className="font-semibold-alt link link-hover">Already have acc? Log in.</Link>
                </div>
                <div className="mt-6 form-control">
                  <button className="btn btn-primary" onClick={async (e) => {
                    e.preventDefault();
                    if (email && firstName && lastName && (password === confirmPassword) && password)
                      register.mutate({ firstName, lastName, email, password })
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
