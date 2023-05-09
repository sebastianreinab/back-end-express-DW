const usuarios = [];

const socketController = (socket, io) => {

    usuarios.push( socket.id )
    io.emit('usuarios-activos', usuarios)
    
    console.log('cliente conectado', socket.id);

    socket.on('disconecct', ()=> {

        usuarios.splice( usuarios.indexOf(socket.id) );

        console.log('Clinete Desconectado', socket.id);
    })

    socket.on('mensaje-de-cliete', (payload, callback) => {
        
        callback('Tu mensaje fue recibido!!')

        payload.from = 'desde el server'
        socket.broadcast.emit('mensaje-de-server', payload);
    })

    ocket.on('enviar-mensaje', ({to, from, mensaje}) => {
        if(to)
            socket.to(to).emit('recibir-mensaje', {to, from, mensaje});
        else
            io.emit('recibir-mensaje', {from, mensaje});
    })
}

module.exports = { socketControllertC }