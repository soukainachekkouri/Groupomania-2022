import "../Homepage/Home.css";
import React from "react";
import MyButton from "../../components/MyButton/MyButton";
import PublicationCard from "../../components/PublicationCard/PublicationCard";
import PostOfTheDay from "../../components/PublicationDuJour/postOfTheDay";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Homepage = (props) => {
  return (
    <div>
      <div className="Hero">
        <div className="Hero-text-part">
          <div className="Hero-text-part-title">
            <h1>Faites le </h1>
            <h1 className="part-two">premier pas</h1>
          </div>
          <p>
            Vous l'attendiez, nous l'avons fait ! Envie de boire un verre après
            une longue semaine, de trouver des copilotes de sports, des
            gourmands pour vous accompagner pendant la pause gouter... ? Laissez
            parlez vos envies sur Groupoconnect !{" "}
          </p>
        </div>
        <div className="image-section">
          <img />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
