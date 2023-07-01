import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./index.scss";


const HomeLayout = () => {
  let navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="main-layout-page">
        <nav className="main-navbar">
         <p className="title-name">ReviewersHub</p>
         <button onClick={handleButtonClick} className="login-button">Login</button>
        </nav>
        <Outlet />
      </div>
    </>
  );
};

export default HomeLayout;
