import React, {Fragment} from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./index.scss";
import Navbar from "../../components/Navbbar";

const HomeLayout = ({children}) => (
  <Fragment>
    <Navbar></Navbar>
    {children}
  </Fragment>
)

export default HomeLayout;

// const HomeLayout = () => {
//   let navigate = useNavigate();
//   const handleButtonClick = () => {
//     navigate("/login");
//   };
//   return (
//     <>
//       <div className="main-layout-page">
        
//         <nav className="main-navbar">
//          <p className="title-name">ReviewersHub</p>
//          <button onClick={handleButtonClick} className="login-button">Login</button>
//         </nav>
//         <Outlet />
//       </div>
//     </>
//   );
// };

// export default HomeLayout;
