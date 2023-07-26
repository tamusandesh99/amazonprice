import React from "react";
import { useParams  } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import "./index.scss";

const SingleWebsite = () => {
  const {id} = useParams()
  const webLink = decodeURIComponent(id);
  const location = useLocation();
  const { username, tech_stack } = location.state;
  // const decodedFirstName = decodeURIComponent(firstName);
  // const decodedLastName = decodeURIComponent(lastName);
  console.log(webLink)
  return (
    <>
      <div className="single-website-owner">
        <p>User: {username}</p>
        <p>Tech Stack: {tech_stack}</p>
        <br></br>

        <iframe title="user-website" src={webLink} />
        {/* <iframe title="user-website" src="https://sandeshgurung.com" /> */}
        <h1>Stars</h1>
        <input type="textbox"></input>
      </div>
    </>
  );
};

export default SingleWebsite;
