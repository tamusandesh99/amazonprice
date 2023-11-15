import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeLayout from "./hocs/Layout";
import SinglePost from "./components/SinglePost";
import UserPost from "./components/UserPost";
import UserLogin from "./components/UserLogin";
import HomePage from "./components/HomePage";
import UserRegister from "./components/UserRegister";
import UserProfile from "./components/UserProfile";

import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <HomeLayout>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              {/* <Route exact path="/posts" element={<AllPosts />} /> */}
              <Route exact path="/posts/:id" element={<SinglePost />} />
              <Route exact path="/submitpost" element={<UserPost />} />
              <Route exact path="/login" element={<UserLogin />} />
              <Route exact path="/register" element={<UserRegister />} />
              <Route exact path="/profile" element={<UserProfile />} />
            </Routes>
          </HomeLayout>
        </Router>
      </Provider>
    </>
  );
}

export default App;
