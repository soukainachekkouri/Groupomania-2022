import "../Auth/Login.css";
import loginImage from "../Auth/assets/login-photo.jpg";
import React, { useState } from "react";
import MyButton from "../../components/MyButton/MyButton";
import { useNavigate } from "react-router";

function SignUp() {
  const [signup, setSignup] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
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
  const signupSubmit = (e) => {
    e.preventDefault();
    console.log(signup);
    fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name: signup.name,
        email: signup.email,
        password: signup.password,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          document.getElementById("login-message-error").innerText =
            "Something went wrong";
          throw "Something went wrong";
        }
      })
      .then((data) => {
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("userId", data.userId);
        navigate("/");
        setSignup({
          name: "Wattson",
          email: "wattson@groupomania.com",
          password: "******",
        });
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
        <form onSubmit={signupSubmit} className="all-form-group">
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
              type="email"
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
          <MyButton title="Créer mon compte"></MyButton>
        </form>
      </div>{" "}
    </div>
  );
}

export default SignUp;
