import "../Header/Header.css";
import { Link } from "react-router-dom";
import logo from "../Header/assets/logo.png";
import avatar from "../Header/assets/avatar.png";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";

function Header() {
  return (
    <div className="lmj-header" id="navbarLogged">
      <Link to="/" className="lmj-logo">
        <img src={logo} alt="Gropomania" className="lmj-logo" />
      </Link>
      <h1 className="lmj-page-title"> Les posts </h1> <ProfileButton />
    </div>
  );
}

export default Header;
