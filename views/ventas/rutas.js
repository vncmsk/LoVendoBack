import Express from "express";
import { queryAllventas, crearVentas, editarVentas, eliminarVentas, consultarVentas } from "../../controllers/ventas/controller.js";

const rutasVentas = Express.Router();


// creacion funcion callback generica
const genericCallback = (res) => (err, result) => {
    if (err) {
        res.status(500).send('Error en la consulta');
    } else {
        res.json(result);
    }
};

// SOLICITUD GET (READ) - Debemos poner la ruta correcta
rutasVentas.route('/ventas').get((req, res) => {
    console.log('alguien hizo get en la ruta /ventas');
    queryAllventas(genericCallback(res));
});

// SOLICITUD GET CON FILTRO (READ) - Debemos poner la ruta correcta
rutasVentas.route('/ventas/:id').get((req, res) => {
    console.log('alguien hizo get en la ruta /ventas');
    consultarVentas(req.params.id, genericCallback(res));
});

// SOLICITUD POST (CREATE) - Debo poner la ruta correcta
rutasVentas.route('/ventas').post((req, res) => {
    crearVentas(req.body, genericCallback(res));
});

// SOLICITUD PATCH (UPDATE) - Debo poner la ruta correcta
rutasVentas.route('/ventas/:id').patch((req, res) => {
    editarVentas(req.params.id, req.body, genericCallback(res));
});

// SOLICITUD DELETE (DELETE) - Debo poner la ruta correcta
rutasVentas.route('/ventas/:id').delete((req, res) => {
    eliminarVentas(req.params.id, genericCallback(res))
});

export default rutasVentas;
