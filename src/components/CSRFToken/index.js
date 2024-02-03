import axios from "axios";
import React, { useState, useEffect } from "react";

const CSRFToken = () => {
  const [csrftoken, setcsrftoken] = useState("");
  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      let cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    } else {
      console.log("no cookie");
    }
    return cookieValue;
  };
  useEffect(() => {
    let token;
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/csrfCookie`, {
          withCredentials: true,
        });
         token = res.data.Success;
      } catch (err) {
        console.error("Error fetching CSRF Token:", err);
      }
    };
    fetchData();
    setcsrftoken(token);
  }, []);

  return (
    <>
      <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    </>
  );
};

export default CSRFToken;
