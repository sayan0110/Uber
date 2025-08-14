import React from 'react';
import uberlogo from '../assets/images/uber-logo.png'
import banner from '../assets/images/banner.png'
const home = () => {
  return (
    <>
      <div className='h-screen w-full flex justify-between flex-col relative'>
        <img className='absolute z-[-1] h-screen w-screen object-cover object-center' src={banner} alt="" />
        <img className='w-20 mt-8 ml-9' src={uberlogo} />
        <div className='bg-white pt-8 pb-10 px-10 rounded-t-3xl'>
          <h2 className='text-2xl font-bold pb-8 text-center'>Get started with Uber</h2>
          <button className='w-full bg-black text-white py-2 px-4 rounded-full'>Continue</button>
        </div>
      </div>
    </>
  )
}

export default home