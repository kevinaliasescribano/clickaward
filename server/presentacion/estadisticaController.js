'use strict';

//File: presentacion/estadisticaController.js
module.exports = function(app, jsonParser, EstadisticaModel) {
	app.get ('/estadistica', EstadisticaModel.findAll);	
	app.post('/estadistica',jsonParser, EstadisticaModel.new);
	app.get ('/estadistica/:id', EstadisticaModel.findOneById);
	app.put ('/estadistica/:id', jsonParser, EstadisticaModel.update);
	app.delete('/estadistica/:id', EstadisticaModel.delete);
};