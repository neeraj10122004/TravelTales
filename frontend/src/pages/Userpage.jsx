import React from 'react'
import { Navbar } from '../components/Navbar'
import { Userdata } from '../components/Userdata'
import { useState } from 'react'
import { Posts } from '../components/Posts'
import { Likedposts } from '../components/Likedposts'
import { Makepost } from '../components/Makepost';

export const Userpage = ({mail,name,photo}) => {
  const [tog, settog] = useState(false)
  const [makepost, setmakepost] = useState(false)

  const handleClick1 = () =>{
    settog(true)
  }
  const handleClick2 = () =>{
    settog(false)
  }
  const writepost = () =>{
    setmakepost(true)
  }

  return (
    
    <div className='mb-10'>

      <div className='fixed w-svw z-40 bg-white'>
        <Navbar loc="Userpage" name={name} photo={photo}/>
        { 
      makepost && (
        <div className='fixed flex top-5 h-full w-full items-center justify-center bg-transparent z-50'>
      <Makepost
        makepost={makepost}
        setmakepost={setmakepost}
        mail={mail}
      />
        </div>
        )
      }
        <Userdata name={name} photo={photo} mail={mail} />
        <div className="flex items-center justify-center gap-10 pt-3">
        
          <button
            className={`rounded-full ${
              tog == false ? "bg-gray-100 p-2" : ""
            } p`} onClick={handleClick2}
          >
            Posts
          </button>
          <button
            className={`rounded-full ${
              tog == true ? "bg-gray-100 p-2" : ""
            } lp`} onClick={handleClick1}
          >
            LikedPosts
          </button>
        </div>
      </div>

      <div  className='flex justify-center items-center overflow-y-auto pt-96 '>
      { !tog && <Posts mail={mail} /> }
      { tog && <Likedposts mail={mail} />}
      </div>
      
      <div
        className=" p-4 fixed w-10 h-10 bottom-10 right-10 bg-slate-600 text-white hover:bg-slate-700 cursor-pointer shadow-lg rounded-full"
        onClick={writepost}
      ></div>
    </div>
  )
}
