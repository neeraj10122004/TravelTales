import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Displaypost } from './Displaypost';

export const Posts = ({ mail }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://3000-neeraj10122-traveltales-40o2lf52eu2.ws-us117.gitpod.io/posts",
          { params: { email: mail } } // Send email as query param
        );
        setPosts(response.data.posts); // Use "posts" from the server response
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <Displaypost key={index} email={mail} post={post} />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};
