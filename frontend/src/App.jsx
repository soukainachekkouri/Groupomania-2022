import React from "react";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Homepage from "./pages/Homepage/Homepage";
import PublicationPage from "./pages/PublicationPage/publicationPage";
import ProfilePage from "./pages/ProfilePage/profilePage";
import { Navigate } from "react-router";
//import Textholder from "./components/Textholder";

function App() {
  //ici changer la redirection vers le login si pas connecté
  return (
    <HashRouter>
      <div className="container-fluid">
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/publication" element={<PublicationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/publication/:id" element={<PublicationPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
