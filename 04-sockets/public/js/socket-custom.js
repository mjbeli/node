var socket = io(); // no todos los navegadores soportan el let.

// Función que se dispara cuando estamos conectados al servidor.
socket.on('connect', function() {
    console.log('Conectado al servidor.');
});

// Evento de desconexión
socket.on('disconnect', function() {
    console.log('Conexión con servidor perdida.');
});

// Emitir mensaje desde el cliente para que el servidor escuche.
socket.emit('enviarMensaje', {
        usuario: 'user278', // Objeto que se va a enviar al server
        mensaje: 'HolaMundo'
    },
    function(msg) { // Esta función sirve para recibir info del server sobre el envío del mensaje.
        console.log('Feedback del server sobre el procesado del mensaje:', msg);
    }
);

// Recibir/escuchar info que envía el server.
socket.on('enviarMensaje', function(objServer) {
    console.log('Info recibida desde el servidor: ', objServer);
});