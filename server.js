import Express from "express";
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD, getBD } from "./db/db.js";
import rutasUsuario from "./Views/usuarios/rutas.js";
import rutasProductos from "./views/productos/rutas.js";
import rutasVentas from "./views/ventas/rutas.js";
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import autorizacionUsuario from './Middleware/Middleware.js';

// configuracion de express

dotenv.config({ path: './.env' });

const port = process.env.PORT || 5000;

const app = Express();
app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://lovendo.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://lovendo.us.auth0.com/api/v2/',
  issuer: 'https://lovendo.us.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);
app.use(autorizacionUsuario);
app.use(rutasUsuario);
app.use(rutasProductos);
app.use(rutasVentas);

const main = () => {
    return app.listen(port, () => {
        console.log(`escuchando puerto ${port}`);
    });
};

conectarBD(main);
