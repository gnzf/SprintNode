import React from 'react'
import { useState } from 'react'
import "./formulario.css"
import { useNavigate } from 'react-router-dom'
import {registrarUsuario} from "../API/rule_auth"

function formulario() {
  const [inputPassword, setInputPassword] = useState("");
  const [names , setNames] = useState("");
  const [email , setEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const navigate = useNavigate();


  const [inputPasswordError, setInputPasswordError] = useState(false);

  const handleChangePassword = (event) => {
        setInputPassword(event.target.value); 
      if (event.target.value.length < 8) {
        setInputPasswordError(true);
      } else {
        setInputPasswordError(false);
      }
  };

 

  const handleSubmit = async (event) => {
        event.preventDefault();
        if (!errorPassword) {
          await registrarUsuario({ email: email, password: inputPassword })
            .then((resultado) => {
              alert(resultado.mensaje);
              navigate("/home", { replace: true });
            })
            .catch((error) => {
              alert(error);
            });
        } else {
          alert("Las credenciales no son correctas"); //esto se manda a un servidor para corroborar las credenciales
        }
  }

  return (
    <div className="form-container">
      <form className='form' onSubmit={handleSubmit}>
        <h1>Registrarse</h1>
        
        <input type='email' placeholder='Correo *' value={email} onChange={(event) =>{ setEmail(event.target.value)}}></input>

        <input 
          className={errorPassword ?  'error' : ""}
          requiered=""
          type='password'
          value={inputPassword}
          onChange={handleChangePassword}
          placeholder='Contraseña *'
        />
        {inputPasswordError && (<p style={{ color: "red" }}>La contraseña debe tener 8 caracteres mínimo</p>)}

        <button type="submit">Registrarse ahora</button>
      </form>
    </div>
  )
}

export default formulario
