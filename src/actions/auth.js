import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "../../actions/types";
export const Register =
  (username, password, email) => async (dispatch) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    };

    const body = JSON.stringify({username, password, email})

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, body, config)

        if(res.data.error){
            dispatch({
                type: REGISTER_FAIL
            })
        }
        else{
            dispatch({
                type: REGISTER_SUCCESS
            })
        }
    }
    catch (err){
        dispatch({
            type: REGISTER_FAIL
        })
    }
  };
