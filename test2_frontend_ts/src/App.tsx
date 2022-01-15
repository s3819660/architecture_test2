import React from "react";
import logo from "./logo.svg";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./component/SignInPage"
import SignUpPage from "./component/SignUpPage"
import HomePage from "./component/HomePage/HomePage";
import CreateEditPostPage from "./component/CreateEditPostPage/CreateEditPostPage";
import EmployerPage from "./component/CreateEditPostPage/EmployerPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/createpost/:userId/:postId" element={<CreateEditPostPage />}></Route>
          <Route path="/employer" element={<EmployerPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
