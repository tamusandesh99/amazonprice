import axios from "axios";
import Cookies from "js-cookie";
import {
  USER_POST_FAIL,
  USER_POST_SUCCESS,
  USER_POST_LOAD_FAIL,
  USER_POST_LOAD_SUCCESS,
  POSTS_LOAD_FAIL,
  POSTS_LOAD_SUCCESS,
  ADD_SAMPLE_POST,
  LOAD_MORE_POSTS,
  GET_SINGLE_POST_SUCCESS,
} from "./types";
import samplePosts from "../assets/SamplePost/samplePosts";

export const get_all_posts =
  (initialPostsCount = 5) =>
  async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/profile/get_posts`
      );
      const { user_profiles } = res.data;
      const postsWithUsernames = user_profiles.reduce((acc, profile) => {
        const { username, posts } = profile;
        const postsWithUsername = posts.map((post) => ({ ...post, username }));
        return [...acc, ...postsWithUsername];
      }, []);

      if (res.data.error) {
        dispatch({
          type: POSTS_LOAD_FAIL,
        });
      } else {
        dispatch({
          type: POSTS_LOAD_SUCCESS,
          payload: postsWithUsernames,
          // payload: samplePosts,
        });
      }

      const initialPosts = samplePosts.slice(0, initialPostsCount);
    } catch (err) {
      console.error("Error loading posts:", err);
      throw err;
    }
  };

export const get_single_post = (title) => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/profile/posts/${encodeURIComponent(
        title
      )}/`,
      config
    );
    if (res.data.error) {
      // Handle error, e.g., dispatch an action with an error type
    } else {

      return res.data;
      // dispatch({
      //   type: GET_SINGLE_POST_SUCCESS,
      //   payload: res.data,
      // });
    }
  } catch (err) {
    console.error("Error loading single post:", err);
    throw err;
  }
};

export const create_user_post =
  (title, description, images, links, likes, comments) => async (dispatch) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const body = JSON.stringify({
      title,
      description,
      images,
      links,
      likes,
      comments,
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/post/create`,
        body,
        config
      );
      if (res.data.error) {
        dispatch({
          type: USER_POST_FAIL,
        });
      } else {
        dispatch({
          type: USER_POST_SUCCESS,
          payload: res.data.post,
        });
      }
    } catch (err) {
      console.error("Error loading posts:", err);
      throw err;
    }
  };

//this is for sample post no db no backend
export const make_sample_post = (postData) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_SAMPLE_POST,
      payload: postData,
    });
  } catch (error) {
    console.error("Error making sample post:", error);
  }
};

//this is different apporach for loading data

export const loadMorePosts =
  (page, postsPerPage = 5) =>
  async (dispatch) => {
    try {
      // Calculate the starting index based on the page number
      const startIndex = (page - 1) * postsPerPage;

      // Get the specified number of posts from samplePosts
      const additionalPosts = samplePosts.slice(
        startIndex,
        startIndex + postsPerPage
      );

      dispatch({
        type: LOAD_MORE_POSTS,
        payload: additionalPosts,
      });
    } catch (err) {
      console.error("Error loading more posts:", err);
      throw err;
    }
  };
