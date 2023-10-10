import api from "./rule_API";
import { useNavigate } from "react-router-dom";

export const registrarUsuario = async (user) => {
  let url = "/auth/registrar";
  return await api
    .post(url, user)
    .then((resultado) => {
      return resultado.data;
    })
    .catch((error) => {
      throw error.response.data.error || "Error procesando la solicitud";
    });
};

export const loginUsuario = async (user) => {
  let url = "/auth/login";
  return await api
    .post(url, user)
    .then((resultado) => {
      localStorage.setItem("token", resultado.data.token);
      return resultado.data;
    })
    .catch((error) => {
      throw error.response.data.error || "Error procesando la solicitud";
    });
};

export const logout = () => {
  localStorage.removeItem("token");
};