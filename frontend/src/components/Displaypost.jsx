import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

export const Displaypost = ({email,post}) => {
    const [user, setuser] = useState()
    useEffect(() => {
        const fetchUserData = async () => {
          try {
              const response = await axios.get(
                "https://3000-neeraj10122-traveltales-40o2lf52eu2.ws-us117.gitpod.io/user",
                { params: { email } }
              );
              setuser(response.data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchUserData();
      }, []);
    
  return (
    <div className=' p-10 flex w-dvw '>
        <div className='p-4'>
        <img
              src={ user?.photourl || "/default-avatar.png"}
              alt={ user?.name || "User"}
              className="rounded-full"
              width="50"
              height="50"
            />
        </div>
        <div className='flex flex-col'>
            <div className=' text-2xl'>{user?.name}</div>
            <div className='text-xl p-4'>{post.description}</div>
            <div className=' flex gap-4'>
                <div>{post.likes+" "}<button className='bg-transparent' onClick={() => {alert("liked")}}>Likes</button></div>
                
                <div>{'#'+post.labels.join(' #')}</div>
            </div>
        </div>
    </div>
  )
}
