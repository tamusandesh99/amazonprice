import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { update_profile } from "../../actions/profile";
import "./index.scss";

const UserProfile = ({ update_profile, user_website_global }) => {
  // const username = useSelector(state => state.profile.username);
  // const website_link = useSelector(state => state.profile.user_website);

  const [userData, setUserData] = useState({
    user_website: " ",
  });

  const { user_website } = userData;

  const onChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    update_profile(user_website);
  };

  useEffect(() => {
    setUserData({
      user_website: user_website_global
    })
  },[user_website_global])

  return (
    <>
      <div className="user_dashboard">
        userprofile
        {/* <div>Username: {username}</div> Display the username */}
        <p>this is websitelink</p>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <div>link: {user_website_global}</div> {/* Display the username */}
            <input
              className="website_update"
              type="text"
              name="user_website"
              onChange={(e) => onChange(e)}
              value={user_website}
            ></input>
          </div>
          <button>Update</button>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user_website_global: state.profile.website_link,
});

export default connect(mapStateToProps, { update_profile })(UserProfile);
