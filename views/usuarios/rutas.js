import Express from "express";
import { queryAllusuarios, crearUsuarios, editarUsuarios, eliminarUsuarios, 
    consultarUsuarios, consultarCrearUsuario } from "../../controllers/usuarios/controller.js";

const rutasUsuario = Express.Router();

// creacion funcion callback generica
const genericCallback = (res) => (err, result) => {
    if (err) {
        res.status(500).send('Error en la consulta');
    } else {
        res.json(result);
    }
};

// SOLICITUD GET (READ) - Debemos poner la ruta correcta
rutasUsuario.route('/usuarios').get((req, res) => {
    console.log('alguien hizo get en la ruta /usuarios');
    queryAllusuarios(genericCallback(res));
});

// SOLICITUD POST (CREATE) - Debo poner la ruta correcta
rutasUsuario.route('/usuarios').post((req, res) => {
    crearUsuarios(req.body, genericCallback(res));
});

// SOLICITUD GET CON CONSULTA EN LA BD
rutasUsuario.route('/usuarios/self').get((req, res) => {
    console.log('alguien hizo get en la ruta /self');
    consultarCrearUsuario(req, genericCallback(res));
});

// SOLICITUD GET CON FILTRO (READ) - Debemos poner la ruta correcta
rutasUsuario.route('/usuarios/:id').get((req, res) => {
    console.log('alguien hizo get en la ruta /usuarios');
    consultarUsuarios(req.params.id, genericCallback(res));
});

// SOLICITUD PATCH (UPDATE) - Debo poner la ruta correcta
rutasUsuario.route('/usuarios/:id').patch((req, res) => {
    editarUsuarios(req.params.id, req.body, genericCallback(res));
});

// SOLICITUD DELETE (DELETE) - Debo poner la ruta correcta
rutasUsuario.route('/usuarios/:id').delete((req, res) => {
    eliminarUsuarios(req.params.id, genericCallback(res))
});

export default rutasUsuario;
