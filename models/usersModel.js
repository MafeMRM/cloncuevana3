const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, 'Email es requerida!'],
			trim: true,
			unique: [true, 'El email debe ser unico!'],
			minLength: [5, 'El email debe tener minimo 5 caracteres!'],
			lowercase: true,
		},
		password: {
			type: String,
			required: [true, 'Contrasena es requerida!'],
			trim: true,
			select: false,
		},
		verified: {
			type: Boolean,
			default: false,
		}
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);
