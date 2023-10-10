import React from "react"
import { useState } from "react"
import "./contador.css"
import { getClientes } from "../API/rule_usuarios";

function Contador(props) {
    const [valor, setValor] = useState(0); // setter (set)
    const [click, setClick] = useState(false)
    const [resultados, setResultados] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
      try{
          await getClientes()
            .then((resultado) => {
            const usuarios = resultado.filter(x => x.password === null)
            setResultados(usuarios)
            console.log(usuarios)
              console.log(resultado);
            })
            .catch((error) => {
              alert(error);
            });
        } catch {
          alert("Las credenciales no son correctas"); //esto se manda a un servidor para corroborar las credenciales
        }
    }

    const sumar = () =>{
        setValor(valor + 1);
    }
    const restar = () =>{
        if(valor > 0){
        setValor(valor - 1);
    }
    }


    return(
      <div>
        
        <div className="container-contador">
            <button className="suma" onClick={sumar}>+</button>
            <p className="currentClass">{valor}</p>
            <button className="resta" onClick={restar}>-</button>
            <button onClick={handleSubmit}>Mostrar Lista</button>
        </div>
          {resultados.length > 0 ? <div>
          {resultados.map((usuarios) => {
            return (
            <>
             <ul>
                <li>{usuarios.id_usuario}</li>
                <li>{usuarios.email}</li>
             </ul>
            </>
            )
          })}
        </div> : null}


        
      </div>
    )
 }

export default Contador