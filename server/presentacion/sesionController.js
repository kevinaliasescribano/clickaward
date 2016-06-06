'use strict';

//File: presentacion/sesionController.js
module.exports = function(app, jsonParser, SesionModel) {
	app.get ('/sesion', SesionModel.findAll);	
	app.post('/sesion',jsonParser, SesionModel.new);
	app.get ('/sesion/:hash', SesionModel.findOneByHash);
	app.delete('/sesion/:hashUsuario', SesionModel.delete);
};