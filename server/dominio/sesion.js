'use strict';

//File: model/sesion.js
module.exports = function(mongoose) {
	var sesionSchema = mongoose.Schema({
		idUsuario	:{ type: String, required: true, unique: true },
		hashUsuario	:{ type: String, required: true, unique: true },
		validez		:{ type: Date, required: true }
	});
	return mongoose.model('Sesion', sesionSchema);

};