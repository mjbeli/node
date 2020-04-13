const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario'); // No es necesaria la mayúscula pero es un estandard.
const jwt = require('jsonwebtoken'); // "npm i jsonwebtoken --save"

const app = express();

// Info de cómo funcionan los tokens y partes de las que se componen (p.e. qué es el payload)
// https://jwt.io/

app.post('/login', function(req, res) {

    let body = req.body;

    Usuario.findOne({ email: body.email }, // Condición que el email del usuario de BBDD sea igual al email que venga en la request.
        (err, dbUser) => {
            if (err)
                return res.status(500).json({ ok: false, err });

            if (!dbUser) // Si el email no existe en la bbdd el dbUser será nulo
                return res.status(400).json({ ok: false, err: { msg: 'Usuario o pass incorrecto' } });

            // Esta función encripta el primer parámetro y lo comparar con el segundo parámetro.
            // Devuelve true si son iguales. En este caso concreto se encripta el parámetro recibido
            // y lo compara con el guardado en la bbdd.
            if (!bcrypt.compareSync(body.password, dbUser.password))
                return res.status(400).json({ ok: false, err: { msg: 'Usuario o pass no es correcto' } });

            // Todo ha ido bien,  generar y devolver token. Doc: https://www.npmjs.com/package/jsonwebtoken
            let generatedToken = jwt.sign({ usuario: dbUser }, // primer parámetro: obj que será el payload del token
                process.env.SEMILLA_TOKEN, // segundo parámetro: la semilla para generar el token
                { expiresIn: process.env.EXPIRACION_TOKEN } // tercer parámetro: caducidad token (en config/config.js)
            );

            res.json({
                ok: true,
                usuario: dbUser,
                token: generatedToken
            });
        }); // fin findOne

}); // fin app.post

module.exports = app;