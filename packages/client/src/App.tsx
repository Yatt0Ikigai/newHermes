import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/UserPage";

import "./index.scss";

const App = () => (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/user/:userId" element={<ProfilePage />} />
  </Routes>
</BrowserRouter>
);
ReactDOM.render(<App />, document.getElementById("app"));
