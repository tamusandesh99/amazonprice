import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { update_profile } from "../../actions/profile";
import "./index.scss";

const UserProfile = ({ update_profile, user_posts_global }) => {
  // const username = useSelector(state => state.profile.username);
  // const website_link = useSelector(state => state.profile.user_website);

  const [userData, setUserData] = useState({
    user_posts: [],
  });

  const { user_posts } = userData;

  const onChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // update_profile(user_website);
  };

  useEffect(() => {
    console.log(user_posts_global)
    setUserData({
      user_posts: user_posts_global
    })
  },[user_posts_global])

  return (
    <>
      <div className="user_dashboard">
        userprofile
        {/* <div>Username: {username}</div> Display the username */}
        <p>this is posts</p>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            {/* <div>link: {user_posts_global}</div>  */}
            {/* <input
              className="website_update"
              type="text"
              name="user_website"
              onChange={(e) => onChange(e)}
              value={user_posts_global}
            ></input> */}
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
          <button>Update</button>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user_posts_global: state.profile.user_posts,
});

export default connect(mapStateToProps, { update_profile })(UserProfile);
