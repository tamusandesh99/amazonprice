import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import "./index.scss";
import { useNavigate, Link, Await } from "react-router-dom";
import axios from "axios";
import { create_user_post } from "../../actions/posts";


const UserPost = ({ isAuthenticated }) => {
  const [postData, setPostData] = useState({ title: "", website_link: "", tech_stack:"" });


  const { title, website_link, tech_stack } = postData;

  const onChange = (e) =>
    setPostData({ ...postData, [e.target.name]: e.target.value });

  const newPost = (e) => {
    e.preventDefault();
    create_user_post(title,website_link,tech_stack)
  };
  return (
    <>
      <form className="login-form" onSubmit={newPost}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
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
          <label htmlFor="password">Password:</label>
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
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="tech_stack"
            name="tech_stack"
            value={tech_stack}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
      <p>
        Don't have an account? <Link to="/register">Signup</Link>
      </p>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { create_user_post })(UserPost);
