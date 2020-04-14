// Verificar token correcto
const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {

    // Podemos obtener los headers de la petición de la siguiente forma:
    let receiveToken = req.get('Authorization');

    jwt.verify(receiveToken,
        process.env.SEMILLA_TOKEN,
        (err, decoded) => {
            if (err)
                return res.status(401).json({
                    ok: false,
                    err: { message: 'Token no válido' }
                });

            // Si todo ha ido bien, el decoded contendrá el payload del token. 
            // En el payload se está insertando el usuario de bbdd en la función jwt.sign() llamada en loginController.
            req.usuario = decoded.usuario;
            //res.json({ token: receiveToken }); --> esto retornaría el token recibido pero NO seguiría ejecutando nada más.
            //                                      para que se siga ejecutando la lógica del GET de usuario ponemos el next().
            next();
        } // fin función flecha
    ); // fin jwt.verify

};

module.exports = { verificaToken };