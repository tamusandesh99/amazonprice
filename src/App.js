import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeLayout from "./components/Layout";
import Website from "./components/Website";
import WebsiteList from "./components/WebsiteList";
import WebsiteSubmit from "./components/WebsiteSubmit";
import WebsiteLogin from "./components/WebsiteLogin";

function App() {
  return (
    <>

        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/websites" element={<WebsiteList />} />
          <Route path="/websites/:id" element={<Website />} />
          <Route path="/submitwebsite" element={<WebsiteSubmit />} />
          <Route path="/login" element={<WebsiteLogin />} />
        </Routes>

    </>
  );
}

export default App;
