import React from "react";
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { get_all_posts } from "../../actions/posts";
import "./index.scss";

const WebsiteList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Call the load_posts function and handle the data
    get_all_posts()
      .then((data) => {
        // Here, data will contain the posts retrieved from the API
        setPosts(data);
      })
      .catch((error) => {
        // Handle errors if needed
        console.error("Error loading posts:", error);
      });
  }, []);

  let navigate = useNavigate();
 
  const handleButtonClick = (webLink, username, title, tech_stack) => {
    navigate(`/posts/${encodeURIComponent(webLink)}`, {
      state: {
        username: username,
        title: title,
        tech_stack: tech_stack
      }
      });
  };

  return (
    <>
      <div className="all-websites">
        {posts.map((post, index) => (
          <div className="single-web" key={index}>
            <div className="creator-info">
              <p>
                {post.username}
              </p>
              <p> {post.title}</p>
            </div>
            <div className="website-preview">
              <button onClick={() => handleButtonClick(post.website_link, post.username, post.title, post.tech_stack)}>
                IMG
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default WebsiteList;
