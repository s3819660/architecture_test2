import React from "react";
import logo from "./logo.svg";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./component/SignInPage"
import SignUpPage from "./component/SignUpPage"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
