import React from "react";
import logo from "./logo.svg";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./component/SignInPage"
import SignUpPage from "./component/SignUpPage"
import HomePage from "./component/HomePage/HomePage";
import CreatePostPage from "./component/CreatePostPage";
import JobList from "./component/JobList";
import EmployerPage from "./component/EmployerPage/EmployerPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/createpost/:id" element={<CreatePostPage />}></Route>
          <Route path="/employer" element={<EmployerPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
