import { ObjectId } from "mongodb";
import { getBD } from '../db/db.js';
import jwt_decode from 'jwt-decode';

const autorizacionUsuario = async (req, res, next) => {

  //1. obtener usuario desde el token
  const token = req.headers.authorization.split('Bearer ')[1];
  const user = jwt_decode(token)['http://localhost/userData'];
  console.log(user);

  //2. consultar usuario en BD 
  const conexion = getBD();
  await conexion.collection('usuario').findOne({ email: user.email }, async (err, response) => {
    if (response) {
      console.log(response);

      //3. verificar estado de usuario
      if (response.estado === 'rechazado') {

        //4. si el usuario esta rechazado, devolver error de autenticacion
        res.sendstatus(401);
        res.end();

        //5. si el usuario esta pdte o aprobado, ejecutar next
      } else {
        console.log('habilitado');
        next();      
      }
    }else{
      next();
    }
  });
};

export default autorizacionUsuario;
