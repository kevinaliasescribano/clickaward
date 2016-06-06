'use strict';

//File: model/estadistica.js
module.exports = function(mongoose) {
	var estadisticaSchema = mongoose.Schema({
		sala: 				{type: String, required: true, unique: true},
		usuario: 			{type: String, required: true},
		tipoPremio: 		{type: Number, required: true}
	});
	return mongoose.model('Estadistica', estadisticaSchema);


};