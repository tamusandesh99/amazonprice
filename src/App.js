import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeLayout from "./hocs/Layout";
import Website from "./components/Website";
import WebsiteList from "./components/WebsiteList";
import WebsiteSubmit from "./components/WebsiteSubmit";
import UserLogin from "./components/UserLogin";
import HomePage from "./components/HomePage";
import UserRegister from "./components/UserRegister";

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
              <Route exact path="/websites" element={<WebsiteList />} />
              <Route exact path="/websites/:id" element={<Website />} />
              <Route exact path="/submitwebsite" element={<WebsiteSubmit />} />
              <Route exact path="/login" element={<UserLogin />} />
              <Route exact path="/register" element={<UserRegister />} />
            </Routes>
          </HomeLayout>
        </Router>
      </Provider>
    </>
  );
}

export default App;
