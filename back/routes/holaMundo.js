const express = require("express");

const {allTask, agregarTarea, tareaPut, tareaPutid} = require("../controllers/holaMundoControllers")

const router = express.Router();

router.get("/task", allTask);

router.post("/task", agregarTarea);

router.put("/task", tareaPut);

router.put("/task/:id", tareaPutid)

module.exports = router;