import { ObjectId } from "mongodb";
import { getBD } from "../../db/db.js";

// Controller GET
const queryAllusuarios = async (callback) => {
    const conexion = getBD();
    await conexion.collection('usuario').find({}).limit(50).toArray(callback);
};

// Controller POST
const crearUsuarios = async (datosUser, callback) => {
    if (
        Object.keys(datosUser).includes('name') &&
        Object.keys(datosUser).includes('ID') &&
        Object.keys(datosUser).includes('city')
    ) {
        const conexion = getBD();
        await conexion.collection('usuario').insertOne(datosUser, callback);
    } else {
        return 'error';
    }
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

export { queryAllusuarios, crearUsuarios, editarUsuarios, eliminarUsuarios };