import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./index.scss";

const SinglePost = () => {
  const { id } = useParams();
  const webLink = decodeURIComponent(id);
  const location = useLocation();
  const { username, title, tech_stack } = location.state;
  // const decodedFirstName = decodeURIComponent(firstName);
  // const decodedLastName = decodeURIComponent(lastName);
  return (
    <>
      <div className="single-post-page">
        <div className="left-page">
          <p>User: {username}</p>
          <p>Title: {title}</p>
          <p>Tech Stack: {tech_stack}</p>
        </div>
        <div className="center-page">
          <p>Title: {title}</p>
          <iframe title="user-website" src={webLink} />
        </div>

        <div className="right-page"></div>
      </div>
    </>
  );
};

export default SinglePost;
