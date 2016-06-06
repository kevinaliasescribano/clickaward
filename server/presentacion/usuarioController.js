'use strict';

//File: presentacion/usuarioController.js
module.exports = function(app, jsonParser, UsuarioModel) {
	app.get ('/usuario', UsuarioModel.findAll);
	app.get ('/usuario/activar/:url', UsuarioModel.activar);	
	app.post('/usuario',jsonParser, UsuarioModel.new);
	app.get ('/usuario/:hash', UsuarioModel.findOneByHash);
	app.put ('/usuario/:hash', jsonParser, UsuarioModel.update);
	app.put ('/usuario/contrasenya/:hash', jsonParser, UsuarioModel.cambiarContrasenya);
	app.delete('/usuario/:id', UsuarioModel.delete);

	app.get('/prueba', function(req, res){
		res.status(500).send("Prueba :D");
	});
};