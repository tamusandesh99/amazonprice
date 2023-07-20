import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
  username: ''
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case REGISTER_FAIL:
      return state;
    case LOGIN_FAIL:
      return state;
    case LOGOUT_FAIL:
      return state;

    default:
      return state;
  }
}
