const express = require('express');
const app = express(); // Inicializando express 


app.use(require('./usuarioController')); // Importamos y usamos el fichero /controllers/usuario.js
app.use(require('./loginController'));

module.exports = app;