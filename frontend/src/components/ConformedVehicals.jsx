import React from 'react'
import bikeImg from '../assets/images/motorbike.png'

const ConformedVehicals = (props) => {
  return (
    <div>
        <div className='flex items-center justify-between px-4'>
          <h1 className='text-2xl my-6 mx-4'>Cofirm Your Ride</h1>
          <button className='bg-black text-white rounded-lg px-6 py-2' onClick={()=>{props.setVehicalFound(true); props.setConfirmedVehicalPanel(false)}}>Confirm</button>
        </div>
        <div className='flex items-center justify-center py-12 border-b-2 border-zinc-300'>
          <img className='confirmed-vehical-img h-30' src={bikeImg} alt="" />
        </div>

          <div className='flex gap-5 items-center border-b-2 px-2 py-6 border-zinc-300'>
            <i className="ri-map-pin-line text-3xl"></i>
            <div>
              <p className='text-2xl font-bold text-zinc-700'>512/11-AS</p>
              <span className='text-xl text-zinc-500'>HSR Layout, Bangaluru, Karnataka</span>
            </div>
          </div>

          <div className='flex gap-5 items-center border-b-2 px-2 py-6 border-zinc-300'>
            <i className="ri-map-pin-range-line text-3xl"></i>
            <div>
              <p className='text-2xl font-bold text-zinc-700'>Third Wave Cafe</p>
              <span className='text-xl text-zinc-500'>17th Cross Road, PWD quaters, 1st Sector, HSR Layout, Bangaluru, Karnataka</span>
            </div>
          </div>

          <div className='flex gap-5 items-center border-b-2 px-2 py-6 border-zinc-300'>
            <i className="ri-wallet-3-line text-3xl"></i>
            <div>
              <p className='text-2xl font-bold text-zinc-700'>₹193</p>
              <span className='text-xl text-zinc-500'>Cash Payment</span>
            </div>
          </div>

    </div>
  )
}

export default ConformedVehicals
