const express = require('express');
const socketIO = require('socket.io'); // npm i socket.io --save
const http = require('http'); // módulo que ya trae node por defecto.
const path = require('path');

const app = express();
let server = http.createServer(app); // montar el pequeño servidor web con la configuración del express.

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// IO, variable que tendrá la comunicación del backend
module.exports.io = socketIO(server); // io nos va a decir usuarios conectados, eventos, etc...
require('./sockets/socket');



// Inicializamos, no el express, sino el servidor http.
// Para comprobar si tenemos correctamente socket.io deberíamos poder ver la siguiente dirección:
// http://localhost:3000/socket.io/socket.io.js
server.listen(port, (err) => {
    if (err)
        throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});