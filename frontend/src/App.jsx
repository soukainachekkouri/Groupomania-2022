import React from "react";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
//import Textholder from "./components/Textholder";

function App() {
  return (
    <HashRouter>
      <div className="container-fluid">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
