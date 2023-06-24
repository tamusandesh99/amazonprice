import React, { useState } from "react";
import "./index.scss";

const WebsiteSubmit = () => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
  if ( !userName || !passWord || !email || !website || !message) {
    alert('Please fill in all required fields.');
    return;
  }

    const formData = {
      username: userName,
      password: passWord,
      email: email,
      website_link: website,
      tech_stack: message
    };

    fetch('http://127.0.0.1:8000/creators/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log('Success:', data);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
      });

    // Reset form fields
    setEmail("");
    setPassWord("");
    setUserName("")
    setWebsite("");
    setMessage("");
  };

  return (
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
      
      <div className="form-group">
        <label htmlFor="message">Tech Stack:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <button type="submit">Submit</button>
      </div>
      
    </form>
  );
};

export default WebsiteSubmit;
