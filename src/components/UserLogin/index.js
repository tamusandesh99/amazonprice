import React, {useState} from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import './index.scss'

const UserLogin = () => {

    const [loginData, setLoginData] = useState({
      username: "",
      password: ""
    });

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get('csrftoken')
      }
    }
    
    const { username, password } = loginData;
    const body = JSON.stringify({username, password})
    
    const onChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  
    const handleLogin = async (e) => {
      e.preventDefault();
      
      try{
        await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, body, config)
      }
      catch(err){

      }
      
    };
  
    return (
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    );
}

export default UserLogin