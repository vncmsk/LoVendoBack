
import Express from "express";

const app = Express();
app.use(Express.json());


// SOLICITUD GET - Debo poner la ruta correcta

app.get('/usuarios', (req, res) => {
    console.log('alguien hizo get en la ruta /usuarios');

    // Esto se reemplaza por la consulta a la base de datos.  
    const usuarios = [
        { nombre: 'juana', id: '123456789', ciudad: 'Bogotá' },
        { nombre: 'juana', id: '123456789', ciudad: 'Bogotá' },
        { nombre: 'juana', id: '123456789', ciudad: 'Bogotá' }
    ];
    res.send(usuarios);
});


// SOLICITUD POST - Debo poner la ruta correcta

app.post('/usuarios/nuevo', (req, res) => {
    // Esto se modifica por el codigo para crear en la base de datos.
    const datosUser = req.body;
    console.log('keys: ', object.keys(datosUser));
    try {
        if (
            object.keys(datosUser).includes('name') &&
            object.keys(datosUser).includes('ID') &&
            object.keys(datosUser).includes('city')
        ) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    } catch {
        res.sendStatus(500);
    }
});

app.listen(5000, () => {
    console.log('escuchando puerto 5000');
});


