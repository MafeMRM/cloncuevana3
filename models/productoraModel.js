const mongoose = require('mongoose');

const productoraSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'El Nombre de la productora es requerido!'],
            trim: true,
        },
        estado: {
            type: Boolean,
            required: [true, 'En que estado esta el productora!'],
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
        slogan: {
            type: String,
            required: [true, 'El slogan de la productora es requerido!'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'descripcion es requerida!'],
            trim: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Productora', productoraSchema);