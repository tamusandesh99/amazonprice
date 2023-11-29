import {
  USER_POST_FAIL,
  USER_POST_SUCCESS,
  USER_POST_LOAD_FAIL,
  USER_POST_LOAD_SUCCESS,
  POSTS_LOAD_FAIL,
  POSTS_LOAD_SUCCESS,
  ADD_SAMPLE_POST,
  LOAD_MORE_POSTS
} from "../actions/types";

const initialState = {
  username: "",
  user_posts: [],
  all_posts: [],
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
    case USER_POST_LOAD_FAIL:
      return {
        ...state,
      };
    case USER_POST_LOAD_SUCCESS:
      return {
        ...state,
        top_posts: payload,
      };
    case POSTS_LOAD_FAIL:
      return {
        ...state,
      };
    case POSTS_LOAD_SUCCESS:
      return {
        ...state,
        all_posts: payload,
      };
    case ADD_SAMPLE_POST:
      return{
        ...state,
        all_posts:[...state.all_posts, payload]
      }

    case LOAD_MORE_POSTS:
      return{
        ...state,
        all_posts:[...new Set([...state.all_posts, payload])]
      }
    default:
      return state;
  }
}
