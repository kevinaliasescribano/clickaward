'use strict';

//File: presentacion/genericController.js
module.exports = function(app, jsonParser, EstadisticaModel, JugadaModel, PremioModel, SalaModel, UsuarioModel) {
	app.get ('/generator', function(req,res){
		var models = [
			//ESTADISTICAS
			new EstadisticaModel({sala: 'Prueba1', usuario: 'Pepe', tipoPremio: 1}),
			new EstadisticaModel({sala: 'Prueba1', usuario: 'Pepo', tipoPremio: 2}),
			new EstadisticaModel({sala: 'Prueba1', usuario: 'Pepa', tipoPremio: 3}),
			new EstadisticaModel({sala: 'Prueba2', usuario: 'Pepe', tipoPremio: 1}),
			new EstadisticaModel({sala: 'Prueba2', usuario: 'Pepo', tipoPremio: 2}),
			new EstadisticaModel({sala: 'Prueba2', usuario: 'Pepa', tipoPremio: 3}),
			new EstadisticaModel({sala: 'Prueba3', usuario: 'Pepe', tipoPremio: 1}),
			new EstadisticaModel({sala: 'Prueba3', usuario: 'Pepo', tipoPremio: 2}),
			new EstadisticaModel({sala: 'Prueba3', usuario: 'Pepa', tipoPremio: 3}),
			new EstadisticaModel({sala: 'Prueba4', usuario: 'Pepe', tipoPremio: 1}),
			new EstadisticaModel({sala: 'Prueba4', usuario: 'Pepo', tipoPremio: 2}),
			new EstadisticaModel({sala: 'Prueba4', usuario: 'Pepa', tipoPremio: 3}),
			new EstadisticaModel({sala: 'Prueba5', usuario: 'Pepe', tipoPremio: 1}),
			new EstadisticaModel({sala: 'Prueba5', usuario: 'Pepo', tipoPremio: 2}),
			new EstadisticaModel({sala: 'Prueba5', usuario: 'Pepa', tipoPremio: 3}),

			//JUGADAS
			new JugadaModel({sala: 'Prueba1', jugador: 'Pepe', fechaJugada: new Date(), numeroClicks: 6}),
			new JugadaModel({sala: 'Prueba1', jugador: 'Pepe', fechaJugada: new Date(), numeroClicks: 13}),
			new JugadaModel({sala: 'Prueba1', jugador: 'Pepo', fechaJugada: new Date(), numeroClicks: 5}),
			new JugadaModel({sala: 'Prueba1', jugador: 'Pepe', fechaJugada: new Date(), numeroClicks: 10}),
			new JugadaModel({sala: 'Prueba1', jugador: 'Pepa', fechaJugada: new Date(), numeroClicks: 8}),
			new JugadaModel({sala: 'Prueba1', jugador: 'Pepo', fechaJugada: new Date(), numeroClicks: 6}),
			new JugadaModel({sala: 'Prueba1', jugador: 'Pepe', fechaJugada: new Date(), numeroClicks: 9}),
			new JugadaModel({sala: 'Prueba1', jugador: 'Pepe', fechaJugada: new Date(), numeroClicks: 8}),
			new JugadaModel({sala: 'Prueba1', jugador: 'Pepa', fechaJugada: new Date(), numeroClicks: 11}),
			new JugadaModel({sala: 'Prueba1', jugador: 'Pepe', fechaJugada: new Date(), numeroClicks: 10}),
			new JugadaModel({sala: 'Prueba1', jugador: 'Pepo', fechaJugada: new Date(), numeroClicks: 12}),
			new JugadaModel({sala: 'Prueba1', jugador: 'Pepo', fechaJugada: new Date(), numeroClicks: 9}),
			new JugadaModel({sala: 'Prueba1', jugador: 'Pepo', fechaJugada: new Date(), numeroClicks: 7}),
			new JugadaModel({sala: 'Prueba1', jugador: 'Pepe', fechaJugada: new Date(), numeroClicks: 4}),
			new JugadaModel({sala: 'Prueba1', jugador: 'Pepe', fechaJugada: new Date(), numeroClicks: 6}),
			new JugadaModel({sala: 'Prueba1', jugador: 'Pepa', fechaJugada: new Date(), numeroClicks: 5}),
			new JugadaModel({sala: 'Prueba1', jugador: 'Pepa', fechaJugada: new Date(), numeroClicks: 1}),

			//PREMIOS
			new PremioModel({sala: 'Prueba1', imagen: 'http://king-eclient.com/wp-content/uploads/repsol-logo.jpg', tipo: 1}),
			new PremioModel({sala: 'Prueba1', imagen: 'http://king-eclient.com/wp-content/uploads/repsol-logo.jpg', tipo: 2}),
			new PremioModel({sala: 'Prueba1', imagen: 'http://king-eclient.com/wp-content/uploads/repsol-logo.jpg', tipo: 3}),
			new PremioModel({sala: 'Prueba2', imagen: 'http://king-eclient.com/wp-content/uploads/repsol-logo.jpg', tipo: 1}),
			new PremioModel({sala: 'Prueba2', imagen: 'http://king-eclient.com/wp-content/uploads/repsol-logo.jpg', tipo: 2}),
			new PremioModel({sala: 'Prueba2', imagen: 'http://king-eclient.com/wp-content/uploads/repsol-logo.jpg', tipo: 3}),
			new PremioModel({sala: 'Prueba3', imagen: 'http://king-eclient.com/wp-content/uploads/repsol-logo.jpg', tipo: 1}),
			new PremioModel({sala: 'Prueba3', imagen: 'http://king-eclient.com/wp-content/uploads/repsol-logo.jpg', tipo: 2}),
			new PremioModel({sala: 'Prueba3', imagen: 'http://king-eclient.com/wp-content/uploads/repsol-logo.jpg', tipo: 3}),
			new PremioModel({sala: 'Prueba4', imagen: 'http://king-eclient.com/wp-content/uploads/repsol-logo.jpg', tipo: 1}),
			new PremioModel({sala: 'Prueba4', imagen: 'http://king-eclient.com/wp-content/uploads/repsol-logo.jpg', tipo: 2}),
			new PremioModel({sala: 'Prueba4', imagen: 'http://king-eclient.com/wp-content/uploads/repsol-logo.jpg', tipo: 3}),
			new PremioModel({sala: 'Prueba5', imagen: 'http://king-eclient.com/wp-content/uploads/repsol-logo.jpg', tipo: 1}),
			new PremioModel({sala: 'Prueba5', imagen: 'http://king-eclient.com/wp-content/uploads/repsol-logo.jpg', tipo: 2}),
			new PremioModel({sala: 'Prueba5', imagen: 'http://king-eclient.com/wp-content/uploads/repsol-logo.jpg', tipo: 3}),
		
			//SALAS
			new SalaModel({nombre: 'Prueba1', descripcion: 'Mi sala de prueba', objetivoClicks: 340, clicksActuales: 0, fechaCreacion: new Date(), estado: 'Activa', importancia: 2, imagen: 'http://king-eclient.com/wp-content/uploads/repsol-logo.jpg'}),
			new SalaModel({nombre: 'Prueba2', descripcion: 'Mi sala de prueba2', objetivoClicks: 115, clicksActuales: 0, fechaCreacion: new Date(), estado: 'Activa', importancia: 1, imagen: 'http://king-eclient.com/wp-content/uploads/repsol-logo.jpg'}),
			new SalaModel({nombre: 'Prueba3', descripcion: 'Mi sala de prueba3', objetivoClicks: 240, clicksActuales: 0, fechaCreacion: new Date(), estado: 'Activa', importancia: 1, imagen: 'http://king-eclient.com/wp-content/uploads/repsol-logo.jpg'}),
			new SalaModel({nombre: 'Prueba4', descripcion: 'Mi sala de prueba4', objetivoClicks: 200, clicksActuales: 0, fechaCreacion: new Date(), estado: 'Activa', importancia: 3, imagen: 'http://king-eclient.com/wp-content/uploads/repsol-logo.jpg'}),
			new SalaModel({nombre: 'Prueba5', descripcion: 'Mi sala de prueba5', objetivoClicks: 375, clicksActuales: 0, fechaCreacion: new Date(), estado: 'Activa', importancia: 2, imagen: 'http://king-eclient.com/wp-content/uploads/repsol-logo.jpg'}),

			//USUARIOS
			new UsuarioModel({alias: 'Pepe', email: 'pepe@pepe.pepe', contrasenya: 'pepe', icono: '', fechaNacimiento: new Date(), fechaRegistro: new Date(), cuentaActiva: true}),
			new UsuarioModel({alias: 'Pepa', email: 'pepa@pepa.pepa', contrasenya: 'pepa', icono: '', fechaNacimiento: new Date(), fechaRegistro: new Date(), cuentaActiva: true}),
			new UsuarioModel({alias: 'Pepo', email: 'pepo@pepo.pepo', contrasenya: 'pepo', icono: '', fechaNacimiento: new Date(), fechaRegistro: new Date(), cuentaActiva: true}),

		];
		
		var errors = false;

		for(var i=0;i<models.length;i++){
			models[i].save(function(error, documento){
				if(error){
					errors = true;
				}
			});
		}
		if(errors){
			res.send("Se han producido errores.")
		} else {
			res.send("Los datos se han creado correctamente.");
		}
	});	
};