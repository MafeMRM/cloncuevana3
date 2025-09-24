const mongoose = require('mongoose');

const generoSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'nombre es requerido!'],
            trim: true,
            minLength: [5, 'nombre tiene que tener minimo 5 caracteres!'],
            lowercase: true,
        },
        estado: {
            type: Boolean,
            required: [true, 'En que estado esta el genero!'],
            trim: true,
        },
        fechaCreacion: {
            type: String,
            trim: true,
        },
        fechaActualizacion: {
            type: String,
            trim: true,
        },
        descripcion: {
            type: String,
            required: [true, 'Se necesita una descripcion del genero!'],
            trim: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Genero', generoSchema);