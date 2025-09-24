const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Titulo es requerido!'],
			trim: true,
		},
		URL: {
			type: String,
			required: [true, 'La URL es requerida!'],
			trim: true,
		},
		directorId: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Director',
			required: [true, 'El director es requerido!'],
			trim: true,
		},
		estreno : {
			type: Date,
			required: [true, 'La fecha de estreno es requerida!'],
			trim: true,
		},
		generoId: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Genero',
			required: [true, 'El genero es requerido!'],
			trim: true,
		},
		productoraId:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Productora',
			required: [true, 'El productora es requerido!'],
			trim: true,
		},
		sinopsis: {
			type: String,
			required: [true, 'La sinopsis es requerida!'],
			trim: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
