import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaHeart as PostLikesIcon } from "react-icons/fa";
import { MdModeComment as PostCommentsIcon } from "react-icons/md";

import "./index.scss";
import MakePostButton from "../MakePostButton";
import LeftSide from "../Leftside";
import commentPicture from "../../assets/pictures/comment-pic.jpg";

const SinglePost = () => {
  const { id } = useParams();
  const webLink = decodeURIComponent(id);
  const location = useLocation();
  const { username, title, description, link, likes, comments, image } =
    location.state;

  const [likedNumber, setLikedNumber] = useState(likes);

  const [userComments, setUserComments] = useState(comments);
  const [newComment, setNewComment] = useState("");
  const addComment = () => {
    if (newComment.trim() !== "") {
      const newCommentObject = {
        text: newComment,
        username: "Your Username",
        // date: new Date().toISOString(),
      };

      // Update the userComments state with the new comment
      setUserComments([...userComments, newCommentObject]);
      setNewComment(""); // Clear the input field
    }
  };

  const postLiked = () => {
    setLikedNumber(likedNumber + 1);
  };

  return (
    <>
      <div className="single-post-page">
        <div className="left-post-page">
          <LeftSide />
        </div>
        <div className="center-post-page">
          <div className="user-post-container">
            <div className="user-post-info">
              <img src={commentPicture} />
              <p>{username}</p>
            </div>
            <div className="user-post-content">
              <h>{title}</h>
              <p>{description}</p>
            </div>
            <div className="post-likes-comments">
              <div className="likes-comments-item">
                <p>
                  <PostLikesIcon className="post-icons" onClick={postLiked} />{" "}
                  {likedNumber}
                </p>
              </div>

              <div className="likes-comments-item">
                <p>
                  <PostCommentsIcon className="post-icons" />
                  {comments.length} comments
                </p>
              </div>
            </div>
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
          </div>
          {/* <iframe title="user-website" src={webLink} /> */}
          {/* <iframe title="user-website" src={webLink} /> */}

          <div className="post-comments-container">
            <div className="all-comments">
              {userComments.map((comment, index) => (
                <div key={index} className="user-comment-container">
                  <div className="user-comment">
                    <div className="comment-user-info">
                      <img src={commentPicture} />
                      <p>{comment.username}</p>
                      <span>{comment.date}</span>
                    </div>
                    <p className="comment-user-text">{comment.text}</p>
                    <button>Reply(coming soon)</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right-post-page">
          <MakePostButton />
        </div>
      </div>
    </>
  );
};

export default SinglePost;
