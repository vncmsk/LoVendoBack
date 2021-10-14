import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const stringConexion = process.env.DATABASE_URL;

const client = new MongoClient(stringConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// Conexion a base de datos

let conexion;

const conectarBD = (callback) => {
    client.connect((err, db) => {
        if (err) {
            console.error('error conectando a la base de datos')
            return 'error';
        }
        conexion = db.db('listadoUsuarios');
        console.log('Conexion a la BD exitosa');
        return callback();
    });
};

const getBD = () => {
    return conexion;
}

export { conectarBD, getBD };