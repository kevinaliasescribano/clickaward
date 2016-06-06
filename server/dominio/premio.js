'use strict';

//File: model/premio.js
module.exports = function(mongoose) {
	var premioSchema = mongoose.Schema({
		sala: 				{type: String, required: true},
		imagen: 			{type: String, required: true},
		tipo: 				{type: Number, required: true}
	});
	return mongoose.model('Premio', premioSchema);


};