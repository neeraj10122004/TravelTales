import { useEffect } from 'react'
import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Loading } from './pages/Loading'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Userpage } from './pages/Userpage'

function App() {
  const [check, setcheck] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setcheck(!check)
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      {check && <div><Loading/></div>}
      {!check &&
      <div>
      <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/userpage" element={<Userpage/>} />
      </Routes>
      </Router>
      </div>
      }
      
    </>
  )
}

export default App

