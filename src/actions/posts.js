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
} from "./types";
import samplePosts from "../assets/samplePosts";

export const get_all_posts = () => async (dispatch) => {
  try {
    // const res = await axios.get(
    //   `${process.env.REACT_APP_API_URL}/profile/get_posts`
    // );
    // const { user_profiles } = res.data;
    // const postsWithUsernames = user_profiles.reduce((acc, profile) => {
    //   const { username, posts } = profile;
    //   const postsWithUsername = posts.map((post) => ({ ...post, username }));
    //   return [...acc, ...postsWithUsername];
    // }, []);

    // if(res.data.error){
    //   dispatch({
    //     type: POSTS_LOAD_FAIL
    //   })
    // }
    // else{
    //   dispatch({
    //     type: POSTS_LOAD_SUCCESS,
    //     payload: postsWithUsernames,

    //   })
    // }

    dispatch({
      type: POSTS_LOAD_SUCCESS,
      payload: samplePosts,
    });
    
  } catch (err) {
    console.error("Error loading posts:", err);
    throw err;
  }
};

export const get_top_posts = async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/profile/top_posts`
    );
    const { random_posts } = res.data;

    const postsWithUsernames = random_posts.map((post) => ({
      ...post,
      username: post.username,
      title: post.title,
      website_link: post.website_link,
      tech_stack: post.tech_stack,
    }));

    // if(res.data.error) {
    //   dispatch({
    //     type: USER_POST_LOAD_FAIL
    //   })
    // }
    // else{
    //   dispatch({
    //     type: USER_POST_LOAD_SUCCESS,
    //     payload: postsWithUsernames,
    //   });
    // }
    return postsWithUsernames;
  } catch (err) {
    console.error("Error loading posts:", err);
    throw err;
  }
};

export const create_user_post =
  (title, website_link, tech_stack) => async (dispatch) => {
    console.log(title, website_link, tech_stack);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const body = JSON.stringify({ title, website_link, tech_stack });

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
      console.error('Error making sample post:', error);
    }
  };