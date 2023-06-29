import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import axios from 'axios';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const WebsiteSubmit = () => {
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    client.post("/creator/register",
    {
      email: email,
      userame: userName,
      password: passWord,
      website_link: website
    })
  }



  if (currentUser){
    return (
      <>
      <div class="submit-form-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="website">Password:</label>
            <input
              type="text"
              id="username"
              value={passWord}
              onChange={(e) => setPassWord(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      </>
    )
  }

  return (
    <>
      <div class="submit-form-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="website">Username:</label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="website">Password:</label>
            <input
              type="text"
              id="username"
              value={passWord}
              onChange={(e) => setPassWord(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="website">Website Link:</label>
            <input
              type="text"
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="message">Tech Stack:</label>
            <input
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></input>
          </div> */}
          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
        <div className="already-user">
          <p>Already a user?</p>
          <button>Click here</button>
        </div>
      </div>
    </>
  );
};

export default WebsiteSubmit;
