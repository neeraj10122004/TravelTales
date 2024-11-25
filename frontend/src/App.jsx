import { useEffect } from 'react'
import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Loading } from './pages/Loading'
import { Signin } from './pages/Signin'
import { Userpage } from './pages/Userpage'

function App() {
  useEffect(() => {
    window.open('');
  }, [])
  
  
  return (
    <>
      <div>
      <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/userpage" element={<Userpage/>} />
      </Routes>
      </Router>
      </div>
      
    </>
  )
}

export default App

