import Express from "express";
import { queryAllProductos, crearProductos, editarProductos, eliminarProductos, consultarProductos } from "../../controllers/productos/controller.js";

const rutasProductos = Express.Router();


// creacion funcion callback generica
const genericCallback = (res) => (err, result) => {
    if (err) {
        res.status(500).send('Error en la consulta');
    } else {
        res.json(result);
    }
};

// SOLICITUD GET (READ) - Debemos poner la ruta correcta
rutasProductos.route('/productos').get((req, res) => {
    console.log('alguien hizo get en la ruta /productos');
    queryAllProductos(genericCallback(res));
});

// SOLICITUD GET CON FILTRO (READ) - Debemos poner la ruta correcta
rutasProductos.route('/productos/:id').get((req, res) => {
    console.log('alguien hizo get en la ruta /productos');
    consultarProductos(req.params.id, genericCallback(res));
});

// SOLICITUD POST (CREATE) - Debo poner la ruta correcta
rutasProductos.route('/productos').post((req, res) => {
    crearProductos(req.body, genericCallback(res));
});

// SOLICITUD PATCH (UPDATE) - Debo poner la ruta correcta
rutasProductos.route('/productos/:id').patch((req, res) => {
    editarProductos(req.params.id, req.body, genericCallback(res));
});

// SOLICITUD DELETE (DELETE) - Debo poner la ruta correcta
rutasProductos.route('/productos/:id').delete((req, res) => {
    eliminarProductos(req.params.id, genericCallback(res))
});

export default rutasProductos;
