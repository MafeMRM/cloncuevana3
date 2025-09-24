const mongoose = require('mongoose');

const tipoSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Se necesita el nombre del tipo!'],
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
            required: [true, 'Se necesita una descripcion del tipo!'],
            trim: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Tipo',tipoSchema);