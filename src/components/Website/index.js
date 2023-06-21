import React from "react";
import { useParams  } from "react-router-dom";
import "./index.scss";

const SingleWebsite = () => {
  const {id} = useParams()
  return (
    <>
      <div className="single-website-owner">
        <p>this is single website ID: {id}</p>
        <iframe title="user-website" src="https://sandeshgurung.com" />
      </div>
    </>
  );
};

export default SingleWebsite;
