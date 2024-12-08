import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

export const Makepost = ({mail, makepost, setmakepost }) => {
  const [description, setdescription] = useState("")
  const [lables, setlables] = useState(['trip', 'travel']);
  const [temp, settemp] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setmakepost(false); // Set makepost to false after 2 seconds
    }, 20000);

    // Cleanup function to clear timeout if the component is unmounted before the timeout
    return () => clearTimeout(timer);
  }, [setmakepost]); // Depend on setmakepost to handle the state correctly
  const handleclick = ()=>{
    if(temp.length !==0 ){
      setlables([...lables,temp])
      settemp("")
    }
  }
  const sendpost = async () =>{
    
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold text-center mb-4">Create a Post</h2>
      <div className='flex flex-col justify-center items-center'>
          <textarea name=""  placeholder='write post' id="" value={description} onChange={(e)=>{
            setdescription(e.target.value)
          }}></textarea>
          <input type="text" placeholder="enter labels" name="" id="" value={temp} onChange={(e)=>{settemp(e.target.value)}} />
          <button type="button" onClick={handleclick}>add label</button>
          <button type="button" onClick={sendpost}>post</button>
      </div>
          
    </div>
  );
};

