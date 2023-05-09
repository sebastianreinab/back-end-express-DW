const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config')
const cors = require('cors')


//Crear Express App
const app = express();

//Base de datos
dbConnection();

//CORS
app.use( cors())

//Variables de entorno
app.use( express.static('public'))

//Lectura y parseo del body
app.use( express.json() );

//Rutas

/*app.get('/', (req, res) => {
    res.json({
        ok: true
    })
})
*/
app.use('/api/auth', require('./routes/auth'))
app.use('/api/task', require('./routes/task'))

const Server = require('./Server/Server')

const myServer = new Server();
myServer.listen();


//Escuchar en puerto 4000
app.listen(4000, () => {
    console.log('Servidor corriendo en puerto ', process.env.PORT)
})

