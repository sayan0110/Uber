import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogOut = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    if(!token) {
        navigate('/captain-login')
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        console.log(response);
        if (response.status === 200) {
            localStorage.removeItem('token');
            navigate('/captain-login');
        }
    }).catch((error) => {
        console.error(error);
        // Optionally show error to user
    });
  return (
    <div>
      Captain Logged out
    </div>
  )
}

export default CaptainLogOut
