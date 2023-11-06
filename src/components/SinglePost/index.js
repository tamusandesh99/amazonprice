import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import commentPicture from "../../assets/pictures/comment-pic.jpg";
import "./index.scss";

const SinglePost = () => {
  const { id } = useParams();
  const webLink = decodeURIComponent(id);
  const location = useLocation();
  const { username, title, description, link, likes, comments } =
    location.state;

  const [userComments, setUserComments] = useState([
    "Kind-hearted, he is kindhearted and very polite, but you should not use his good manners for your interests",
    "I love to have deep, interesting conversations, it allows me to see life from a new perspective.",
    "Dude, stop making same mistake over and over again, how many times you can fail on the same step?",
    "Kids don’t read these days and they don’t play on playgrounds anymore.",
    "Not again, come on guys, have some mercy .... Talking about WoW when my subscription ran out and I'm broke AF.",
    "When I’m hungry my brain works on half speed, it is relevant to my level of motivation as well.",
    "How can people live without music? I can’t even handle single day without it.",
    "I hate rude people, people who lack manners and people who constantly tell lies.",
    "Awesome topic, whenever I get confused I come here and my problems are solved in no time.",
    "Kind-hearted, he is kindhearted and very polite, but you should not use his good manners for your interests",
    "I love to have deep, interesting conversations, it allows me to see life from a new perspective.",
    "Dude, stop making same mistake over and over again, how many times you can fail on the same step?",
    "Kids don’t read these days and they don’t play on playgrounds anymore.",
    "Not again, come on guys, have some mercy .... Talking about WoW when my subscription ran out and I'm broke AF.",
    "When I’m hungry my brain works on half speed, it is relevant to my level of motivation as well.",
    "How can people live without music? I can’t even handle single day without it.",
    "I hate rude people, people who lack manners and people who constantly tell lies.",
    "Awesome topic, whenever I get confused I come here and my problems are solved in no time.",
  ]);
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
        </div>
        <div className="center-post-page">
          <div className="center-post-title">
            <p>{title}</p>
            <p>{description}</p>
          </div>
          {/* <iframe title="user-website" src={webLink} /> */}
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
            <div className="all-comments">
              {comments.map((comment, index) => (
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
        <div className="right-post-page"></div>
      </div>
    </>
  );
};

export default SinglePost;
