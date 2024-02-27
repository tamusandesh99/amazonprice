import React from "react";
import "./index.scss";
import reddit1 from '../../assets/pictures/reddit1.png'
import reddit2 from '../../assets/pictures/reddit2.png'

const HelpComponent = () => {
  return (
    <div className="help-container">
      <div className="inner-container">
        <p>
          This website is currently on development and is not fully what I want
          it to be like. The main reason why I decided to create such website is
          because of how some developers are asking in forum such as reddit for
          their website and UI designs feedbacks. As well as some backend methods about
          asking if its optimal approach for their situation. 

          Here are some posts that inspired me to make this website.
        </p>

        <img src={reddit1}></img>
        <img src={reddit2}></img>



      </div>
    </div>
  );
};

export default HelpComponent;
