import "../../pages/Homepage/Home.css";
import React, { useEffect, useState } from "react";
import loginImage from "../Auth/assets/login-photo.jpg";
import MyButton from "../../components/MyButton/MyButton";
import PublicationCard from "../../components/PublicationCard/PublicationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import PostOfTheDay from "../../components/PublicationDuJour/postOfTheDay";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Homepage = () => {
  const [data, setPosts] = useState([]);
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    fetch("http://localhost:3000/api/post/", {
      headers: {
        Authorization: "bearer " + token,
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((datas) => {
        console.log(datas);
        setPosts(datas);
      })
      .catch((error) => console.log(error));
  }, [token]);

  const handleDelete = (post) => {
    setPosts(data.filter((element) => element._id !== post._id));
  };

  return (
    <div>
      <div className="Hero">
        <div className="Hero-text-part">
          <div className="Hero-text-part-title">
            <h1>Un espace communautaire</h1>
            <h1 className="part-two">pensé pour vous</h1>
          </div>
          <p className="part-two-description">
            Vous l'attendiez, nous l'avons fait ! Envie de boire un verre après
            une longue semaine, de trouver des copilotes de sports, des
            gourmands pour vous accompagner pendant la pause gouter... ? Laissez
            parlez vos envies sur Groupoconnect !{" "}
          </p>
          <Link to="/publication" className="share-post-button">
            Partager une publication
          </Link>
        </div>
        <div className="image-section">
          <img />
        </div>
      </div>
      <div className="social-wall">
        <div className="title-part">
          <h2 className="title-part-title">La galerie</h2>
          <p className="title-part-description">
            Retrouvez l'ensemble des publications de vos collègues. Vous êtes
            libre de commenter celles qui vous intéressent et d’enregistrer
            celles que vous préférez. Vous pouvez également partager vos envies
            à tout moment !
          </p>
        </div>
        <div className="wall-part">
          <div className="wall-part-first-part">
            <div className="filter-bar">
              <h3>Filtrer par :</h3>
              <div className="filter-bar-cards">
                <div className="filter-bar-card-new-post">
                  <div className="clock-icon">
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                  <h4>Récents</h4>
                </div>
                <div className="filter-bar-card">
                  <div className="bolt-icon">
                    <FontAwesomeIcon icon={faBolt} />
                  </div>
                  <h4>Populaires</h4>
                </div>
                <div className="filter-bar-card">
                  <div className="heart-icon">
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                  <h4>Mes publications préférées</h4>
                </div>
                <div className="filter-bar-button">
                  <Link to="/publication" className="share-post-button-fb">
                    Partager une publication
                  </Link>
                </div>
              </div>
            </div>
            <div className="publications-section">
              <div className="publication-cards">
                {data.map((element) => (
                  <PublicationCard
                    key={element._id}
                    post={element}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          </div>
          <PostOfTheDay></PostOfTheDay>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
