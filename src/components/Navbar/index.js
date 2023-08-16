import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import "./index.scss";

const Navbar = ({ isAuthenticated, logout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const authLinks = (
    <Fragment>
      <div className="nav-link-right">
        <NavLink className="nav-link" to="/profile">
          Profile
        </NavLink>
        <button onClick={handleLogout} className="nav-link" to="/">
          Logout
        </button>
      </div>
    </Fragment>
  );
  const guestLinks = (
    <div className="nav-link-right">
      <Fragment>
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
        <NavLink className="nav-link" to="/register">
          Signup
        </NavLink>
      </Fragment>
    </div>
  );
  return (
    <>
      <nav className="main-nav-container">
        <div className="nav-logo-items">
          <Link className="navbar-brand" to="/">
            Reviewers Hub
          </Link>
          <NavLink className="nav-link-center" to="/">
            Home
          </NavLink>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
