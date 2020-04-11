const express = require('express');
const Usuario = require('../models/usuario'); // No es necesaria la mayúscula pero es un estandard.
const bcrypt = require('bcrypt');


const app = express();

app.get('/usuario', function(req, res) {
    res.json('get a usuario');
});


app.post('/usuario', function(req, res) {
    let body = req.body; // Este body está disponible gracias al paquete body-parser instalado.

    // Crear nueva instancia del esquema Usuario.
    let usuarioObj = new Usuario({
        nombre: body.nombre, // El nombre de los parámetros del body es case sensitive!
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), // encriptar la pass con bcrypt de forma asíncrona
        role: body.role
    });

    usuarioObj.save(
        (err, usuarioDB) => {
            if (err) // Si al salvar ocurre un error.
                return res.status(400).json({ ok: false, err }); //Enviando respuesta con un código http determinado.

            // No es necesario poner explícitamente el estatus 200.
            res.json({ ok: true, usuario: usuarioDB }); // Se llamará el método sobrescrito de /models/usuario.js ToJSON
        }
    );

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


module.exports = app; // Ponemos como disponible 'app'