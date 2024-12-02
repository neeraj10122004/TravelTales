import React, { useEffect } from 'react'
import { redirect } from 'react-router-dom';

export const Signin = () => {
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      const redirectUrl = `https://5173-neeraj10122-traveltales-40o2lf52eu2.ws-us117.gitpod.io/home?name=${encodeURIComponent(
        foundUser.name
    )}&email=${encodeURIComponent(foundUser.email)}`;

      redirect(redirectUrl);
    }
  }, []);
  
  return (
    <div className=' flex justify-center items-center p-6 bg-black h-svh '>
         <a className='flex justify-center items-center text-white hover:bg-white hover:text-black border-slate-50 border-solid bg-red-400 p-2 rounded-md '  href="https://3000-neeraj10122-traveltales-40o2lf52eu2.ws-us117.gitpod.io/auth/google">signin</a>
    </div>
  )
}
