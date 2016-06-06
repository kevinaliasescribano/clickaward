'use strict';

//File: model/usuario.js
module.exports = function(mongoose) {
	var usuarioSchema = mongoose.Schema({
		alias			:{ type: String, required: true, unique: true },
		email			:{ type: String, required: true, unique: true },
		contrasenya		:{ type: String, required: true },
		icono			:{ type: String, required: false },
		fechaNacimiento	:{ type: Date,  required: true },
		fechaRegistro 	:{ type: Date,  default: Date.now },
		urlActivacion	:{ type: String, required: true },
		cuentaActiva	:{ type: Boolean, default: false }
	});
	return mongoose.model('Usuario', usuarioSchema);


};