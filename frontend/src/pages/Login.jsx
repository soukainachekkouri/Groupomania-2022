import "../styles/Login.css";
import loginImage from "../assets/login-photo.jpg";
import React, { useState } from "react";

function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });
  // fonction déclenché quand je modifie le champs email
  const handleChange = (e) => {
    if (e.target.id === "email") {
      setLogin({ ...login, email: e.target.value });
    } else if (e.target.id === "password") {
      setLogin({ ...login, password: e.target.value });
    }
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    console.log(login);
    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: login.email, password: login.password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          document.getElementById("login-message-error").innerText =
            "Mail ou mot de passe incorrect";
          throw "Mail ou mot de passe incorrect";
        }
      })
      .then((data) => {
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("userId", data.userId);
        window.open("/");
      })

      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="login-page">
      <div className="form-login">
        <h1 className="form-login-title"> Se connecter </h1>{" "}
        <p className="form-login-description">
          Pour vous inscrire ou vous connecter, veuillez bien à utiliser votre
          adresse mail professionnelle.{" "}
        </p>{" "}
        <div className="form-login-subscription-link">
          <p> Vous n 'avez pas de compte ? </p>{" "}
          <div>
            <p className="form-login-subscription-permalink">
              {" "}
              Je souhaite devenir membre{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <form onSubmit={loginSubmit} className="all-form-group">
          <div className="form-group">
            <label htmlFor="email">Votre email</label>
            <input
              type="text"
              name="email"
              value={login.email}
              onChange={handleChange}
              className="form-control"
              id="email"
              placeholder="mail@mail.fr"
            />
          </div>
          <div className="form-group">
            <label htmlFor="passxord">Votre mot de passe</label>
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={handleChange}
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <div id="login-message-error"></div>
          <button type="submit">Connexion</button>
        </form>
      </div>
      <div className="image-section"> </div>
      <div className="login-image-section">
        <img src={loginImage} alt="login-image" className="gpm-loging-image" />
      </div>
    </div>
  );
}

export default Login;
