/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react'

import uberlogodark from '../assets/images/Uber_logo_dark.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    console.log(response);
    
    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      
      localStorage.setItem('token', data.token)
      navigate('/home')
    }


    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')

  }

  return (
    <div className='h-screen w-full flex flex-col justify-between p-7'>
      <div>
        <img className='w-20 mb-10' src={uberlogodark} />
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your name?</h3>
          <div className='flex gap-2'>
            <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-zinc-400 w-1/2 text-lg placeholder:text-base' required type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' />
            <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-zinc-400 w-1/2 text-lg placeholder:text-base' required type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />
          </div>
          <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
          <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-zinc-400 w-full text-lg placeholder:text-base' required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='user@gmail.com' />
          <h3 className='text-lg font-medium mb-2'>Enter password</h3>
          <input className='bg-[#eeeeee] mb-10 rounded px-4 py-2 border-zinc-400 w-full text-lg placeholder:text-base' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' />
          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg'>Create User</button>
          <p className='mb-1 ml-4 text-center'>Already Registered? <Link to="/user-login" className='text-blue-600'>User Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default UserSignUp