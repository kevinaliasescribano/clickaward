'use strict';

//File: model/sala.js
module.exports = function(mongoose) {
	var salaSchema = mongoose.Schema({
		nombre: 			{type: String, required: true, unique: true},
		descripcion: 		{type: String, required: true},
		objetivoClicks: 	{type: Number, required: true},
		clicksActuales: 	{type: Number, required: true},
		fechaCreacion: 		{type: Date,  default: Date.now, required: true},
		estado: 			{type: String, required: true},
		importancia: 		{type: Number, required: true},
		imagen: 			{type: String, required: true}
	});
	return mongoose.model('Sala', salaSchema);


};