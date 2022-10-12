import "../styles/Header.css";
import logo from "../assets/logo.png";

function Header() {
  return (
    <div className="lmj-header" id="navbarLogged">
      <img src={logo} alt="Gropomania" className="lmj-logo" />
      <div>
        <h1 className="lmj-page-title"> Fermer </h1>{" "}
      </div>
    </div>
  );
}

export default Header;
