import "../PublicationPage/publicationPage.css";
import React, { useEffect, useState } from "react";
import MyButton from "../../components/MyButton/MyButton";
import LastPublication from "../../components/lastPublications/lastPost";
import { useNavigate, useParams } from "react-router";

const PublicationPage = (props) => {
  const [state, setState] = useState({
    message: "",
    image: null,
    imageUrl: "",
    userId: "",
  });
  const [save, isSave] = useState(true);
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();

  //je créer la fonction handlechange pour la description
  const handleChange = (e) => {
    if (e.target.id === "message") {
      //je récupère l'ancienne valeur dans le state avant de récupérer ce que user vient de saisir
      setState({ ...state, message: e.target.value });
    } else if (e.target.id === "image") {
      setState({ ...state, image: e.target.files[0] });
    }
  };

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      isSave(false);
      fetch("http://localhost:3000/api/post/" + params.id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          setState({
            message: data.message,
            image: null,
            imageUrl: data.imageUrl,
            userId: data.userId,
          });
        })

        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const handleSubmit = (e) => {
    //empêcher la soumition du form
    e.preventDefault();
    //1.controler l'extention du fichier (on veut juste une image)
    //form date qu'on renvoie et non pas un json
    const types = ["png", "jpeg", "jpg"];

    if (state.image !== null) {
      const fileName = state.image.name;
      const fileExtention = fileName.split(".").pop();
      if (!types.includes(fileExtention.toLowerCase())) {
        setState({ ...state, image: null });
        alert("Format non pris en charge");
        return;
      }
    }
    let formData = new FormData();
    formData.append("imageUrl", state.image);
    formData.append("description", state.message);

    const token = window.localStorage.getItem("token");
    if (save) {
      formData.append("userId", window.localStorage.getItem("userId"));
      fetch("http://localhost:3000/api/post/", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "*/*",
        },
        body: formData,
      })
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          console.log(data);
          navigate("/home");
        })

        .catch((e) => {
          console.log(e);
        });
    } else {
      formData.append("userId", state.userId);
      fetch("http://localhost:3000/api/post/" + params.id, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "*/*",
        },
        body: formData,
      })
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          console.log(data);
          navigate("/home");
        })

        .catch((e) => {
          console.log(e);
        });
    }

    //2. j'envoie les infos au back}
  };

  return (
    <div>
      <div className="Hero">
        <div className="Hero-text-part">
          <div className="Hero-text-part-title">
            <h1>Vos collègues</h1>
            <h1 className="part-two">n'attendent que vous</h1>
          </div>
          <p className="part-two-description">
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
      <h2 className="section-title">À vous de jouer</h2>
      <form className="post-creation-part" onSubmit={handleSubmit}>
        <h3 className="description-title">1. Votre description</h3>
        <div className="description">
          <input
            type="text"
            className="description-input"
            placeholder="Votre description ici..."
            id="message"
            onChange={handleChange}
            value={state.message}
          ></input>
        </div>
        <div>
          <h3 className="description-title">
            2. Ajouter un visuel (optionnel)
          </h3>
          <div className="description-image">
            <input
              type="file"
              className="image-input"
              id="image"
              onChange={handleChange}
            ></input>
            {save ? (
              ""
            ) : (
              <img
                src={state.imageUrl}
                alt="mon-image"
                className="image-input-part"
              />
            )}
          </div>
        </div>
        <MyButton className="publish-button" icon="" title="Publier"></MyButton>
      </form>
      <div>
        <h2 className="section-title-long">
          Dernières publications de la communauté
        </h2>
        <div className="last-publication-card">
          <LastPublication></LastPublication>
          <LastPublication></LastPublication>
        </div>
      </div>
    </div>
  );
};

export default PublicationPage;
