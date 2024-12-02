import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Posts = ({ mail }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://3000-neeraj10122-traveltales-40o2lf52eu2.ws-us117.gitpod.io/post",
          { params: { mail } }
        );
        setPosts(response.data); // Assuming response.data contains the posts array
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [mail]); // Include mail in the dependency array

  return (
    <div>
      <h1>Posts</h1>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index}>
            <h2>{post.labels}</h2>
            <h2>{post.likes}</h2>
            <p>{post.description}</p>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};
