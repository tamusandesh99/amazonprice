import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaHeart as PostLikesIcon } from "react-icons/fa";
import { MdModeComment as PostCommentsIcon } from "react-icons/md";
import { connect } from "react-redux";


import "./index.scss";
import MakePostButton from "../MakePostButton";
import LeftSide from "../Leftside";
import commentPicture from "../../assets/pictures/comment-pic.jpg";

const SinglePost = ({ ProfileUsername, isAuthenticated }) => {
  const { id } = useParams();
  const webLink = decodeURIComponent(id);
  const location = useLocation();
  const { username, title, description, links, likes, comments, images } =
    location.state;
  const [likedNumber, setLikedNumber] = useState(likes);
  const [userComments, setUserComments] = useState(comments || []);
  const [newComment, setNewComment] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);

  const addComment = (AtUsername) => {
    if (AtUsername != undefined) {
      if (replyComment.trim() !== "") {
        let newCommentText = `@${AtUsername} ${replyComment}`;
        const newCommentObject = {
          text: newCommentText,
          username: "GuestID_1",
          date: new Date().toISOString(),
        };
        setUserComments([...userComments, newCommentObject]);
        setReplyComment("");
        setReplyIndex(null);
      }
    } else {
      let newCommentText = newComment;
      const newCommentObject = {
        text: newCommentText,
        username: "GuestID_1",
        date: new Date().toISOString(),
      };
      setUserComments([...userComments, newCommentObject]);
      setNewComment("");
      setReplyIndex(null);
    }
  };

  const postLiked = () => {
    setLikedNumber(likedNumber + 1);
  };

  const startReply = (index) => {
    setReplyIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleEdit = () => {
    
  }
  const handleDelete = () => {

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
              {/* {images.length > 0 && (
                <div className="post-images-container">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="post-image"
                    />
                  ))}
                </div>
              )} */}
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
                  {comments ? comments.length : 0} comments
                </p>
              </div>
            </div>
            {isAuthenticated && username === ProfileUsername && (
            <div>
              <button onClick={() => handleEdit()}>Edit</button>
              <button onClick={() => handleDelete()}>Delete</button>
            </div>
          )}
            <div className="add-comment">
              <textarea
                className="post-comment-box"
                placeholder={`Say something nice to ${username}`}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim() !== "") {
                    e.preventDefault();
                    setNewComment((newComment) => newComment + "\n");
                  }
                }}
              ></textarea>
              <button onClick={() => addComment()}>Post Comment</button>
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
                    <button
                      onClick={() => {
                        startReply(index);
                      }}
                    >
                      Reply
                    </button>
                    {replyIndex === index && (
                      <div className="add-comment">
                        <textarea
                          className="post-comment-box"
                          placeholder={`Reply to ${userComments[replyIndex].username}`}
                          value={replyComment}
                          onChange={(e) => setReplyComment(e.target.value)}
                          onKeyDown={(e) => {
                            if (
                              e.key === "Enter" &&
                              e.target.value.trim() !== ""
                            ) {
                              e.preventDefault();
                              setNewComment((newComment) => newComment + "\n");
                            }
                          }}
                        ></textarea>
                        <button onClick={() => addComment(comment.username)}>
                          Post Reply
                        </button>
                      </div>
                    )}
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  ProfileUsername: state.profile.username,
});


export default connect(mapStateToProps)(SinglePost);
