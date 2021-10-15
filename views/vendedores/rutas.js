import Express from "express";
import { queryAllvendedores, crearVendedores, editarVendedores, eliminarVendedores, consultarVendedores } from "../../controllers/vendedores/controller.js";

const rutasVendedor = Express.Router();


// creacion funcion callback generica
const genericCallback = (res) => (err, result) => {
    if (err) {
        res.status(500).send('Error en la consulta');
    } else {
        res.json(result);
    }
};

// SOLICITUD GET (READ) - Debemos poner la ruta correcta
rutasVendedor.route('/vendedores').get((req, res) => {
    console.log('alguien hizo get en la ruta /vendedores');
    queryAllvendedores(genericCallback(res));
});

// SOLICITUD GET CON FILTRO (READ) - Debemos poner la ruta correcta
rutasVendedor.route('/vendedores/:id').get((req, res) => {
    console.log('alguien hizo get en la ruta /vendedores');
    consultarVendedores(req.params.id, genericCallback(res));
});

// SOLICITUD POST (CREATE) - Debo poner la ruta correcta
rutasVendedor.route('/vendedores').post((req, res) => {
    crearVendedores(req.body, genericCallback(res));
});

// SOLICITUD PATCH (UPDATE) - Debo poner la ruta correcta
rutasVendedor.route('/vendedores/:id').patch((req, res) => {
    editarVendedores(req.params.id, req.body, genericCallback(res));
});

// SOLICITUD DELETE (DELETE) - Debo poner la ruta correcta
rutasVendedor.route('/vendedores/:id').delete((req, res) => {
    eliminarVendedores(req.params.id, genericCallback(res))
});

export default rutasVendedor;
