/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainProtectedWrapper = ({children}) => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // console.log(token);

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }
    })
    
  return (
    <>
      {children}
    </>
  )
}

export default CaptainProtectedWrapper
