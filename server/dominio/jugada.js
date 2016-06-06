'use strict';

//File: model/jugada.js
module.exports = function(mongoose) {
	var jugadaSchema = mongoose.Schema({
		sala: 				{type: String, required: true},
		jugador: 			{type: String, required: true},
		fechaJugada: 		{type: Date,  default: Date.now, required: true},
		numeroClicks: 		{type: Number, required: true}
	});
	return mongoose.model('Jugada', jugadaSchema);


};