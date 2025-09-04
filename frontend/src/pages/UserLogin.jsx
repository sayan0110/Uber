/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react'

import uberlogodark from '../assets/images/Uber_logo_dark.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'


const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState({});

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
      console.log(response);

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        setUser(data.user);
        navigate('/home');
      }
    } catch (error) {
      console.error(error);
    }
    setEmail("");
    setPassword("");
  }
  return (
    <>
      <div className='h-screen w-full flex flex-col justify-between p-7'>
        <div>
          <img className='w-20 mb-10' src={uberlogodark} />
          <form action="" onSubmit={(e) => { submitHandler(e) }}>
            <h3 className='text-lg font-medium mb-2'>What's your email or mobile number</h3>
            <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-zinc-400 w-full text-lg placeholder:text-base' required type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='user@gmail.com' name="" id="email" />
            <h3 className='text-lg font-medium mb-2'>Enter password</h3>
            <input className='bg-[#eeeeee] mb-10 rounded px-4 py-2 border-zinc-400 w-full text-lg placeholder:text-base' type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter Your Password' name="" id="password" />
            <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
            <p className='mb-1 ml-4 text-center'>New here ? <Link to="/user-signup" className='text-blue-600'>Create Account</Link></p>
          </form>
        </div>
        <div className='bg-[#10b461] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base text-center'>
          <Link to="/captain-login" className='bg-[#10b461] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
        </div>
      </div>
    </>
  )
}

export default UserLogin