import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import "./index.scss";

const Navbar = ({ isAuthenticated, logout }) => {
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
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

  const navigatepost = async () => {
    if (isAuthenticated) {
      navigate("/submitpost");
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      navigate("/login");
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  const authLinks = (
    <Fragment>
      <div className="nav-link-right">
        <NavLink
          className="nav-link profile"
          onClick={toggleMobileMenu}
          to="/profile"
        >
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
        <NavLink
          className="nav-link login"
          onClick={toggleMobileMenu}
          to="/login"
        >
          Login
        </NavLink>
        <NavLink
          className="nav-link signup"
          onClick={toggleMobileMenu}
          to="/register"
        >
          Signup
        </NavLink>
      </Fragment>
    </div>
  );

  return (
    <>
      <nav className="main-nav-container">
        <div className="nav-logo-items">
          {/* <div className="nav-logo-items-mobile"> */}
          <Link className="nav-link navbar-brand" to="/">
            Reviewers Hub
          </Link>
          <NavLink className="nav-link navbar-home" to="/">
            Home
          </NavLink>
          {isAuthenticated ? authLinks : guestLinks}
          <div className="hamburgermenu-container">
            <ImMenu className="hamburgermenu-icon" onClick={toggleMobileMenu} />
          </div>
        </div>

        <div
          className={`nav-logo-items-toggle${
            isMobileMenuOpen ? "-mobile" : ""
          }`}
        >
          <NavLink
            className="nav-link navbar-home"
            onClick={toggleMobileMenu}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="nav-link make-post"
            onClick={toggleMobileMenu}
            to={isAuthenticated ? "/submitpost" : "/login"}
          >
            Make a post
          </NavLink>
          <NavLink
            className="nav-link sample-post-nav"
            onClick={toggleMobileMenu}
            to="/samplepost"
          >
            Make Sample Post
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
