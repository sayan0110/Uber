import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogOut = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    if(!token) {
        navigate('/user-login')
    }
    axios.get(`$import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        console.log(response);
        if (response.status === 200) {
            localStorage.removeItem('token');
            navigate('/user-login');
        }
    }).catch((error) => {
        console.error(error);
        // Optionally show error to user
    });
  return (
    <div>
      user logged Out
    </div>
  )
}

export default UserLogOut
