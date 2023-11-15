import React from "react";
import './index.scss'
import MakePostButton from "../MakePostButton";

const Rightside = () => {
  return (
    <>
      <div className="right-side-page">
        <MakePostButton />

        <div className="right-homepage-about">
          <p>
            Welcome to Reviewers Hub! Express yourself through personalized
            posts on our user-friendly platform.
          </p>
          <p>
            Share your stories, impart knowledge, or explore ideas with ease.
            Engage with a vibrant community and discover diverse perspectives.
          </p>
        </div>
      </div>
    </>
  );
};

export default Rightside;
