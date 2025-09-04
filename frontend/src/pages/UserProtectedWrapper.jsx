import React, { useEffect } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const UserProtectedWrapper = ({children}) => {
    {/* const { user } = useContext(UserDataContext); */}
      const token = localStorage.getItem('token');
      const navigate = useNavigate();

        console.log(token);
        
        useEffect(() => {
            if(!token) {
                navigate('/user-login')
            }
        })
  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper
