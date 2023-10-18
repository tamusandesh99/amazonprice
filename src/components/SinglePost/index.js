import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./index.scss";

const SinglePost = () => {
  const { id } = useParams();
  const webLink = decodeURIComponent(id);
  const location = useLocation();
  const { username, title, tech_stack } = location.state;

  const [userComments, setUserComments] = useState(["okok", "this is ok"]);
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (newComment.trim() !== "") {
      setUserComments([...userComments, newComment]);
      setNewComment(""); // Clear the input field
    }
  };

  return (
    <>
      <div className="single-post-page">
        <div className="left-post-page">
          <p>Title: {title}</p>
          <p>By {username}</p>
          <p>Tech Stack: {tech_stack}</p>
        </div>
        <div className="center-post-page">
          <div className="center-post-title">
            <p>Title: {title}</p>
          </div>
          <iframe title="user-website" src={webLink} />
          {/* <iframe title="user-website" src={webLink} /> */}
         

          <div className="post-comments-container">
            <div className="add-comment">
              <textarea
                className="post-comment-box"
                placeholder={`Say something nice to ${username}`}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim() !== "") {
                    addComment();
                  }
                }}
              ></textarea>
              <button onClick={addComment}>Post Comment</button>
            </div>
            {userComments.map((comment, index) => (
              <div key={index} className="user-comment">
                {comment}
              </div>
            ))}
          </div>
        </div>
        <div className="right-post-page"></div>
      </div>
    </>
  );
};

export default SinglePost;
