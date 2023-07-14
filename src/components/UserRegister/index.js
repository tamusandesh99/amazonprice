import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { register } from '../../actions/auth';
import './index.scss'

const Register = ({ register }) => {
  const [formData, setFormData] = useState({
    usernamme: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate()

  const [accountCreated, setAccountCreated] = useState(false);
  const { username, password, email } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
  if (accountCreated) {
    navigate('/')
  }
  return (
    <>
      <div class="submit-form-container">
        <form className="contact-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="website">Username:</label>
            <input
              type="text"
              id="username"
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
              value={password}
              onChange={(e) => onChange(e)}
              minLength='6'
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default connect(null, {register})(Register);
