import Express from "express";
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD, getBD } from "./db/db.js";
import rutasUsuario from "./Views/usuarios/rutas.js";
import rutasVendedor from "./views/vendedores/rutas.js";
import rutasVentas from "./views/ventas/rutas.js";

// configuracion de express

dotenv.config({ path: './.env' });

const app = Express();
app.use(Express.json());
app.use(Cors());
app.use(rutasUsuario);
app.use(rutasVendedor);
app.use(rutasVentas);
app.use(rutasVentas);

const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`escuchando puerto ${process.env.PORT}`);
    });
};

conectarBD(main);
