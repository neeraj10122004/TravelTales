import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import axios from 'axios';
import { Makepost } from '../components/Makepost';
import { Homedisplay } from '../components/Homedisplay';
import { FaRegPlusSquare } from 'react-icons/fa'; // Import Plus Icon

export const Home = ({ mail, name, photo }) => {
  const [makepost, setMakepost] = useState(false);
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://3000-neeraj10122-traveltales-40o2lf52eu2.ws-us117.gitpod.io/allposts"
      );
      setPosts(response.data.posts || []); // Ensure fallback to empty array
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const writePost = () => {
    setMakepost(true);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  useEffect(() => {
    fetchPosts();
  }, [makepost]);

  return (
    <div>
      <Navbar loc="Home" name={name} photo={photo} />
      {makepost && (
        <div className="fixed flex top-0 left-0 h-full w-full items-center justify-center bg-black bg-opacity-50 z-50">
          <Makepost makepost={makepost} setmakepost={setMakepost} mail={mail} />
        </div>
      )}

      <div className="p-4">
        {/*<h1 className="text-xl font-semibold mb-4">Posts</h1>*/}
        {posts.length > 0 ? (
          posts.map((post, index) => <Homedisplay key={index} posts={post} />)
        ) : (
          <p className="text-gray-500">No posts available</p>
        )}
      </div>

      <div
        className="p-4 fixed w-14 h-14 bottom-10 right-10 bg-slate-600 text-white hover:bg-slate-700 cursor-pointer shadow-lg rounded-full flex justify-center items-center"
        onClick={writepost}
      >
        <FaRegPlusSquare size={30} className="text-white" /> {/* White Plus Icon */}
      </div>
    </div>
  );
};