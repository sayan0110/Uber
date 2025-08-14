import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home.jsx'
import UserSignUp from './pages/UserSignUp.jsx'
import CaptainSignUp from './pages/CaptainSignUp.jsx'
import UserLogin from './pages/UserLogin.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'

const App = () => {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/user-signup" element={<UserSignUp />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
      </Routes>
    </div>
  )
}

export default App