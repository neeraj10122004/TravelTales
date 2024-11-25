import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = ({ loc }) => {
  const home = useRef(null);
  const userpage = useRef(null);
  const about = useRef(null);
  React.useEffect(() => {
    if (loc === "Home" && home.current) {
      home.current.className = 'rounded-full bg-gray-100 p-3';
    } else if (loc === "Userpage" && userpage.current) {
      userpage.current.className = 'rounded-full bg-gray-100 p-3';
    } else if (loc === "About" && about.current) {
      about.current.className = 'rounded-full bg-gray-100 p-3';
    }
  }, [loc]); // Re-run when `loc` changes

  return (
    <div className="flex items-center justify-between p-10">
      <div className="flex items-center justify-center gap-10">
        <div>
          <img
            className="rounded-full"
            src=""
            alt="icon"
            width="50"
            height="50"
          />
        </div>
        <div ref={home}><Link to="/">Home</Link></div>
        <div ref={about}><Link to="/about">About</Link></div>
      </div>
      <div className="flex items-center justify-center gap-5">
        <div ><Link to="">Logout</Link></div>
        <div ref={userpage}><Link to="/userpage">User</Link></div>
      </div>
    </div>
  );
};