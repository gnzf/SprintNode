import api from "./rule_API";

export const getClientes = async () => {
  let url = "/usuarios";
  return await api
    .get(url)
    .then((resultado) => {
      console.log(resultado);
      return resultado.data;
    })
    .catch((error) => {
      throw error.response.data.error || "Error procesando la solicitud";
    });
};

export const getClienteById = async (id) => {
  let url = `/listaClientesReducida/${id}`;
  return await api
    .get(url)
    .then((resultado) => {
      return resultado.data;
    })
    .catch((error) => {
      throw error.response.data.error || "Error procesando la solicitud";
    });
};
