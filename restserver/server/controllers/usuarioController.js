const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore'); // https://underscorejs.org/
const Usuario = require('../models/usuario'); // No es necesaria la mayúscula pero es un estandard.

const app = express();

// Petición: /usuario?desde=10&limite=5
app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0; // Si petición no tiene parámetro, por defecto 0.
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario
        .find({}, 'nombre email') // Primer parámetro son las condiciones de búsqueda, segundo parámetro los campos que se van a devolver.
        .skip(desde) // se salta los primeros N registros
        .limit(limite) // muestra solo los primeros N registros de la búsqueda.
        .exec((err, usuarios) => {
            if (err)
                return res.status(400).json({ ok: false, err });

            res.json({ ok: true, usuarios });

        });

    // Para contar resultados.
    Usuario.count({}, // Misma condición que en el find
        (err, conteo) => {});
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

// Actualizar registro: requiere recepción de parámetro por URL
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;

    let body = _.pick(req.body, // El body está disponible gracias al paquete body-parser instalado.
        ['nombre', 'email', 'img', 'role', 'estado']); // Listado de campos que sí se pueden actualizar.

    // Alternativa a usar el pick de underscore: 
    // quitamos explícitamente los campos que nos queremos actualizar.
    // delete body.google; 
    // delete body.password; 

    // Doc: https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
    Usuario.findByIdAndUpdate(id, body, // objeto que queremos actualizar, directamente el body
        {
            new: true, // enviar respuesta con el objeto actualizado en lugar del original.
            runValidators: true
        }, // aplicar validaciones definidas en el esquema (por ejemplo roles definidos)
        (err, usuarioDB) => {

            if (err)
                return res.status(400).json({ ok: false, err });

            res.json({
                ok: true,
                id, // No es necesario mapear 'id'
                usuario: usuarioDB
            });
        });


});

app.delete('/usuario', function(req, res) {
    res.json('delete a usuario');
});


module.exports = app; // Ponemos como disponible 'app'