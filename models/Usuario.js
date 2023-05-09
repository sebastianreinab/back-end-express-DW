const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: rue
    }
},{
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

UsuarioSchema.virtual('tareas', {
    ref: 'Task',
    localFiel: '_id',
    foreignFiel: 'user',
    justOne: false,
})

module.exports = model('Usuario', UsuarioSchema)