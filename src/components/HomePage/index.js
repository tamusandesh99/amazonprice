import React, {Fragment} from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./index.scss";


const HomePage = (isAuthenticated) => {
  const loginLink = (
    <Fragment>
      <li className="nav-item">
        <Link  to="/login">
          Login to submit website
        </Link>
      </li>
    </Fragment>
  );
  const postLink = (
    <Fragment>
      <li className="nav-item">
        <Link to="/submitwebsite">
          Submit Website
        </Link>
      </li>
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
            <li>
            <Link to="/websites" >see all websites</Link>
            </li>
          </ul>
          <ul className="load-websites">
            <li>
            {isAuthenticated.isAuthenticated ? postLink : loginLink}
            </li>
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
