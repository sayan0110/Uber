/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import Uber_logo_dark from '../assets/images/Uber_logo_dark.png'
import map from '../assets/images/map.png'
import downArrow from '../assets/images/down-arrow.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehicalsPanel from '../components/VehicalsPanel'
import ConformedVehicals from '../components/ConformedVehicals'
import WaitForDeiver from '../components/WaitForDeiver'
import LookingForDriver from '../components/LookingForDriver'
// import axios from 'axios'

const Main = () => {
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const downArrowRef = useRef(null)
  const [vehicalPanel, setVehicalPanel] = useState(false)
  const vehicalPanelRef = useRef(null)
  const [confirmedVehicalPanel, setConfirmedVehicalPanel] = useState(false)
  const confirmedVehicalRef = useRef(null)
  const [vehicalFound, setVehicalFound] = useState(false)
  const vehicalFoundRef = useRef(null)


  const submitHandler = (e) => {
    e.preventDefault();
  }

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        duration: 0.5,
      })
      gsap.to(downArrowRef.current, {
        opacity: 1,
        duration: 0.5,
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        duration: 0.5,
      })

      gsap.to(downArrowRef.current, {
        opacity: 0,
        duration: 0.5,
      })
    }
  }, [panelOpen])

  useGSAP(()=> {
    if (vehicalPanel) {
      gsap.to(vehicalPanelRef.current, {
        transform: "translateY(0)",
      })
    } else {
      gsap.to(vehicalPanelRef.current, {
        transform: "translateY(100%)",
      })
    }
  }, [vehicalPanel])

  useGSAP(()=> {
    if (confirmedVehicalPanel) {
      gsap.to(confirmedVehicalRef.current, {
        transform: "translateY(0)",
      })
    } else {
      gsap.to(confirmedVehicalRef.current, {
        transform: "translateY(100%)",
      })
    }
  }, [confirmedVehicalPanel])

    useGSAP(()=> {
    if (vehicalFound) {
      gsap.to(vehicalFoundRef.current, {
        transform: "translateY(0)",
      })
    } else {
      gsap.to(vehicalFoundRef.current, {
        transform: "translateY(100%)",
      })
    }
  }, [vehicalFound])

  return (
    <div className='h-screen relative'>
      <img className='w-20 absolute top-5 left-5' src={Uber_logo_dark} alt="" />
      <div className='h-screen w-screen'>
        <img className='w-auto h-screen object-cover' src={map} alt="" />
      </div>
      <div className='flex flex-col justify-end h-screen absolute bottom-0 rounded-t-2xl' >
        <div className='bg-white  h-[30%] p-5 relative'>
          <div className='flex items-center justify-between mb-5'>
            <h4 className='text-2xl text-center'>Find a trip</h4>
            <img className='h-6 opacity-0' ref={downArrowRef} onClick={() => setPanelOpen(false)} src={downArrow} alt="" />
          </div>
          <form onSubmit={(e => { submitHandler(e) })}>
            <div className='srcDestLine absolute h-21 w-1 top-23  left-10 bg-zinc-400 rounded-full'></div>
            <input className='bg-[#eee] w-full px-12 py-2 rounded-lg mb-10 ' type="text" placeholder='Add a pickup location' name="pickupLocation" id="pickupLocation" value={pickup} onChange={(e) => { setPickup(e.target.value) }} onClick={() => setPanelOpen(true)} />
            <input className='bg-[#eee] w-full px-12 py-2 rounded-lg mb-10 ' type="text" placeholder='Enter your destination' name="destination" id="destination" value={destination} onChange={(e) => { setDestination(e.target.value) }} onClick={() => setPanelOpen(true)} />
          </form>
        </div>
        <div className='bg-white h-[0%] w-full overflow-y-scroll' ref={panelRef}>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehicalPanel={setVehicalPanel} />
        </div>
      </div>
      <div className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-2' ref={vehicalPanelRef}>
        <VehicalsPanel setPanelOpen={setPanelOpen} setVehicalPanel={setVehicalPanel} setConfirmedVehicalPanel={setConfirmedVehicalPanel} />
      </div>
      <div className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-2' ref={confirmedVehicalRef}>
        <ConformedVehicals setVehicalPanel={setVehicalPanel} setConfirmedVehicalPanel={setConfirmedVehicalPanel} setVehicalFound={setVehicalFound} />
      </div>
      <div className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-2' ref={vehicalFoundRef}>
        <LookingForDriver />
      </div>
    </div>
  )
}

export default Main
