const mongoose = require('mongoose');

const directorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Se necesita el nombre del director!'],
            trim: true,
        },
        estado: {
            type: Boolean,
            required: [true, 'En que estado esta el director!'],
            trim: true,
        },
        fechaCreacion: {
            type: String,
            default: new Date(),
            trim: true,
        },
        fechaActualizacion: {
            type: String,
            trim: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Director', directorSchema);