//Referencias de HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');


const socket = io();

// on: escuchando desde server
socket.on('connect', () =>{
    //console.log('Conectado');

    lblOffline.style.display = 'none';
    lblOnline.style.display  = '';
});

// on: escuchando desde server
socket.on('disconnect', () =>{
    //console.log('Desconectado');

    lblOnline.style.display  = 'none';
    lblOffline.style.display = '';
});

btnEnviar.addEventListener('click', () =>{
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    };
    // emit: emitir mensaje a servidor (desde cliente 1)
    socket.emit('enviar-mensaje', payload, function(id){
        console.log("Respuesta: ", id); // Respuesta solo la recibe el cliente que envio el mensaje
    });
});

// escuchar evento desde server (desde cliente 2)
socket.on('enviar-mensaje', (payload) =>{
    console.log('Desde el server', payload);
});