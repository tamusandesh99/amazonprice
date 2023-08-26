import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./index.scss";
import { useNavigate, Link, Await } from "react-router-dom";
import axios from "axios";
import {create_user_post} from '../../actions/posts'
import Cookies from "js-cookie";

const UserPost = ({userPosts}) => {
  const [postData, setPostData] = useState({
    title: "",
    website_link: "",
    tech_stack: "",
  });

  const { title, website_link, tech_stack } = postData;
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const onChange = (e) =>
    setPostData({ ...postData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('e')
    //  create_user_post(title, website_link, tech_stack); need fix here
    const config = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const body = JSON.stringify({ title, website_link, tech_stack });

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/post/create`,
        body,
        config
      );
      window.alert("Post successfully created!");
      setSuccessMessage("Post successfully created!");
      navigate("/"); // Redirect to /home after successful post
    } catch (error) {
      console.error(error);
      setSuccessMessage("An error occurred. Please try again.");
    }
  }
  return (
    <>
      <form className="login-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Website Link</label>
          <input
            type="text"
            id="website_link"
            name="website_link"
            value={website_link}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Tech Stacks Used:</label>
          <input
            type="text"
            id="tech_stack"
            name="tech_stack"
            value={tech_stack}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button type="submit">Post</button>
        </div>
      </form>
      <p>
        Don't have an account? <Link to="/register">Signup</Link>
      </p>
    </>
  );
};

const mapStateToProps = (state) => ({
  userPosts: state.profile.posts,
});

export default connect(mapStateToProps, { create_user_post })(UserPost);
