import React from 'react'
import carImg from '../assets/images/car.png'
import bikeImg from '../assets/images/motorbike.png'
import autoImg from '../assets/images/auto.png'

const VehicalsPanel = (props) => {
  return (
    <div>
        <div className='flex items-center justify-between px-4'>
          <h1 className='text-2xl my-6 mx-4'>Choose a vehical</h1>
          <i className="ri-arrow-down-wide-line text-4xl" onClick={()=> {props.setPanelOpen(false); props.setVehicalPanel(false)}}></i>
        </div>
        <div className='flex items-center gap-[3%] p-2 my-4 border-3 rounded-2xl active:border-zinc-900 active' onClick={() => {props.setConfirmedVehicalPanel(true); props.setVehicalPanel(false)}}>
          <div className='w-[20%] p-3'>
            <img src={bikeImg} alt="" />
          </div>
          <div className='w-[77%] flex items-center justify-between'>
            <div className='w-5/6'>
              <div className='flex items-center gap-2'>
                <h5 className='text-lg'>UberGo</h5>
                <div>
                  <i className="ri-user-3-fill text-zinc-400"></i>
                  <span className='text-zinc-400'>4</span>
                </div>
              </div>
              <div className='flex items-center gap-1'>
                2 mins away <div className='h-1 w-1 rounded-full bg-zinc-600'></div> 15:24
              </div>
              <div>
                Affordable, compact rides
              </div>
            </div>
            <h5>₹175.76</h5>
          </div>
        </div>
        <div className='flex items-center gap-[3%] p-2 my-4 border-3 rounded-2xl border-zinc-200'>
          <div className='w-[20%] p-3'>
            <img src={carImg} alt="" />
          </div>
          <div className='w-[77%] flex items-center justify-between'>
            <div className='w-5/6'>
              <div className='flex items-center gap-2'>
                <h5 className='text-lg'>UberGo</h5>
                <div>
                  <i className="ri-user-3-fill text-zinc-400"></i>
                  <span className='text-zinc-400'>4</span>
                </div>
              </div>
              <div className='flex items-center gap-1'>
                2 mins away <div className='h-1 w-1 rounded-full bg-zinc-600'></div> 15:24
              </div>
              <div>
                Affordable, compact rides
              </div>
            </div>
            <h5>₹175.76</h5>
          </div>
        </div>
        <div className='flex items-center gap-[3%] p-2 my-4 border-3 rounded-2xl border-zinc-200'>
          <div className='w-[20%] p-3'>
            <img src={autoImg} alt="" />
          </div>
          <div className='w-[77%] flex items-center justify-between'>
            <div className='w-5/6'>
              <div className='flex items-center gap-2'>
                <h5 className='text-lg'>UberGo</h5>
                <div>
                  <i className="ri-user-3-fill text-zinc-400"></i>
                  <span className='text-zinc-400'>4</span>
                </div>
              </div>
              <div className='flex items-center gap-1'>
                2 mins away <div className='h-1 w-1 rounded-full bg-zinc-600'></div> 15:24
              </div>
              <div>
                Affordable, compact rides
              </div>
            </div>
            <h5>₹175.76</h5>
          </div>
        </div>
    </div>
  )
}

export default VehicalsPanel
