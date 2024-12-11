import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Makepost } from '../components/Makepost';
import { FaPlus } from "react-icons/fa";// Import the Plus Icon
import { Footer } from '../components/Footer';

export const About = ({ mail, name, photo }) => {
  const [makepost, setmakepost] = useState(false);

  // Function to trigger posting modal
  const writepost = () => {
    setmakepost(true);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar loc="About" name={name} photo={photo} />

      {/* About Section */}
      <div className="flex flex-col items-center justify-center text-center p-6 h-full">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
          Travel Tales
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
          Travel Tales is a community-driven platform where travelers from all over the world can share their experiences, insights, and reviews of places they've visited. Whether you're a seasoned traveler or just starting your journey, here you can find authentic reviews and provide your own story to inspire others.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          Explore the world through the eyes of fellow travelers, and contribute by posting your own travel stories and tips!
        </p>
      </div>
      <Footer/>

      {/* Makepost Modal */}
      {makepost && (
        <div className="fixed flex top-5 h-full w-full items-center justify-center bg-black bg-opacity-50 z-50">
          <Makepost makepost={makepost} setmakepost={setmakepost} mail={mail} />
        </div>
      )}

      {/* Floating Button with Plus Icon */}
      <div
        className="p-4 fixed w-14 h-14 bottom-10 right-10 bg-slate-600 text-white hover:bg-slate-700 cursor-pointer shadow-lg rounded-full flex justify-center items-center"
        onClick={writepost}
      >
        <FaPlus size={30} className="text-white" /> {/* White Plus Icon */}
      </div>
    </div>
  );
};
