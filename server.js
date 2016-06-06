'use strict';

var serverPort 	= process.env.PORT || 3000,
	http 		= require('http'),
	express 	= require('express'),
	app 		= express(),
	server 		= app.listen(serverPort),
	io 			= require('socket.io').listen(server),
	path 		= require('path'),
	mongoose 	= require('mongoose'),
	bodyParser 	= require('body-parser'),
	jsonParser = bodyParser.json();

var clicks 	= 0,
	online	= 0;
 
//Llamadas a ficheros necesarios
var utils = require('./server/dominio/commons/utils');

var SesionModel = require('./server/dominio/sesion')(mongoose);
var UsuarioModel = require('./server/dominio/usuario')(mongoose);

require('./server/persistencia/sesionDAO')(SesionModel, UsuarioModel, utils);
require('./server/presentacion/sesionController')(app, jsonParser, SesionModel);
require('./server/persistencia/usuarioDAO')(UsuarioModel, SesionModel, utils);
require('./server/presentacion/usuarioController')(app, jsonParser, UsuarioModel);

var SalaModel = require('./server/dominio/sala')(mongoose);
require('./server/persistencia/salaDAO')(SalaModel);
require('./server/presentacion/salaController')(app, jsonParser, SalaModel);

var JugadaModel = require('./server/dominio/jugada')(mongoose);
require('./server/persistencia/jugadaDAO')(JugadaModel);
require('./server/presentacion/jugadaController')(app, jsonParser, JugadaModel);

var EstadisticaModel = require('./server/dominio/estadistica')(mongoose);
require('./server/persistencia/estadisticaDAO')(EstadisticaModel);
require('./server/presentacion/estadisticaController')(app, jsonParser, EstadisticaModel);

var PremioModel = require('./server/dominio/premio')(mongoose);
require('./server/persistencia/premioDAO')(PremioModel);
require('./server/presentacion/premioController')(app, jsonParser, PremioModel);


require('./server/presentacion/genericController')(app, jsonParser, EstadisticaModel, JugadaModel, PremioModel, SalaModel, UsuarioModel);

mongoose.connect('mongodb://localhost/clickward', function(error){
   if(error){
      throw error; 
   }else{
      console.log('Conexion establecida con MongoDB');
   }
});

var rooms = [];

SalaModel.find({},function(error,salas){
	rooms = [];
	for(var sala in salas){
		rooms.push(new Room(salas[sala].nombre, salas[sala].clicksActuales, salas[sala].objetivoClicks));
	}
});

var User = function(id, room){
	this.id = id;
	this.room = room;
}

var Room = function(nombre, puntuacionActual, puntuacionTotal){
	this.nombre = nombre;
	this.puntuacionActual = puntuacionActual;
	this.puntuacionTotal = puntuacionTotal;

	this.sumarPuntos = function(puntos){
		this.puntuacionActual += puntos;
		return this.puntuacionActual > this.puntuacionTotal;
	}
}

var users = [];
	
io.on('connection', function(socket){
	
	var salaSeleccionada = undefined;

	socket.on('joinRoom', function(sala){
		socket.join(sala);
		users.push(new User(socket.id, sala));
		for(var i=0;i<rooms.length;i++){
			if(rooms[i].nombre == sala){
				salaSeleccionada = i;
				i = rooms.length;
			}
		}
	});

	socket.on('clicked', function(puntos){
		if(rooms[salaSeleccionada].sumarPuntos(puntos)){
			io.to(rooms[salaSeleccionada].nombre).emit('endGame', socket.id, rooms[salaSeleccionada].nombre);
		}
	});

	socket.on('finJugada', function(puntos){
		socket.emit('almacenarJugada', puntos, rooms[salaSeleccionada].nombre);
	});

	socket.on('disconnect', function(){
	    socket.emit('disconnected');
	});

});

app.use(express.static(path.join(__dirname, 'build')));

console.log("+------------------------------------+");
console.log("| Servidor Node JS en funcionamiento |");
console.log("+------------------------------------+");