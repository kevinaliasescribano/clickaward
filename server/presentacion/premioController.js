'use strict';

//File: presentacion/premioController.js
module.exports = function(app, jsonParser, PremioModel) {
	app.get ('/premio', PremioModel.findAll);	
	app.post('/premio',jsonParser, PremioModel.new);
	app.get ('/premio/:id', PremioModel.findOneById);
	app.put ('/premio/:id', jsonParser, PremioModel.update);
	app.delete('/premio/:id', PremioModel.delete);
	app.get('/premiosPorSala/:sala', PremioModel.getByRoom);
};