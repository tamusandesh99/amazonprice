import {
  LOAD_USER_PROFILE_FAIL,
  LOAD_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_SUCCESS,
} from "../actions/types";

const initialState = {
  username: "",
  user_posts: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER_PROFILE_SUCCESS:
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        username: payload.username,
        user_posts: payload.profile.posts,
      };
    case LOAD_USER_PROFILE_FAIL:
      return {
        ...state,
        username: "",
        user_website: "",
      };
    case UPDATE_USER_PROFILE_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
