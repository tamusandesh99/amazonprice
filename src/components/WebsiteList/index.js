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
  const handleButtonClick = (webLink, firstName, lastName) => {
    navigate(`/websites/${encodeURIComponent(webLink)}`, {
      state: {
        firstName: firstName,
        lastName: lastName
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
                {item.firstname} {item.lastname}
              </p>
              <p> {item.email}</p>
              <p> {item.description}</p>
            </div>
            <div className="website-preview">
              <button onClick={() => handleButtonClick(item.website_link, item.firstname, item.lastname)}>
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
