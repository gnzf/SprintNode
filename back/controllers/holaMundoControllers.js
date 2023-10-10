const task = require("../data/task");
const knex = require("../config/knexfile");

const allTask = (req,res) => {
    res.json({task})
}

const agregarTarea = (req, res) =>{
    try{
        const nuevaTarea = req.body;
    if(nuevaTarea.titulo && nuevaTarea.usuario_id && nuevaTarea.prioridad_id && nuevaTarea.completado){
        nuevaTarea.id = task.length + 1
        task.push(nuevaTarea)
        res.send("Nueva tarea agregada con exito!")
    }else{
        res.status(400).json("Datos incorrectos")
    }}
    catch(error){
        res.status(404).json({
            error: 'No es posible continuar con la peticion revise todos los datos!'})
    }

}

const tareaPut = (req,res) => {
    const idRequest = Number(req.body.id);
    const result = task.findIndex((registro) => registro.id == idRequest);
    if(result >= 0){
        task[result].titulo = req.body.titulo;
        task[result].completado = req.body.completado;
        res.status(200).json("modificado con Exito");
    }else{
        res.status(404).json({
            error: "No se pudo updatear por algun error revise su codigo",
            pista: `los ids van hasta el ${task.length}`,
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
            error: "No se ha encontrado un registro con ese id",
            pista: `los ids van hasta el ${task.length}`,
        })
    }
}

module.exports = {allTask, agregarTarea, tareaPut, tareaPutid}