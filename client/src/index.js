import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Browse from "./components/pages/Browse";
import Add from "./components/pages/Add";
import Search from "./components/pages/Search";
import Signin from "./components/pages/Signin";
import Signup from "./components/pages/Signup";
import Error from "./components/pages/Error";
import reportWebVitals from "./reportWebVitals";
import Navbar from "./components/Navbar";

import "./css/bootstrap.min.css"
import "./css/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="browse" element={<Browse />} />
          <Route path="add" element={<Add />} />
          <Route path="search" element={<Search />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
