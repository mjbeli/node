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
/*
app.get('/server', function(req, res) {
    //res.send('Hello World') --> envía en formato html
    res.json('Hola mundo'); // --> envía en formato json
});
*/

// Importamos y usamos todas las rutas definidas en el loaderControllers,
// aquí se podrían registrar todas las rutas pero para dejar el server.js lo más
// liviano posible lo sacamos a otro fichero que unificará todas las rutas.
app.use(require('./controllers/loaderControllers'));

mongoose.connect(process.env.URLDB, {
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