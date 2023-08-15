import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { update_profile } from "../../actions/profile";
import "./index.scss";

const UserProfile = ({ username, user_posts_global }) => {
  // const username = useSelector(state => state.profile.username);
  // const website_link = useSelector(state => state.profile.user_website);

  const [userData, setUserData] = useState({
    user_posts: [],
  });

  const { user_posts } = userData;



  useEffect(() => {
    setUserData({
      user_posts: user_posts_global
    })
  },[user_posts_global])

  return (
    <>
      <div className="user_dashboard">
        <div>Username: {username}</div>
          <div className="form-group">
             <ul>
          {user_posts.map((post, index) => (
            <li key={index}>
              Title: {post.title}
              <br />
              Website Link: {post.website_link}
              <br />
              Tech Stack: {post.tech_stack}
              <br />
            </li>
          ))}
        </ul>
          </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  username: state.profile.username,
  user_posts_global: state.profile.user_posts,
});

export default connect(mapStateToProps,)(UserProfile);
