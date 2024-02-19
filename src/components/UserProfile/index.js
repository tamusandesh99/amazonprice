import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { update_profile } from "../../actions/profile";
import profilepicture from "../../assets/pictures/Profile-Pictures/PP-Cropped/profile_picture.png";
import "./index.scss";

const UserProfile = ({ user_username, user_posts_global }) => {
  // const username = useSelector(state => state.profile.username);
  // const website_link = useSelector(state => state.profile.user_website);

  const [userData, setUserData] = useState({
    user_posts: [],
  });

  const { user_posts } = userData;

  useEffect(() => {
    setUserData({
      user_posts: user_posts_global,
    });
  }, [user_posts_global]);

  let navigate = useNavigate();

  const handleButtonClick = (
    username,
    title,
    description,
    likes,
    comments,
    links,
    images,
    date
  ) => {
    
    const defaultLikes = likes !== undefined && likes !== "" ? likes : 0;
    const defaultComments =
      comments !== undefined && comments !== "" ? comments : [];
    const encodedTitle = encodeURIComponent(title).replace(/%20/g, "_");

    const postData = {
      post: {
        title: title,
        description: description,
        images: images,
        links: links,
        likes: defaultLikes,
        comments: defaultComments,
        date: date,
      },
      username: user_username,
    };

    navigate(`/posts/${encodeURIComponent(encodedTitle)}`, {
      state: postData
    });
  };

  return (
    <>
      <div className="user-dashboard">
        <div className="total-user-posts">
          {user_posts.map((post, index) => (
            <div
              className="single-post"
              onClick={() =>
                handleButtonClick(
                  post.username,
                  post.title,
                  post.description,
                  post.images,
                  post.links,
                  post.likes,
                  post.comments,
                  post.date
                )
              }
              key={index}
            >
              <div className="post-info">
                {/* <p className="post-username">{post.username}</p> */}
                <p className="post-title">{post.title}</p>
                <p className="post-description">{post.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="user-profile">
          <div className="user-profile-upper-container">
            <div className="image-container">
              <img src={profilepicture} />
            </div>
          </div>
          <div className="user-profile-lower-container">
            <h3>{user_username}</h3>
            {/* <p>Description</p>
            <button className="user-edit-profile">Edit Profile</button> */}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user_username: state.profile.username,
  user_posts_global: state.profile.user_posts,
});

export default connect(mapStateToProps)(UserProfile);
