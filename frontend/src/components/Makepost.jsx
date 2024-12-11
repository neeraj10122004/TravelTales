import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';



export const Makepost = ({mail, makepost, setmakepost }) => {
  const [description, setdescription] = useState("")
  const [lables, setlables] = useState(['trip', 'travel']);
  const [temp, settemp] = useState("")
  const [email, setemail] = useState(mail)

  const handleclick = ()=>{
    if(temp.length !==0 ){
      setlables([...lables,temp])
      settemp("")
    }
  }
  const sendpost = async () =>{
    try{
      const response = await axios.post(
        "https://3000-neeraj10122-traveltales-40o2lf52eu2.ws-us117.gitpod.io/post",
        { email: mail, description: description, labels: lables }
      );
    }
    catch(error){
      console.error("Error fetching user data:", error);
    }
    setmakepost(false);
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

