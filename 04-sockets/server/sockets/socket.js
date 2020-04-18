//Importar la variable io del server que tiene la configuración del socket.
const { io } = require('../server');

// Detectar conexiones desde el front.
io.on('connection',
    (client) => { // client tiene información sobre el cliente que se ha conectado al servidor.
        console.log('Usuario conectado');

        // Cuando el mismo cliente se desconectó.
        client.on('disconnect', () => {
            console.log('Usuario desconectado.');
        });

        // Escuchar el cliente
        client.on('enviarMensaje', (objMsg, callback) => {
            console.log(objMsg);
            if (objMsg.usuario)
                callback({ mensaje: 'Todo fue bien.' });
            else
                callback({ mensaje: 'Algo fue mal!!!.' });

            // Si aquí dentro hacemos un client.emit, se enviará un evento por defecto solo al
            // usuario que ha enviado el evento 'enviarMensaje'
            // Si queremos enviar a todos los usuarios conectados, podemos usar client.broadcast.emit(.....);

        });

        // Emitir al cliente
        client.emit('enviarMensaje', { // Objeto que se envía al cliente.
            usuario: 'Administrador',
            mensaje: 'Bienvenido'
        });

    });