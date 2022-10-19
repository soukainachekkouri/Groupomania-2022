import "../PublicationPage/publicationPage.css";
import React from "react";
import MyButton from "../../components/MyButton/MyButton";
import LastPublication from "../../components/lastPublications/lastPost";

const Homepage = (props) => {
  return (
    <div>
      <div className="Hero">
        <div className="Hero-text-part">
          <div className="Hero-text-part-title">
            <h1>Faites le </h1>
            <h1 className="part-two">premier pas</h1>
          </div>
          <p>Vos collègues n'attendent que ça !</p>
        </div>
        <div className="image-section">
          <img />
        </div>
      </div>
      <h2 className="section-title">À vous de jouer</h2>
      <div className="post-creation-part">
        <div className="description">
          <h3 className="description-title">1. Votre description</h3>
          <input
            type="text"
            className="description-input"
            placeholder="Votre description ici..."
          ></input>
        </div>
        <div className="description">
          <h3 className="description-title">
            2. Ajouter un visuel (optionnel)
          </h3>
          <input
            type="image"
            className="image-input"
            placeholder="mail@mail.fr"
          ></input>
        </div>
        <MyButton icon="" title="Publier"></MyButton>
      </div>
      <div>
        <h2 className="section-title">
          Dernières publications de la communauté
        </h2>
        <div className="last-publication-card">
          <LastPublication></LastPublication>
          <LastPublication></LastPublication>
          <LastPublication></LastPublication>
          <LastPublication></LastPublication>
          <LastPublication></LastPublication>
          <LastPublication></LastPublication>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
