import React, { useEffect, useState } from 'react'
import { Link,useNavigate} from 'react-router-dom';
import authStore from '../stores/loginStore';

export default function LoginPage() {
    const [userEmail,setUserEmail] = useState('');
    const [userPassword,setUserPassword] = useState('');
    const storeAuth = authStore();
    const navigate = useNavigate();

    useEffect( () => {
      if(storeAuth.userStatus.logged) navigate('/')
    },[]);

    return (
        <div className="hero min-h-screen bg-white text-black">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="lg:text-left flex flex-col items-center">
              <h1 className="text-5xl font-bold text-center">Login now!</h1>
              <p className="py-6 text-2xl text-center">With hermes everyone is near you</p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-gray-200">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="text" placeholder="email" className="input input-bordered bg-gray-500" onChange={(e) => {
                    setUserEmail(e.currentTarget.value);
                  }} />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="text" placeholder="password" className="input input-bordered bg-gray-500" onChange={(e) => {
                    setUserPassword(e.currentTarget.value);
                  }} />
                  <div className="label">
                    <button className="label-text-alt link link-hover">Forgot password?</button>
                    <Link to='/register' className="label-text-alt link link-hover">Register?</Link>
                  </div>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" onClick={async(e) => {
                    e.preventDefault();
                    var status = 0;
                    if (userEmail && userPassword) status = await storeAuth.authLogIn(userEmail, userPassword);
                    if(status === 200) navigate('/');
                  }}>Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
}
