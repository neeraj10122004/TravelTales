import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import axios from 'axios';
import { Makepost } from '../components/Makepost';

export const Home = ({mail,name,photo}) => {
  const [makepost, setmakepost] = useState(false)
  const writepost = () =>{
    setmakepost(true)
  }
  return (
    <div>
      
      <Navbar loc="Home" name={name} photo={photo} />
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
      <div>hi hello</div>
      
      <div
        className=" p-4 fixed w-10 h-10 bottom-10 right-10 bg-slate-600 text-white hover:bg-slate-700 cursor-pointer shadow-lg rounded-full"
        onClick={writepost}
      >
      </div>
    </div>
  );
};
