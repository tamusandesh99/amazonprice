import React, { Fragment, useEffect } from "react";
import "./index.scss";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { connect } from "react-redux";
import { checkAuthenticated } from "../../actions/auth";
import { load_user } from "../../actions/profile";
import { get_all_posts } from "../../actions/posts";

const HomeLayout = ({ children, checkAuthenticated, load_user, get_all_posts }) => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await get_all_posts(); // Dispatch the action
  
        // Dispatch other actions if needed
        checkAuthenticated();
        load_user();
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    };
  
    fetchData(); // Call the async function
  }, []);

  return (
    <Fragment>
      <Navbar></Navbar>
      {children}
      {/* <Footer></Footer> */}
    </Fragment>
  );
};

export default connect(null,{checkAuthenticated, load_user, get_all_posts})(HomeLayout);

