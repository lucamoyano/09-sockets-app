
const socketController = (socket) => {

    console.log('Cliente conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    })

    // on: escuchando enviar-mensaje desde socket-client (desde cliente 1)
    socket.on('enviar-mensaje', (payload, callback) => {
        if (!callback) return;
        // Ejemplo, luego de grabar recibir el callback con el objeto grabador
        // Solo en el cliente que lo grabó
        else {
            const id = 123456;
            callback(id);
        }

        // emitir a cliente desde el server (para cliente 2)
        // broadcast: enviar mensaje a todos los clientes, menos al que envio el mensaje
        // utilizando solo socket.emit . se lo envia unicamente al cliente que envio el mensaje
        socket.broadcast.emit('enviar-mensaje', payload);
    })
}

module.exports = {
    socketController
}