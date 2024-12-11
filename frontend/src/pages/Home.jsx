import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Makepost } from '../components/Makepost';
import { FaRegPlusSquare } from 'react-icons/fa'; // Import Plus Icon

export const Home = ({ mail, name, photo }) => {
  const [makepost, setmakepost] = useState(false);

  // Function to toggle post modal
  const writepost = () => {
    setmakepost(true);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar loc="Home" name={name} photo={photo} />

      {/* Makepost Modal */}
      {makepost && (
        <div className='fixed top-5 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <Makepost
            makepost={makepost}
            setmakepost={setmakepost}
            mail={mail}
          />
        </div>
      )}

      {/* Page Content */}
      <div>hi hello</div>

      {/* Floating Button with Plus Icon */}
      <div
        className="p-4 fixed w-14 h-14 bottom-10 right-10 bg-slate-600 text-white hover:bg-slate-700 cursor-pointer shadow-lg rounded-full flex justify-center items-center"
        onClick={writepost}
      >
        <FaRegPlusSquare size={30} className="text-white" /> {/* White Plus Icon */}
      </div>
    </div>
  );
};
