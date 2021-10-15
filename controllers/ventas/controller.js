import { ObjectId } from "mongodb";
import { getBD } from "../../db/db.js";

// Controller GET todos los ventas
const queryAllventas = async (callback) => {
    const conexion = getBD();
    await conexion.collection('venta').find({}).limit(50).toArray(callback);
};

// Controller GET con filtro 
const consultarVentas = async (id, callback) => {
    const conexion = getBD();
    await conexion.collection('venta').findOne({_id: new ObjectId(id)}, callback);
};

// Controller POST
const crearVentas = async (datosVenta, callback) => {
    if (
        Object.keys(datosVenta).includes('name') &&
        Object.keys(datosVenta).includes('ID') &&
        Object.keys(datosVenta).includes('city')
    ) {
        const conexion = getBD();
        await conexion.collection('venta').insertOne(datosVenta, callback);
    } else {
        return 'error';
    }
};

// Controller PATCH
const editarVentas = async (id, edicion, callback) => {
    const parametroFiltro = { _id: new ObjectId(id) }
    const operacion = {
        $set: edicion,
    };
    const conexion = getBD();
    await conexion.collection('venta')
        .findOneAndUpdate(parametroFiltro, operacion, { upsert: true, returnOriginal: true }, callback);
};

// Controller DELETE
const eliminarVentas = async (id, callback) => {
    const parametroFiltro = { _id: new ObjectId(id) }
    const conexion = getBD();
    await conexion.collection('venta').deleteOne(parametroFiltro, callback);
};

export { queryAllventas, crearVentas, editarVentas, eliminarVentas, consultarVentas };