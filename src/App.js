import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeLayout from "./components/Layout";
import Website from "./components/Website";
import WebsiteList from "./components/WebsiteList";
import WebsiteSubmit from "./components/WebsiteSubmit";
import UserLogin from "./components/UserLogin";
import HomePage from "./components/HomePage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="websites" element={<WebsiteList />} />
          <Route path="websites/:id" element={<Website />} />
          <Route path="submitwebsite" element={<WebsiteSubmit />} />
          <Route path="login" element={<UserLogin />} />
          <Route path="register" element={<UserLogin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
