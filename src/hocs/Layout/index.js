import React, { Fragment, useEffect } from "react";
import "./index.scss";
import Navbar from "../../components/Navbar";
import { connect } from "react-redux";
import { checkAuthenticated } from "../../actions/auth";
import { load_user } from "../../actions/profile";

const HomeLayout = ({ children, checkAuthenticated, load_user }) => {

  useEffect(()=>{
    checkAuthenticated()
    load_user()
  },[])

  return (
    <Fragment>
      <Navbar></Navbar>
      {children}
    </Fragment>
  );
};

export default connect(null,{checkAuthenticated, load_user})(HomeLayout);

