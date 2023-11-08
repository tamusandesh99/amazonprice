import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import "./index.scss";

const MakePostButton = ({isAuthenticated}) => {
  let navigate = useNavigate();
  const postButton = () => {
    if (isAuthenticated) {
      navigate("/submitpost");
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div className="make-post-button-container">
        <button onClick={postButton} className="">
          Make a post
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    all_Posts: state.posts.all_posts,
  });

  export default connect(mapStateToProps)(MakePostButton);
