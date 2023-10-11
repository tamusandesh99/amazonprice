import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../actions/auth";
import { IoMdMail } from "react-icons/io";
import { ImUser } from "react-icons/im";
import { HiMiniLockClosed } from "react-icons/hi2";
import CSRFToken from "../CSRFToken";
import "./index.scss";

axios.defaults.xsrfHeaderName = "x-csrftoken";
axios.defaults.xsrfCookieName = "csrftoken";

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  const [accountCreated, setAccountCreated] = useState(false);
  const { username, password, email } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (accountCreated) {
      navigate("/");
    }
  }, [accountCreated, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    register(username, password, email);
    setFormData({
      username: "",
      password: "",
      email: "",
    });
    setAccountCreated(true);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (accountCreated) {
      navigate("/login"); // Navigate to login page after account creation
    }
  }, [accountCreated, navigate]);

  return (
    <>
      <div className="form-container">
        <form className="register-form" onSubmit={onSubmit}>
          <CSRFToken />
          <div className="form-title">
            <p>Register</p>
          </div>
          <div className="form-group">
            <IoMdMail className="form-icon"></IoMdMail>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="form-group">
            <ImUser className="form-icon" />
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={onChange}
              minLength="6"
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <HiMiniLockClosed className="form-icon" />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="6"
              placeholder="Password"
              required
            />
          </div>
          <div className="form-button">
            <button type="submit">Register</button>
          </div>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
