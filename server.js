
import Express from "express";
import { MongoClient } from 'mongodb';
import Cors from 'cors';

const stringConexion =
    "mongodb+srv://arincon:admin@proyecto.ip08e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(stringConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let conexion;
const app = Express();
app.use(Express.json());
app.use(Cors());


// SOLICITUD GET - Debo poner la ruta correcta

app.get('/usuarios', (req, res) => {
    console.log('alguien hizo get en la ruta /usuarios');

    conexion.collection('usuario').find({}).limit(50).toArray((err, result) => {
        if (err) {
            res.status(500).send('Error en la consulta');
        } else {
            res.json(result);
        }
    });
});


// SOLICITUD POST - Debo poner la ruta correcta

app.post('/usuarios/nuevo', (req, res) => {
    console.log(req);
    const datosUser = req.body;
    console.log('llaves: ', Object.keys(datosUser));
    try {
        if (
            Object.keys(datosUser).includes('name') &&
            Object.keys(datosUser).includes('ID') &&
            Object.keys(datosUser).includes('city')
        ) {
            conexion.collection('usuario').insertOne(datosUser, (err, result) => {
                if (err) {
                    console.error(err)
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    res.sendStatus(200);
                }
            });
        } else {
            res.sendStatus(500);
        }
    } catch {
        res.sendStatus(500);
    }
});


// Conexion a base de datos
const main = () => {

    client.connect((err, db) => {
        if (err) {
            console.error('error conectando a la base de datos')
            return false
        }
        conexion = db.db('listadoUsuarios');
        console.log('Conexion exitosa');
        return app.listen(5000, () => {
            console.log('escuchando puerto 5000');
        });
    });
};

main();


