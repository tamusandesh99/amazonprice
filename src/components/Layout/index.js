import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import Website from "../Website";
import WebsiteList from "../WebsiteList";
import WebsiteSubmit from "../WebsiteSubmit";
import WebsiteLogin from "../WebsiteLogin";
import HomePage from "../HomePage";
import { Navbar, Nav, Button } from "react-bootstrap";

const HomeLayout = () => {
  return (
    <>
      
      <div className="main-layout-page">
        <HomePage />
      </div>
    </>
  );
};

export default HomeLayout;
