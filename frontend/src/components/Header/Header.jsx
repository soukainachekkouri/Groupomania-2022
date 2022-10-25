import "../Header/Header.css";
import logo from "../Header/assets/logo.png";
import avatar from "../Header/assets/avatar.png";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";

function Header() {
  return (
    <div className="lmj-header" id="navbarLogged">
      <img src={logo} alt="Gropomania" className="lmj-logo" />
      <h1 className="lmj-page-title"> Les posts </h1> <ProfileButton />
    </div>
  );
}

export default Header;
