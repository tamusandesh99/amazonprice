import React, {Fragment} from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./index.scss";


const HomePage = (isAuthenticated) => {
  const loginLink = (
    <Fragment>
      <div className="nav-item">
        <Link  to="/login">
          Login to make a post
        </Link>
      </div>
    </Fragment>
  );
  const postLink = (
    <Fragment>
      <div className="nav-item">
        <Link to="/submitpost">
          Submit Post
        </Link>
      </div>
    </Fragment>
  );

  return (
    <>
      <div className="main-page">
        <p>Rate my website</p>
        <button className="single-website">
          <div className="author-info">
            <p>John Smith</p>
            <p>HTML, CSS, JS</p>
          </div>
          <div className="website-preview">
            <p>IMG</p>
          </div>
        </button>
        <div className="load-all-websites">
          <ul className="load-websites">
            <div>
            <Link to="/posts" >see all posts</Link>
            </div>
          </ul>
          <ul className="load-websites">
            <div>
            {isAuthenticated.isAuthenticated ? postLink : loginLink}
            </div>
          </ul>
          
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps) (HomePage);
