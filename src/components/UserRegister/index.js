import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../actions/auth";
import CSRFToken from "../CSRFToken";
import "./index.scss";

const Register = ({ register }) => {
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

  return (
    <>
      <div className="submit-form-container">
        <form className="contact-form" onSubmit={onSubmit}>
          <CSRFToken />
          <div className="form-group">
            <label htmlFor="website">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="passowrd">Password:</label>
            <input
              type="text"
              id="password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
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

export default connect(null, { register })(Register);
