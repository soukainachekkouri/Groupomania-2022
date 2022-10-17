import "../Header/Header.css";
import logo from "../Header/assets/logo.png";
import avatar from "../Header/assets/avatar.png";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="lmj-header" id="navbarLogged">
      <img src={logo} alt="Gropomania" className="lmj-logo" />
      <h1 className="lmj-page-title"> Les posts </h1>{" "}
      <button className="lmj-profile-button">
        <h1 className="lmj-button-name"> Mon profil </h1>{" "}
        <img src={avatar} alt="My-avatar" className="lmj-button-avatar" />
      </button>{" "}
    </div>
  );
}

export default Header;
