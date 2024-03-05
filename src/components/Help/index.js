import React from "react";
import "./index.scss";
import reddit1 from "../../assets/pictures/reddit1.png";
import reddit2 from "../../assets/pictures/reddit2.png";

const HelpComponent = () => {
  return (
    <div className="help-container">
      <div className="inner-container">
        <p>
          This website is currently undergoing development and is not yet fully
          aligned with my vision. The idea stemmed from observing developers
          seeking feedback on their website designs and backend approaches in
          forums like Reddit. I noticed a gap in platforms dedicated to
          providing constructive feedback and support in these areas. Inspired
          by this observation, I embarked on creating this website to offer a
          space where developers can seek advice, share insights, and refine
          their projects.
        </p>

        <img src={reddit1}></img>
        <img src={reddit2}></img>

        <p>
          While there are still many tasks to be completed, I welcome
          contributions from anyone interested. Feel free to fork the
          repository, create a new branch for your feature or bug fix, and
          submit a pull request to contribute to the project.{" "}
          <a href="https://github.com/tamusandesh99/reviewershub.git">
            Link to repo
          </a>
        </p>
      </div>
    </div>
  );
};

export default HelpComponent;
