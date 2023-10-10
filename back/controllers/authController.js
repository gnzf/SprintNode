const knex = require("../config/knexfile");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password } = req.body;

  //password: criminal guardarla en la bd

  //1) encriptar con una libreria que se llama bcrypt.
  const salt = await bcrypt.genSalt(10);

  const passwordEncrypt = await bcrypt.hash(password, salt);

  //2) que no exista username, email
  try {
    const existeEmail = await knex("usuarios").where("email", email);
    if (existeEmail.length) {
      res.status(400).json({ error: "Ya existe un registro con ese email" });
      return;
    }
    await knex("usuarios").insert({
      email: email,
      activo: true,
      password: passwordEncrypt,
    });
    //3) esta todo ok, insertamos. Si no, respuesta de error

    res.status(200).json({ mensaje: "Usuario creado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //1) chequear que exista el email.
    const usuario = await knex("usuarios").where("email", email);

    if (!usuario.length) {
      res.status(403).json({ error: "Email y/o contrasenia incorrectos" });
      return;
    }

    //2) chequear la password.
    // usamos usuario[0] para acceder al primer objeto de la consulta (que es un array)
    const validatePassword = await bcrypt.compare(
      password,
      usuario[0].password
    );

    if (!validatePassword) {
      res.status(403).json({
        error: "Email y/o contrasenia incorrectos",
      });
      return;
    }
    //3) generar el JWT.
    const token = jsonwebtoken.sign(
      {
        nombre: usuario[0].nombre,
        email: usuario[0].email, //PAYLOAD
       /*  perfil: usuario[0].perfil, */
      },
      "mifirma"
    );

    res
      .status(200)
      .json({ mensaje: "Inicio de sesion correcto", token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login };
