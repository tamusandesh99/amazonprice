import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";

const CSRFToken = () => {
  const [csrftoken, setcsrftoken] = useState('');
  // const getCookie = (name) => {
  //   let cookieValue = null;
  //   if (document.cookie && document.cookie !== "") {
  //     let cookies = document.cookie.split(";");
  //     for (let i = 0; i < cookies.length; i++) {
  //       let cookie = cookies[i].trim();
  //       if (cookie.substring(0, name.length + 1) === name + "=") {
  //         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
  //         break;
  //       }
  //     }
  //   } else {
  //     console.log("no cookie");
  //   }
  //   return cookieValue;
  // };
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('here')
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/csrfCookie`, {
          withCredentials: true,
        });
        console.log(res)
      } catch (err) {
        console.error("Error fetching CSRF Token:", err);
      }
    };
    fetchData();
    const csrfToken = Cookies.get('csrftoken')
    setcsrftoken(csrfToken || '');
  }, []);

  return (
    <>
      <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    </>
  );
};

export default CSRFToken;
