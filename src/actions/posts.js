import axios from "axios";

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
