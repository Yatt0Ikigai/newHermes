import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import authStore from '../stores/loginStore';

export default function RegisterPage() {
    const [userFirstName,setUserFirstName] = useState('');
    const [userLastName,setUserLastName] = useState('');
    const [userEmail,setUserEmail] = useState('');
    const [userPassword,setUserPassword] = useState('');
    const [userConfirmPassword,setUserConfirmPassword] = useState('');
    const storeAuth = authStore();
    const navigate = useNavigate();
    
    return (
        <div>
          <form className='flex flex-col' onSubmit={(e) => {
            e.preventDefault();
            if (userEmail && userPassword && (userPassword == userConfirmPassword) && userFirstName && userLastName) {
              storeAuth.authRegister(userFirstName, userLastName, userEmail, userPassword);
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
                      <Link to={'/login'}className="label-text-alt link link-hover">Already have acc? Log in.</Link>
                    </div>
                    <div className="form-control mt-6">
                      <button className="btn btn-primary" onClick={async(e) => {
                        var status = 0;
                        e.preventDefault();
                        if (userEmail && userFirstName && userLastName && (userPassword === userConfirmPassword) && userPassword)
                          status = await storeAuth.authRegister(userFirstName, userLastName, userEmail, userPassword);
                        else alert("Make sure u filled all forms correct");
                        if(status === 201) navigate('/');
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
