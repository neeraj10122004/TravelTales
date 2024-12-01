import React from 'react'
import { Navbar } from '../components/Navbar'
import { Userdata } from '../components/Userdata'
import { useState } from 'react'
import { Posts } from '../components/Posts'
import { Likedposts } from '../components/Likedposts'

export const Userpage = ({mail,name,photo}) => {
  const [tog, settog] = useState(false)

  const handleClick1 = () =>{
    settog(true)
  }
  const handleClick2 = () =>{
    settog(false)
  }

  return (
    <div>
      <Navbar loc="Userpage" name={name} photo={photo}/>
      <Userdata name={name} photo={photo} mail={mail} />
      <div className="flex items-center justify-center gap-10">
        
        <button
          className={`rounded-full ${
            tog == false ? "bg-gray-100 p-3" : ""
          } p`} onClick={handleClick2}
        >
          Posts
        </button>
        <button
          className={`rounded-full ${
            tog == true ? "bg-gray-100 p-3" : ""
          } lp`} onClick={handleClick1}
        >
          LikedPosts
        </button>
      </div>
      <div>
      { !tog && <Posts mail={mail} /> }
      { tog && <Likedposts mail={mail} />}
      </div>
      

    </div>
  )
}
