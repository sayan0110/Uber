import React from 'react'

const UserLogin = () => {
  return (
    <>
      <div className='h-screen w-full flex justify-between flex-col relative'>
        <form action="">
          <h3>What's your email or mobile number</h3>
          <input required type="text" placeholder='email@gmail.com' name="" id="" />
          <h3>Enter password</h3>
          <input type="password" name="" id="" />
          <button>Login</button>
        </form>
      </div>
    </>
  )
}

export default UserLogin