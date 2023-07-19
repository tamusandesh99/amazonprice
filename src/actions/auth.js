import axios from "axios";
import Cookies from "js-cookie";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "./types";

export const login = (username, password) =>async (dispatch) =>{
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };
  const body = JSON.stringify({ username, password });
  try{
    await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, body, config)

  }
  catch(err){

  }
}

export const logout = () =>async (dispatch) =>{
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };
  try{
    await axios.post(`${process.env.REACT_APP_API_URL}/user/logout`, config)

  }
  catch(err){

  }
}



export const register = (username, password, email) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({ username, password, email });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/register`,
      body,
      config
    );

    if (res.data.error) {
      dispatch({
        type: REGISTER_FAIL,
      });
    } else {
      dispatch({
        type: REGISTER_SUCCESS,
      });
    }
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
