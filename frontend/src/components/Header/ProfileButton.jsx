import Dropdown from "react-bootstrap/Dropdown";
import React from "react";
import { Link } from "react-router-dom";

import "../Header/ProfileButton.css";
import avatar from "../Header/assets/avatar.png";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileButton = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="Dropdown-menu">
      <button onClick={handleOpen} className="dropdown-button">
        Profil
        <img src={avatar} alt="Gropomania" className="dropdown-button-avatar" />
      </button>{" "}
      {open ? (
        <ul className="menu">
          <li className="menu-item">
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} />
              Mon profil
            </Link>
          </li>
          <li className="menu-item">
            <button>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              Déconnexion
            </button>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default ProfileButton;
