import { ObjectId } from "mongodb";
import { getBD } from "../../db/db.js";
import jwt_decode from 'jwt-decode';

// Controller GET todos los usuarios
const queryAllusuarios = async (callback) => {
    const conexion = getBD();
    await conexion.collection('usuario').find({}).limit(50).toArray(callback);
};

// Controller GET consultando la BD
const consultarCrearUsuario = async (req, callback) => {
    // 1. consultar datos del usuario desde el token
    const token = req.headers.authorization.split('Bearer ')[1];
    const user = jwt_decode(token)['http://localhost/userData'];
    console.log(user);

    // 2. con el id o correo desde el token consultar si esta creado en la BD
    const conexion = getBD();
    await conexion.collection('usuario').findOne({ email: user.email }, async (err, response) => {
        console.log('response', response);
        
        // 3. si el usuario ya esta en la BD, obtener la info del usuario
        if (response) {
            callback(err, response);
        } else {

            // 4. si el usuario no esta en la BD, lo crea y obtiene la info del usuario
            user.auth0ID = user._id
            delete user._id
            user.rol = 'sin rol';
            user.estado = 'pendiente';
            await crearUsuarios(user, (err, respuesta) => {
                console.log('respuesta', respuesta);
            });
        }
    });
};

// Controller GET con filtro 
const consultarUsuarios = async (id, callback) => {
    const conexion = getBD();
    await conexion.collection('usuario').findOne({ _id: new ObjectId(id) }, callback);
};

// Controller POST
const crearUsuarios = async (datosUser, callback) => {
    const conexion = getBD();
    await conexion.collection('usuario').insertOne(datosUser, callback);
};

// Controller PATCH
const editarUsuarios = async (id, edicion, callback) => {
    const parametroFiltro = { _id: new ObjectId(id) }
    const operacion = {
        $set: edicion,
    };
    const conexion = getBD();
    await conexion.collection('usuario')
        .findOneAndUpdate(parametroFiltro, operacion, { upsert: true, returnOriginal: true }, callback);
};

// Controller DELETE
const eliminarUsuarios = async (id, callback) => {
    const parametroFiltro = { _id: new ObjectId(id) }
    const conexion = getBD();
    await conexion.collection('usuario').deleteOne(parametroFiltro, callback);
};

export { queryAllusuarios, crearUsuarios, editarUsuarios, eliminarUsuarios, consultarUsuarios, consultarCrearUsuario };