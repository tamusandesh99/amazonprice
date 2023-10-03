import React, { Fragment, useEffect } from "react";
import "./index.scss";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { connect } from "react-redux";
import { checkAuthenticated } from "../../actions/auth";
import { load_user } from "../../actions/profile";
import { get_all_posts } from "../../actions/posts";

const HomeLayout = ({ children, checkAuthenticated, load_user }) => {

  useEffect(() => {
    // Dispatch the get_all_posts action and await its completion
    get_all_posts()
      .then((data) => {
        // The data from the API call is available here
        console.log("Posts data:", data);
  
        // Dispatch other actions or perform any necessary logic here
  
        // For example, you can dispatch checkAuthenticated and load_user here if needed
        checkAuthenticated();
        load_user();
      })
      .catch((error) => {
        console.error("Error loading posts:", error);
      });
  }, []);

  return (
    <Fragment>
      <Navbar></Navbar>
      {children}
      {/* <Footer></Footer> */}
    </Fragment>
  );
};

export default connect(null,{checkAuthenticated, load_user})(HomeLayout);

