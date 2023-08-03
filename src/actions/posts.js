import axios from "axios";
import Cookies from "js-cookie";


export const load_posts  = async () => {

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/profile/get_posts`
    );
    const { user_profiles } = res.data;
    return user_profiles
  }
  catch(err){
    console.error("Error loading posts:", err);
    throw err
  }
};

export const create_user_post  = (title, website_link, tech_stack) => async () => {
  console.log('oo')
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({ title, website_link, tech_stack});

  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/profile/post/create`,
      body,
      config
    );
  }
  catch(err){
    console.error("Error loading posts:", err);
    throw err
  }
};
