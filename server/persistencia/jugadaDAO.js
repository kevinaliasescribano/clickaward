'use strict';

//File: persistencia/jugadaDAO.js
module.exports = function(JugadaModel) {

	JugadaModel.findAll = function(req, res){
		JugadaModel.find({},function(error, jugadas){
			if(error){
				res.send('Ha surgido un error('+error+')');
			}else{
				res.json(jugadas);
			}	
		})
	};

	JugadaModel.new = function(req, res){
		var jugadaModel = new JugadaModel({
			sala: req.body.sala,
			jugador: req.body.jugador,
			fechaJugada: req.body.fechaJugada,
			numeroClicks: req.body.numeroClicks
		});

		jugadaModel.save(function(error, documento){
			if(error){
				res.json(error);
			}else{
				res.send("Jugada "+req.body.alias+" creada correctamente");
			}
		});
	};


	JugadaModel.update = function(req, res){
		JugadaModel.findById( req.params.id ,function(error, jugada){
			if(error){
				res.send('Ha surgido un error ('+error+')');
			}else{
				Jugada.sala 			= req.body.sala;
				Jugada.jugador 			= req.body.jugador;
				Jugada.fechaJugada 	= req.body.fechaJugada;
				Jugada.numeroClicks 	= req.body.numeroClicks;

				Jugada.save(function(error, documento){
					if(error){
						res.send("Error al intentar guardar la jugada ("+error+")");
					}else{
						res.send("Jugada "+req.body.alias+" editada correctamente");
					}
				});
			}	
		});
	};

	JugadaModel.findOneById = function(req, res){
		JugadaModel.findById(req.params.id ,function(error, jugada){
			if(error){
				res.send('Ha surgido un error ('+error+')');
			}else{
				res.json(jugada);
			}	
		})
	};

	JugadaModel.delete = function(req, res){
	   JugadaModel.remove({_id: req.params.id}, function(error){
	      if(error){
	         res.send('Error al intentar eliminar la sala.');
	      }else{ 
	         res.send('Jugada eliminada correctamente.');
	      }
	   });
	};
};