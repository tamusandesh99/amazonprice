import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaHeart as PostLikesIcon } from "react-icons/fa";
import { MdModeComment as PostCommentsIcon } from "react-icons/md";
import { connect } from "react-redux";

import "./index.scss";
import MakePostButton from "../MakePostButton";
import LeftSide from "../Leftside";
import { get_single_post } from "../../actions/posts";
import commentPicture from "../../assets/pictures/Profile-Pictures/unknown.jpg";

const SinglePost = ({ ProfileUsername, isAuthenticated }) => {
  const { title } = useParams();
  const webLink = decodeURIComponent(title);
  const location = useLocation();
  const [postData, setPostData] = useState({ post: {}, username: "" });
  const {
    username,
    post_title,
    post_description,
    post_images,
    post_links,
    post_likes,
    post_comments,
    post_date,
  } = location.state || postData;
  const [likedNumber, setLikedNumber] = useState(postData.post.likes || 0);
  const [userComments, setUserComments] = useState(post_comments || []);
  const [newComment, setNewComment] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        let response;

        if (location.state) {
          // If location.state is available, set postData directly
          response = location.state;
        } else {
          // Fetch the single post if location.state is not available
          response = await dispatch(get_single_post(webLink));
        }

        setPostData(response);
        setLikedNumber(response.post.likes);
        setUserComments(response.post.comments);
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };

    fetchSinglePost();
  }, [webLink, location.state]);

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
          {postData && postData.post ? (
            <div className="user-post-container">
              <div className="user-post-info">
                <img src={commentPicture} />
                <p>{postData.username}</p>
              </div>

              <div className="user-post-content">
                <h>{postData.post.title}</h>
                <p>{postData.post.description}</p>

                {postData.post.images &&
                  Array.isArray(postData.post.images) &&
                  postData.post.images.length > 0 && (
                    <div className="post-images-container">
                      {postData.post.images.map((imagePath, index) => (
                        <img
                        key={index}
                        src={imagePath}
                        alt={`Image ${index + 1}`}
                        className="post-image"
                      />
                      ))}
                    </div>
                  )}
                {postData.post.links &&
                  Array.isArray(postData.post.links) &&
                  postData.post.links.length > 0 && (
                    <div className="post-links-container">
                      {postData.post.links.map((link, index) => (
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
                    {post_comments ? post_comments.length : 0} comments
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
          ) : (
            <p>Loading...</p>
          )}
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

export default connect(mapStateToProps, { get_single_post })(SinglePost);
