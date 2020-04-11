require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Inicializando express
const app = express();

// Los 'use' se ejecutarán cada vez que llegue una petición.
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json


// petición GET a localhost:3000/server
app.get('/server', function(req, res) {
    //res.send('Hello World') --> envía en formato html
    res.json('Hola mundo'); // --> envía en formato json
});

app.use(require('./controllers/usuarioController')); // Importamos y usamos el fichero /controllers/usuario.js


mongoose.connect('mongodb://localhost:27017/cafe', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err, resp) => {
        if (err)
            throw err;
        console.log('Conexión a bbdd con éxito');
    }
);

app.listen(process.env.PORT, // Se lee variable del fichero config/config.js
    () => { console.log(`Escuchando por el puerto ${process.env.PORT}`); });