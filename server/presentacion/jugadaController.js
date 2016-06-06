'use strict';

//File: presentacion/jugadaController.js
module.exports = function(app, jsonParser, JugadaModel) {
	app.get ('/jugada', JugadaModel.findAll);	
	app.post('/jugada',jsonParser, JugadaModel.new);
	app.get ('/jugada/:id', JugadaModel.findOneById);
	app.put ('/jugada/:id', jsonParser, JugadaModel.update);
	app.delete('/jugada/:id', JugadaModel.delete);
};