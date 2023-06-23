import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";


const HomeLayout = () => {

  return (
    <>
      <div className="main-page">
        <p>Rate my website</p>
        <button className="single-website">
          <div className="author-info">
            <p>John Smith</p>
            <p>HTML, CSS, JS</p>
          </div>
          <div className="website-preview">
            <p>IMG</p>
          </div>
        </button>
        <div className="load-all-websites">
          <ul className="load-websites">
            <li>
            <Link to="/websites" >see all websites</Link>
            </li>
          </ul>
          <ul className="load-websites">
            <li>
            <Link to="/submitwebsite" >Submit Website</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
