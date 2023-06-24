import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SingleWebsite from "../Website";
import "./index.scss";

const WebsiteList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/creators/");
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  let navigate = useNavigate();
  const handleButtonClick = (webLink, username, tech_stack) => {
    navigate(`/websites/${encodeURIComponent(webLink)}`, {
      state: {
        username: username,
        tech_stack: tech_stack
      }
      });
  };

  return (
    <>
      <div className="all-websites">
        {data.map((item) => (
          <div className="single-web" key={item.id}>
            <div className="creator-info">
              <p>
                {item.username}
              </p>
              <p> {item.tech_stack}</p>
            </div>
            <div className="website-preview">
              <button onClick={() => handleButtonClick(item.website_link, item.username, item.tech_stack)}>
                IMG
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default WebsiteList;
