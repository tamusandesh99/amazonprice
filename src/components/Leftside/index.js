import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { AiFillHome, AiTwotoneTags } from "react-icons/ai";
import { GiOpenFolder } from "react-icons/gi";
import { BiSolidHelpCircle } from "react-icons/bi";


const Leftside = () => {
  let navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="left-side-page">
        <div className="icon-text-container" onClick={() => navigateTo("/")}>
          <div className="icon-text-container-inner">
            <AiFillHome className="left-content icon" />
            <button className="left-content icon-text">Home</button>
          </div>
        </div>
        <div
          className="icon-text-container"
          onClick={() => navigateTo("/posts")}
        >
          <div className="icon-text-container-inner">
            <GiOpenFolder className="left-content icon" />
            <button className="left-content icon-text">Posts</button>
          </div>
        </div>
        <div className="icon-text-container" onClick={() => navigateTo("/")}>
          <div className="icon-text-container-inner">
            <AiTwotoneTags className="left-content icon" />
            <button className="left-content icon-text">Tags</button>
          </div>
        </div>
        <div className="icon-text-container" onClick={() => navigateTo("/")}>
          <div className="icon-text-container-inner">
            <BiSolidHelpCircle className="left-content icon" />
            <button className="left-content icon-text">Help</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leftside;
