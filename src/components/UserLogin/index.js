import React from 'react'
import { useState } from 'react';
import './index.scss'

const WebsiteLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = (e) => {
      e.preventDefault();
  
      // Perform login API call here
      // Replace the API endpoint and logic with your actual implementation
      fetch('http://127.0.0.1:8000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
        .then((response) => {
          console.log('Response: ', response )
          response.json()
        })
        .then((data) => {
          // Handle the response data
          console.log('Success:', data);
          // Redirect or perform any necessary actions upon successful login
        })
        .catch((error) => {
          // Handle any errors
          console.error('Error:', error);
        });
  
      // Reset form fields
      setUsername('');
      setPassword('');
    };
  
    return (
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    );
}

export default WebsiteLogin