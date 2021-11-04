import { ObjectId } from "mongodb";
import { getBD } from "../../db/db.js";

// Controller GET todos los vendedores
const queryAllProductos = async (callback) => {
    const conexion = getBD();
    await conexion.collection('productos').find({}).limit(50).toArray(callback);
};

// Controller GET con filtro 
const consultarProductos = async (id, callback) => {
    const conexion = getBD();
    await conexion.collection('productos').findOne({_id: new ObjectId(id)}, callback);
};

// Controller POST
const crearProductos = async (datosProductos, callback) => {
    if (
        Object.keys(datosProductos).includes('Fecha') &&
        Object.keys(datosProductos).includes('Item') &&
        Object.keys(datosProductos).includes('Cantidad') &&
        Object.keys(datosProductos).includes('VrUnit')
    ) {
        const conexion = getBD();
        await conexion.collection('productos').insertOne(datosProductos, callback);
    } else {
        return 'error';
    }
};

// Controller PATCH
const editarProductos = async (id, edicion, callback) => {
    const parametroFiltro = { _id: new ObjectId(id) }
    const operacion = {
        $set: edicion,
    };
    const conexion = getBD();
    await conexion.collection('productos')
        .findOneAndUpdate(parametroFiltro, operacion, { upsert: true, returnOriginal: true }, callback);
};

// Controller DELETE
const eliminarProductos = async (id, callback) => {
    const parametroFiltro = { _id: new ObjectId(id) }
    const conexion = getBD();
    await conexion.collection('productos').deleteOne(parametroFiltro, callback);
};

export { queryAllProductos, crearProductos, editarProductos, eliminarProductos, consultarProductos };