import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

export const Makepost = ({mail, makepost, setmakepost }) => {
  const [description, setdescription] = useState("")
  const m = useRef([]);

  const handleClick = () => {
    myList.current.push('new item');
    console.log(myList.current); // Output: ['new item']
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setmakepost(false); // Set makepost to false after 2 seconds
    }, 20000);

    // Cleanup function to clear timeout if the component is unmounted before the timeout
    return () => clearTimeout(timer);
  }, [setmakepost]); // Depend on setmakepost to handle the state correctly

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold text-center mb-4">Create a Post</h2>
      <div>
          <textarea name="" id="" value={description} onChange={(e)=>{
            setdescription(e.target.value)
          }}></textarea>
      </div>
          
    </div>
  );
};

