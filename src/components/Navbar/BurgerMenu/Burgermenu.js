import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import "./Burgermenu.scss";

const Burgermenu = ({ isAuthenticated, logout }) => {
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
      <div className="burgermenu-nav-link-right">
        <NavLink className="burgermenu-nav-link profile" to="/profile">
          Profile
        </NavLink>
        <button onClick={handleLogout} className="burgermenu-nav-link logout" to="/">
          Logout
        </button>
      </div>
    </Fragment>
  );
  const guestLinks = (
    <div className="burgermenu-nav-link-right">
      <Fragment>
        <NavLink className="burgermenu-nav-link login" to="/login">
          Login
        </NavLink>
        <NavLink className="burgermenu-nav-link signup" to="/register">
          Signup
        </NavLink>
      </Fragment>
    </div>
  );
  return (
    <div className="burgermenu-main-container">
      <div className="nav-logo-item">
        <p>asdadsa</p>
        <NavLink className="burgermenu-nav-links navbar-homes" to="/">
          Profile
        </NavLink>
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Burgermenu);
