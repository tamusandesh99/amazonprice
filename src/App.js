import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeLayout from "./hocs/Layout";
import SinglePost from "./components/SinglePost";
import UserPost from "./components/UserPost";
import UserLogin from "./components/UserLogin";
import HomePage from "./components/HomePage";
import UserRegister from "./components/UserRegister";
import UserProfile from "./components/UserProfile";
import SamplePost from "./assets/SamplePost";
import HelpComponent from "./components/Help";

import { Provider } from "react-redux";
import store from "./store";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
        <SkeletonTheme baseColor="rgb(48, 47, 47)" highlightColor="#807c7c">
            <HomeLayout>
              <Routes>
                <Route exact path="/" element={<HomePage />} />
                {/* <Route exact path="/posts" element={<AllPosts />} /> */}
                <Route exact path="/posts/:title" element={<SinglePost />} />
                <Route exact path="/submitpost" element={<UserPost />} />
                <Route exact path="/samplepost" element={<SamplePost />} />
                <Route exact path="/login" element={<UserLogin />} />
                <Route exact path="/register" element={<UserRegister />} />
                <Route exact path="/profile" element={<UserProfile />} />
                <Route exact path="/help" element={<HelpComponent />} />
              </Routes>
            </HomeLayout>
          </SkeletonTheme>
        </Router>
      </Provider>
    </>
  );
}

export default App;
