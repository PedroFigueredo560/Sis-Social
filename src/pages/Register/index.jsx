import React from "react";
import "./style.css";
import '../service/service'


const Register = () => {
    return (
      <div className="register">
        <div className="content">
          {
            <><h1>
                Cadastro
            </h1>
            <h2>
                Nome completo: <input type="text" id="nome_ben" required/>
                <br />
                CPF: <input type="text" id="cpf" name="cpf" maxLength="14" />
                <br />
                Usuário: <input type="text" id="user_ben" required />
                <br />
                Senha: <input type="password" id="password_ben" required />
                <br />
                <button className="register-button" onclick = 'register_ben()'>Cadastrar</button>
            </h2></>
          }
        </div>
      </div>
    );
  };

export default Register;