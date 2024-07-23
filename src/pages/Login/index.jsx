import React from "react";
import "./style.css";

const Login = () => {
  return (
    <div className="login">
      <div className="content">
        {
            <><h1>
                Login
            </h1>
            <h2>
                Usuário: <input type="text" id="username" required />
                <br />
                Senha: <input type="password" id="password" required />
                <br />
                <button className="login-button">Login</button>
            </h2></>
        }
      </div>
    </div>
  );
};

export default Login;