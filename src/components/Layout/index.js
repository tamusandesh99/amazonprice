import React, {useState} from "react";
import "./index.scss";
import Website from "../Website";

const HomeLayout = () => {
  const [selectedWebsiteUrl, setSelectedWebsiteUrl] = useState(null);

  const handleWebsiteClick = (websiteUrl) => {
    setSelectedWebsiteUrl(websiteUrl);
  }

  return (
    <>
      <div className="main-page">
        <h>Rate my website</h>
        <button className="single-website">
          <div className="author-info">
            <p>John Smith</p>
            <p>HTML, CSS, JS</p>
          </div>
          <div className="website-preview">
            <p>IMG</p>
          </div>
        </button>
      </div>
    </>
  );
};

export default HomeLayout;
