import "../PublicationPage/publicationPage.css";
import React, { useState } from "react";
import MyButton from "../../components/MyButton/MyButton";
import LastPublication from "../../components/lastPublications/lastPost";

const PublicationPage = (props) => {
  const [state, setState] = useState({ description: "", image: null });
  //je créer la fonction handlechange pour la description
  const handleChange = (e) => {
    if (e.target.id === "description") {
      //je récupère l'ancienne valeur dans le state avant de récupérer ce que user vient de saisir
      setState({ ...state, description: e.target.value });
    } else if (e.target.id === "image") {
      setState({ ...state, image: e.target.files[0] });
    }
  };
  const handleSubmit = (e) => {
    //empêcher la soumition du form
    e.preventDefault();
    //1.controler l'extention du fichier (on veut juste une image)
    //form date qu'on renvoie et non pas un json
    let formData = new FormData();
    if (state.image !== null) {
      const types = ["png", "jpeg", "jpg"];
      const fileName = state.image.name;
      const fileExtention = fileName.split(".").pop();
      if (!types.includes(fileExtention.toLowerCase())) {
        setState({ ...state, image: null });
        alert("Format non pris en charge");
        return;
      }
      formData.append("imageUrl", state.image);
    }
    formData.append("description", state.description);
    formData.append("userId", window.localStorage.getItem("userId"));
    //2. j'envoie les infos au back
    fetch("http://localhost:3000/api/post/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        console.log(data);
      })

      .catch((e) => {
        console.log(e);
      });
  };
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
      <form className="post-creation-part" onSubmit={handleSubmit}>
        <div className="description">
          <h3 className="description-title">1. Votre description</h3>
          <input
            type="text"
            className="description-input"
            placeholder="Votre description ici..."
            id="description"
            onChange={handleChange}
            value={state.description}
          ></input>
        </div>
        <div className="description">
          <h3 className="description-title">
            2. Ajouter un visuel (optionnel)
          </h3>
          <input
            type="file"
            className="image-input"
            id="image"
            onChange={handleChange}
          ></input>
        </div>
        <MyButton icon="" title="Publier"></MyButton>
      </form>
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

export default PublicationPage;
