import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import UserSignUp from './pages/UserSignUp.jsx'
import CaptainSignUp from './pages/CaptainSignUp.jsx'
import UserLogin from './pages/UserLogin.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'

import UserContextProvider from './context/UserContext';
import Main from './pages/Main.jsx'
import UserProtectedWrapper from './pages/UserProtectedWrapper.jsx'
import UserLogOut from './pages/UserLogOut.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper.jsx'
import CaptainLogOut from './pages/CaptainLogOut.jsx'

const App = () => {
  return (
      <div >
        <Routes>


          {/* <============================= user home routes =============================> */}
          <Route path="/" element={<Home />} />

          {/* <============================= captain home routes =============================> */}

          {/* <============================= user routes =============================> */}
          <Route path='/home' element={<UserProtectedWrapper ><Main /></UserProtectedWrapper>} />
          <Route path="/user-signup" element={<UserSignUp />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path='/user-logout' element={<UserProtectedWrapper><UserLogOut/> </UserProtectedWrapper>} />


          {/* <============================= user routes =============================> */}
          <Route path="/captain-home" element={<CaptainProtectedWrapper><CaptainHome /></CaptainProtectedWrapper>} />
          <Route path="/captain-signup" element={<CaptainSignUp />} />
          <Route path="/captain-login" element={<CaptainLogin />} />
          <Route path='/captain-logout' element={<CaptainProtectedWrapper><CaptainLogOut/></CaptainProtectedWrapper>} />

        </Routes>
      </div>
  )
}

export default App