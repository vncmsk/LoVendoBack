import { ObjectId } from "mongodb";
import { getBD } from "../../db/db.js";

// Controller GET todos los vendedores
const queryAllvendedores = async (callback) => {
    const conexion = getBD();
    await conexion.collection('vendedor').find({}).limit(50).toArray(callback);
};

// Controller GET con filtro 
const consultarVendedores = async (id, callback) => {
    const conexion = getBD();
    await conexion.collection('vendedor').findOne({_id: new ObjectId(id)}, callback);
};

// Controller POST
const crearVendedores = async (datosVendedor, callback) => {
    if (
        Object.keys(datosVendedor).includes('name') &&
        Object.keys(datosVendedor).includes('ID') &&
        Object.keys(datosVendedor).includes('city')
    ) {
        const conexion = getBD();
        await conexion.collection('vendedor').insertOne(datosVendedor, callback);
    } else {
        return 'error';
    }
};

// Controller PATCH
const editarVendedores = async (id, edicion, callback) => {
    const parametroFiltro = { _id: new ObjectId(id) }
    const operacion = {
        $set: edicion,
    };
    const conexion = getBD();
    await conexion.collection('vendedor')
        .findOneAndUpdate(parametroFiltro, operacion, { upsert: true, returnOriginal: true }, callback);
};

// Controller DELETE
const eliminarVendedores = async (id, callback) => {
    const parametroFiltro = { _id: new ObjectId(id) }
    const conexion = getBD();
    await conexion.collection('vendedor').deleteOne(parametroFiltro, callback);
};

export { queryAllvendedores, crearVendedores, editarVendedores, eliminarVendedores, consultarVendedores };