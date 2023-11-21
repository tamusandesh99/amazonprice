import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BiHeart as PostLikesIcon } from "react-icons/bi";
import { LiaCommentAltSolid as PostCommentsIcon } from "react-icons/lia";

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
  const [likedNumber, setLikedNumber] = useState(likes)

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

  const postLiked = () =>{
    console.log('pl')
      setLikedNumber(likedNumber + 1)
  }

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
                  <PostLikesIcon className="post-icons" onClick={postLiked}/> {likedNumber}
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
                <div key={index} className="user-comment">
                  <div className="user-profile-picture">
                    {" "}
                    <img src={commentPicture} />{" "}
                  </div>
                  <div className="user-comment-text">
                    <span className="comment-post-username">
                      {comment.username}
                    </span>
                    <p>{comment.text}</p>
                    <button>Reply</button>
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
