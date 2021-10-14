import Express from "express";
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD, getBD } from "./db/db.js";
import rutasUsuario from "./Views/usuarios/rutas.js";

// configuracion de express

dotenv.config({ path: './.env' });

const app = Express();
app.use(Express.json());
app.use(Cors());
app.use(rutasUsuario);

const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`escuchando puerto ${process.env.PORT}`);
    });
};

conectarBD(main);
