const knex = require("../config/knexfile");

const allTareas= async (req, res) => {
    try {
      const resultado = await knex("tareas");
      res.json(resultado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

const allUsuarios= async (req, res) => {
    try {
      const resultado = await knex("usuarios");
      res.json(resultado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

const allPrioridades= async (req, res) => {
    try {
      const resultado = await knex("prioridades");
      res.json(resultado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  const agregarPrioridad = (req, res) =>{
    const {id_prioridad ,nombre, descripcion} = req.body;

        knex("prioridades")
        .insert({
            id_prioridad: id_prioridad,
            nombre: nombre,
            descripcion: descripcion,
        })
        .then(() => {
            res
            .status(200)
            .json({mensaje: "Se inserto correctamente el registro"});
        })
        .catch((error) => {
            res.status(400).json({error: error.message})
        })
    .catch((error) =>{
        res.status(400).json({error: error.message})
    })
}
 

  const agregarUsuario = (req, res) =>{
    const {id_usuario,email,activo} = req.body;
    
    knex("usuarios")
    .select("id_usuario")
    .where("id_usuario", id_usuario)
    .then((resultado) =>{
        if(resultado.length){
            res.status(400).json({error: "Ya existe un registro con ese id"});
            return;
        }
        knex("usuarios")
        .insert({
            id_usuario: id_usuario,
            email: email,
            activo: activo,
        })
        .then(() => {
            res
            .status(200)
            .json({mensaje: "Se inserto correctamente el registro"});
        })
        .catch((error) => {
            res.status(400).json({error: error.message})
        })
    .catch((error) =>{
        res.status(400).json({error: error.message})
    })
})}



const agregarTarea = (req, res) =>{
    const {titulo ,id_usuario ,id_prioridad ,completado} = req.body;
    
    knex("tareas")
    .select("id_usuario")
    .where("id_usuario", id_usuario)
    .then((resultado) =>{
        if(resultado.length){
            res.status(400).json({error: "Ya existe un registro con ese id"});
            return;
        }
        knex("tareas")
        .insert({
            titulo: titulo,
            id_usuario: id_usuario,
            id_prioridad: id_prioridad,
            completado: completado,
        })
        .then(() => {
            res
            .status(200)
            .json({mensaje: "Se inserto correctamente el registro"});
        })
        .catch((error) => {
            res.status(400).json({error: error.message})
        })
    .catch((error) =>{
        res.status(400).json({error: error.message})
    })
})
   
}

const tareaPut = (req,res) => {
    const idRequest = Number(req.params.id);
    const result = knex("tareas").findIndex((registro) => registro.id_tarea == idRequest);
    if(result >= 0){
        knex("tareas")[result].titulo = req.body.titulo;
        knex("tareas")[result].completado = req.body.completado;
        res.status(200).json("Modificado con exito!!");
    }else{
        res.status(404).json({
            error: "No se pudo updatear por algun error revise su codigo"
        })
    }
}

const tareaPutid = (req,res) => {
    const idRequest = Number(req.params.id);
    const result = task.findIndex((registro) => registro.id == idRequest);
    if(result >= 0){
        task[result].titulo = req.body.titulo;
        res.status(200).json("Modificado por id con exito!");
    }else{
        res.status(404).json({
            error: "No se ha encontrado un registro con ese id"
        })
    }
}

module.exports = {allTareas, agregarTarea, tareaPut, tareaPutid, agregarUsuario, agregarPrioridad, allPrioridades, allUsuarios}