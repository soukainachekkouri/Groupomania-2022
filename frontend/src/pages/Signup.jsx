import "../styles/Login.css";
import loginImage from "../assets/login-photo.jpg";
import React, { useState } from "react";

function SignUp() {
  const [signup, setSignup] = useState({ name: "", email: "", password: "" });
  // fonction déclenché quand je modifie le champs email
  const handleChange = (e) => {
    if (e.target.id === "name") {
      setSignup({ ...signup, name: e.target.value });
    } else if (e.target.id === "email") {
      setSignup({ ...signup, email: e.target.value });
    } else if (e.target.id === "password") {
      setSignup({ ...signup, password: e.target.value });
    }
  };
  const SignupSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: signup,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="login-page">
      <div className="form-login">
        <h1 className="form-login-title"> Créer un compte </h1>{" "}
        <p className="form-login-description">
          Pour vous inscrire ou vous connecter, veuillez bien à utiliser votre
          adresse mail professionnelle.{" "}
        </p>{" "}
        <div className="form-login-subscription-link">
          <p> Vous avez déjà un compte ? </p>{" "}
          <div>
            <p className="form-login-subscription-permalink">
              {" "}
              Je souhaite me connecter{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <form onSubmit={SignupSubmit} className="all-form-group">
          <div className="form-group">
            <label htmlFor="name">Votre prénom</label>
            <input
              type="text"
              name="name"
              value={signup.name}
              onChange={handleChange}
              className="form-control"
              id="name"
              placeholder="Wattson"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Votre email</label>
            <input
              type="text"
              name="email"
              value={signup.email}
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
              value={signup.password}
              onChange={handleChange}
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <button type="submit">Créer un compte</button>
        </form>
      </div>{" "}
      <div className="image-section"> </div>{" "}
    </div>
  );
}

export default SignUp;
