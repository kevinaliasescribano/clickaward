'use strict';

//File: presentacion/salaController.js
module.exports = function(app, jsonParser, SalaModel) {
	app.get ('/sala', SalaModel.findAll);	
	app.post('/sala',jsonParser, SalaModel.new);
	app.get ('/sala/:id', SalaModel.findOneById);
	app.put ('/sala/:id', jsonParser, SalaModel.update);
	app.delete('/sala/:id', SalaModel.delete);
	app.put('/sala/updatePointsByName/:name', jsonParser, SalaModel.updatePointsByName);
	app.get('/sala/findOneByName/:name', SalaModel.findOneByName);
};