const express = require('express');
require('dotenv').config();
const { dbConnection } = require('../database/config')
const cors = require('cors');

class Server{
    constructor() {

        this.headers = {
            cors: {
                origin: 'http://',
                method: ["GET", "POST"]
            }
        }

        //Crear Express App
        this.app = express();
        this.port = process.env.PORT;
        this.io = require('socket.io')(this.server, this.headers)
        this.server = require('http').createServer(this.app)

        this.paths = {
            auth: '/api/auth',
            task: '/api/task'
        }

        this.connectToDB();
        this.addMiddlewares();
        this.setRoutes();

        //Sockets
        this.sockets()
    }

    async connectToDB() {
        await dbConnection();
    }

    addMiddlewares() {
        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Publicar folder
        this.app.use( express.static('public') );
    }

    setRoutes() {
        //Rutas
        this.app.use( this.paths.auth, require('../routes/auth') )
        this.app.use( this.paths.task, require('../routes/task') )
    }

    sockets() {
        this.io('connection', socket => {
            console.log('Cliente conectado', socket.id);

            socket.on('mensaje-de-cliente', ( payload, callback) => {
                console.log( payload );

                callback('tu mensaje fue recibido!!');

                payload.from = 'desde el server'
                this.io.emit('mensaje-de-server', payload);
            })

            socket.on('disconnect', ()=> {
                console.log('Cliente Desconectado');
            })
        })
    }

    listen() {
        //Escuchar en el puerto 4000
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', process.env.PORT)
        })
    }
}

module.exports = Server;