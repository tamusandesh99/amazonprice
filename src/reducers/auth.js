import {
  SET_CSRF_TOKEN,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AUTHENTICATED_SUCCESS:
    case AUTHENTICATED_FAIL:
      return{
        ...state,
        isAuthenticated: payload
      }
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
