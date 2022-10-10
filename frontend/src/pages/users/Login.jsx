import React, { useState } from "react";

function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });
  return (
    <div className="login-page">
      <div className="form-login">
        <h1 className="form-login-title"> Se connecter </h1>
        <p className="form-login-description">
          Pour vous inscrire ou vous connecter, veuillez bien à utiliser votre
          adresse mail professionnelle.{" "}
        </p>{" "}
        <div className="form-login-subscription-link">
          <p> Vous n 'avez pas de compte ? </p>
          <div>
            <p className="form-login-subscription-permalink">
              {" "}
              Je souhaite devenir membre
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="image-section"> </div>
      <div className="login-image-section">
        <img src={loginImage} alt="login-image" className="gpm-loging-image" />
      </div>
    </div>
  );
}

export default Login;
