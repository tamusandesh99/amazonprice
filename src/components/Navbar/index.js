import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import "./index.scss";
import Burgermenu from "./BurgerMenu/Burgermenu";
import MakePostButton from "../MakePostButton";

const Navbar = ({ isAuthenticated, logout }) => {
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    console.log('kk')
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
        <NavLink className="nav-link profile" to="/profile">
          Profile
        </NavLink>
        <button onClick={handleLogout} className="nav-link logout" to="/">
          Logout
        </button>
      </div>
    </Fragment>
  );
  const guestLinks = (
    <div className="nav-link-right">
      <Fragment>
        <NavLink className="nav-link login" to="/login">
          Login
        </NavLink>
        <NavLink className="nav-link signup" to="/register">
          Signup
        </NavLink>
      </Fragment>
    </div>
  );

  return (
    <>
      <nav className="main-nav-container">
        <div
          className={`nav-logo-items ${
            isMobileMenuOpen ? "nav-logo-items-mobile" : ""
          }`}
        >
          <Link className="nav-link navbar-brand" to="/">
            Reviewers Hub
          </Link>
          <NavLink className="nav-link navbar-home" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link make-post" to="/submitpost">
            Make a post
          </NavLink>
          <NavLink className="nav-link sample-post-nav" to="/samplepost">
            Make Sample Post
          </NavLink>
          {isAuthenticated ? authLinks : guestLinks}
        </div>

        <div className="hamburgermenu-container" onClick={toggleMobileMenu}>
          <ImMenu className="hamburgermenu-icon" />
          {/* <Burgermenu className="burgermenu-component"></Burgermenu> */}
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
