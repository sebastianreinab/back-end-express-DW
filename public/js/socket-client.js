const socket = io();

socket.on('connect', () => {
    console.log('Connected', socket.id);
})

const payload = {
    mensaje: 'Hellow Word',
    uid: 123,
    fecha: 'May 6, 2022'
}

socket.emit('mensaje-de-cliente', 
    payload,
    ( data )=>{
    console.log('Respuesta a tu mensaje', data);
})

socket.on('Mensaje-de-server', (payload) => {
    console.log(payload);
})

socket.on('disconnect', () => {
    console.log('Disconnected');
})