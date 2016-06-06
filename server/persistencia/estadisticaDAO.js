'use strict';

//File: persistencia/estadisticaDAO.js
module.exports = function(EstadisticaModel) {

	EstadisticaModel.findAll = function(req, res){
		EstadisticaModel.find({},function(error, estadisticas){
			if(error){
				res.send('Ha surgido un error('+error+')');
			}else{
				res.json(estadisticas);
			}	
		})
	};

	EstadisticaModel.new = function(req, res){
		var estadisticaModel = new EstadisticaModel({
			sala: req.body.sala,
			usuario: req.body.usuario,
			tipoPremio: req.body.tipoPremio
		});

		estadisticaModel.save(function(error, documento){
			if(error){
				res.json(error);
			}else{
				res.send("Estadistica "+req.body.alias+" creada correctamente");
			}
		});
	};


	EstadisticaModel.update = function(req, res){
		EstadisticaModel.findById( req.params.id ,function(error, estadistica){
			if(error){
				res.send('Ha surgido un error ('+error+')');
			}else{
				Estadistica.sala 			= req.body.sala;
				Estadistica.usuario 			= req.body.usuario;
				Estadistica.tipoPremio 		= req.body.tipoPremio;

				Estadistica.save(function(error, documento){
					if(error){
						res.send("Error al intentar guardar la estadistica ("+error+")");
					}else{
						res.send("Estadistica "+req.body.alias+" editada correctamente");
					}
				});
			}	
		});
	};

	EstadisticaModel.findOneById = function(req, res){
		EstadisticaModel.findById(req.params.id ,function(error, estadistica){
			if(error){
				res.send('Ha surgido un error ('+error+')');
			}else{
				res.json(estadistica);
			}	
		})
	};

	EstadisticaModel.delete = function(req, res){
	   EstadisticaModel.remove({_id: req.params.id}, function(error){
	      if(error){
	         res.send('Error al intentar eliminar la estadistica.');
	      }else{ 
	         res.send('Estadistica eliminada correctamente.');
	      }
	   });
	};
};