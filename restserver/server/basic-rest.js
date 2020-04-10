require('./config/config'); // Primero de todo cargamos el fichero de configuración.

const express = require('express'); // 'npm i express --save' para instalar el paquete express 
const app = express();
const bodyParser = require('body-parser'); // 'npm i body-parser --save' para instalar el paquete bodyparser


// Los 'use' se ejecutarán cada vez que llegue una petición.
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json


// petición GET a localhost:3000/server
app.get('/server', function(req, res) {
    //res.send('Hello World') --> envía en formato html
    res.json('Hola mundo'); // --> envía en formato json
});


app.get('/usuario', function(req, res) {
    res.json('get a usuario');
});
app.post('/usuario', function(req, res) {
    let body = req.body;

    if (body.nombre === undefined) // El nombre de los parámetros es case sensitive!
        res.status(400).json({ ok: false, mensaje: 'El nombre es obligatorio' }); //Enviando respuesta con un código determinado.
    else
        res.json({ persona: body });
});
// Recepción de parámetro por URL
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        msg: 'put a usuario',
        id // No es necesario mapear 'id'
    });
});
app.delete('/usuario', function(req, res) {
    res.json('delete a usuario');
});


app.listen(process.env.PORT, // Se lee variable del fichero config/config.js
    () => { console.log(`Escuchando por el puerto ${process.env.PORT}`); });