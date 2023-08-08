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
      console.log(posts)
  }, []);

  let navigate = useNavigate();
 
  const handleButtonClick = (webLink, username, tech_stack) => {
    console.log(webLink, username, tech_stack)
    navigate(`/websites/${encodeURIComponent(webLink)}`, {
      state: {
        username: username,
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
              <p> {post.website_link}</p>
            </div>
            <div className="website-preview">
              <button onClick={() => handleButtonClick(post.website_link, post.username, "react")}>
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
