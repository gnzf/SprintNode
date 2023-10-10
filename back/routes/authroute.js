const { register, login } = require("../controllers/authController");

const express = require("express");

const router = express.Router();

router.post("/registrar", register);

router.post("/login", login);



module.exports = router;