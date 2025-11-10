/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

import uberlogodark from '../assets/images/Uber_logo_dark.png'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainSignUp = () => {

  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [captainLoginData, setCaptainLoginData] = useState({})
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setvehicleType] = useState('');


  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    const capatinData = {
      fullName: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password,
      vehicals: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        carTypes: vehicleType
      }
    }
    setCaptainLoginData(capatinData);
    console.log(capatinData);

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, capatinData)

    console.log(response);

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)

      localStorage.setItem('captain-token', data.token)
      navigate('/captain-home')
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setvehicleType('');
  }
  return (
    <>
      <div className='h-screen w-full flex flex-col justify-between p-7'>
        <div>
          <img className='w-20 mb-10' src={uberlogodark} />
          <form action="" onSubmit={(e) => { submitHandler(e) }}>
            <h3 className='text-lg font-medium mb-2'>What's your email or mobile number</h3>
            <div className='flex gap-2'>
              <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-zinc-400 w-1/2 text-lg placeholder:text-base' required type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} placeholder='First Name' name="" id="firstName" />
              <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-zinc-400 w-1/2 text-lg placeholder:text-base' required type="text" value={lastName} onChange={(e) => { setLastName(e.target.value) }} placeholder='Last Name' name="" id="lastName" />
            </div>
            {/* Vehicle Data Group */}
            <h3 className='text-lg font-medium mb-2 mt-4'>Vehicle Information</h3>
            <div className='flex gap-2 mb-4'>
              <input className='bg-[#eeeeee] rounded px-4 py-2 border-zinc-400 w-1/3 text-lg placeholder:text-base' required type="text" value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} placeholder='Color' name="vehicleColor" id="vehicleColor" />
              <input className='bg-[#eeeeee] rounded px-4 py-2 border-zinc-400 w-1/3 text-lg placeholder:text-base' required type="text" value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} placeholder='Plate' name="vehiclePlate" id="vehiclePlate" />
              <input className='bg-[#eeeeee] rounded px-4 py-2 border-zinc-400 w-1/3 text-lg placeholder:text-base' required type="number" min="1" value={vehicleCapacity} onChange={(e) => setVehicleCapacity(e.target.value)} placeholder='Capacity' name="vehicleCapacity" id="vehicleCapacity" />
            </div>
            <div className='mb-7'>
              <label className='block mb-2 text-base font-medium' htmlFor="vehicleType">Vehicle Type</label>
              <select className='bg-[#eeeeee] rounded px-4 py-2 border-zinc-400 w-full text-lg' required value={vehicleType} onChange={(e) => setvehicleType(e.target.value)} name="vehicleType" id="vehicleType" >
                <option value="" selected>Select type</option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <h3 className='text-lg font-medium mb-2'>What's your email or mobile number</h3>
            <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-zinc-400 w-full text-lg placeholder:text-base' required type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='captain@gmail.com' name="" id="email" />
            <h3 className='text-lg font-medium mb-2'>Enter password</h3>
            <input className='bg-[#eeeeee] mb-10 rounded px-4 py-2 border-zinc-400 w-full text-lg placeholder:text-base' type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter Your Password' name="" id="password" />
            <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Create Captain</button>
            <p className='mb-1 ml-4 text-center'>Already Register? <Link to="/captain-login" className='text-blue-600'>Captain Login</Link></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default CaptainSignUp