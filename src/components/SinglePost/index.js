import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaHeart as PostLikesIcon } from "react-icons/fa";
import { MdModeComment as PostCommentsIcon } from "react-icons/md";
import { connect } from "react-redux";
import Cookies from "js-cookie";


import "./index.scss";
import MakePostButton from "../MakePostButton";
import LeftSide from "../Leftside";
import { get_single_post } from "../../actions/posts";
import commentPicture from "../../assets/pictures/comment-pic.jpg";

const SinglePost = ({ ProfileUsername, isAuthenticated }) => {
  const { dynamic_title } = useParams();
  const webLink = decodeURIComponent(dynamic_title);
  const location = useLocation();
  const { username, title, description, images, links, likes, comments } =
    location.state;
  const [likedNumber, setLikedNumber] = useState(likes);
  const [userComments, setUserComments] = useState(comments || []);
  const [newComment, setNewComment] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);

  const [postData, setPostData] = useState(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchSinglePost = async () => {
      dispatch(get_single_post(webLink));
    };
    fetchSinglePost();
  }, [webLink]);
 

  const addComment = (AtUsername) => {
    if (newComment.trim() !== "") {
      if (AtUsername != undefined) {
        if (replyComment.trim() !== "") {
          let newCommentText = `@${AtUsername} ${replyComment}`;
          const newCommentObject = {
            text: newCommentText,
            username: ProfileUsername,
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
          username: ProfileUsername,
          date: new Date().toISOString(),
        };
        setUserComments([...userComments, newCommentObject]);
        setNewComment("");
        setReplyIndex(null);
      }
    } else {
    }
  };

  const postLiked = () => {
    setLikedNumber(likedNumber + 1);
  };

  const startReply = (index) => {
    setReplyIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleEdit = () => {};
  const handleDelete = () => {};

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
              {links && links.length > 0 && (
                <div className="post-links-container">
                  {links.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link}
                      <br></br>
                    </a>
                  ))}
                </div>
              )}
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

export default connect(mapStateToProps,{get_single_post})(SinglePost);
