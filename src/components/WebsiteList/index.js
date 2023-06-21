import React from "react";
import "./index.scss";
import SingleWebsite from "../Website";
import { Link, useNavigate } from "react-router-dom";

const WebsiteList = () => {
  let navigate = useNavigate();

  const handleButtonClick = (id) => {
    navigate("/websites/1");
  };
  return (
    <>
      <div className="all-websites">
        <div className="single-website">
          <div className="author-info">
            <p>John Smith</p>
            <p>HTML, CSS, JS</p>
          </div>
          <div className="website-preview">
            <button onClick={handleButtonClick}>
                IMG
            </button>
  
          </div>
        </div>
        <div className="single-website">
          <div className="author-info">
            <p>John Smith</p>
            <p>HTML, CSS, JS</p>
          </div>
          <div className="website-preview">
          <Link>IMG</Link>
          </div>
        </div>
        <div className="single-website">
          <div className="author-info">
            <p>John Smith</p>
            <p>HTML, CSS, JS</p>
          </div>
          <div className="website-preview">
          <Link>IMG</Link>
          </div>
        </div>
        <div className="single-website">
          <div className="author-info">
            <p>John Smith</p>
            <p>HTML, CSS, JS</p>
          </div>
          <div className="website-preview">
          <Link>IMG</Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default WebsiteList;
