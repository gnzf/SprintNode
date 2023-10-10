const express = require("express");

const {allTareas, agregarTarea, agregarUsuario, agregarPrioridad, allUsuarios, allPrioridades, tareaPut} = require("../controllers/basedatosControllers");

const router = express.Router();

router.get("/tareas", allTareas);
router.get("/usuarios", allUsuarios);
router.get("/prioridades", allPrioridades);
router.post("/agregarTarea", agregarTarea);
router.post("/agregarUsuario", agregarUsuario);
router.post("/agregarPrioridad", agregarPrioridad);
router.put("/modificarTarea/:id", tareaPut)

module.exports = router;
