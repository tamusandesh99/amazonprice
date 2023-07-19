import React, {useState} from 'react'
import Cookies from 'js-cookie';
import { connect } from "react-redux";
import axios from 'axios';
import { login } from '../../actions/auth';
import './index.scss'

const UserLogin = (login, isAuthenticated) => {

    const [loginData, setLoginData] = useState({
      username: "",
      password: ""
    });
    
    const { username, password } = loginData;
    
    const onChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  
    const handleLogin = async (e) => {
      e.preventDefault();
      login(username, password)
      
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

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect (mapStateToProps,{login} (UserLogin))