import React from "react";
import { useParams  } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import "./index.scss";

const SingleWebsite = () => {
  const {id} = useParams()
  const webLink = decodeURIComponent(id);
  const location = useLocation();
  const { firstName, lastName } = location.state;
  // const decodedFirstName = decodeURIComponent(firstName);
  // const decodedLastName = decodeURIComponent(lastName);

  return (
    <>
      <div className="single-website-owner">
        <p>firstname: {firstName}</p>
        <p>lastname: {lastName}</p>
        <br></br>
        <iframe title="user-website" src={webLink} />
        <h>Stars</h>
        <input type="textbox"></input>
      </div>
    </>
  );
};

export default SingleWebsite;
