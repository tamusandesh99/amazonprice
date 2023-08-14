import { USER_POST_FAIL, USER_POST_SUCCESS } from "../actions/types";

const initialState = {
  username: "",
  user_posts: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_POST_SUCCESS:
      return {
        ...state,
        username: payload.username,
        user_posts: [...state.user_posts, payload],
      };
    case USER_POST_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
