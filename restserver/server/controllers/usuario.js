const express = require('express');
const app = express();



app.get('/usuario', function(req, res) {
    res.json('get a usuario');
});
app.post('/usuario', function(req, res) {
    let body = req.body; // Este body está disponible gracias al paquete body-parser instalado.

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


module.exports = app; // Ponemos como disponible 'app'