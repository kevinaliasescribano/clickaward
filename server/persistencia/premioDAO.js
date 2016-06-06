'use strict';

//File: persistencia/premioDAO.js
module.exports = function(PremioModel) {

	PremioModel.findAll = function(req, res){
		PremioModel.find({},function(error, premios){
			if(error){
				res.send('Ha surgido un error('+error+')');
			}else{
				res.json(premios);
			}	
		})
	};

	PremioModel.new = function(req, res){
		var premioModel = new PremioModel({
			sala: req.body.sala,
			imagen: req.body.imagen,
			tipo: req.body.tipo
		});

		premioModel.save(function(error, documento){
			if(error){
				res.json(error);
			}else{
				res.send("Premio "+req.body.alias+" creada correctamente");
			}
		});
	};


	PremioModel.update = function(req, res){
		PremioModel.findById( req.params.id ,function(error, premio){
			if(error){
				res.send('Ha surgido un error ('+error+')');
			}else{
				Premio.sala 			= req.body.sala;
				Premio.imagen 			= req.body.imagen;
				Premio.tipo 		= req.body.tipò;

				Premio.save(function(error, documento){
					if(error){
						res.send("Error al intentar guardar el premio ("+error+")");
					}else{
						res.send("Premio "+req.body.alias+" editada correctamente");
					}
				});
			}	
		});
	};

	PremioModel.findOneById = function(req, res){
		PremioModel.findById(req.params.id ,function(error, premio){
			if(error){
				res.send('Ha surgido un error ('+error+')');
			}else{
				res.json(premio);
			}	
		})
	};

	PremioModel.delete = function(req, res){
	   PremioModel.remove({_id: req.params.id}, function(error){
	      if(error){
	         res.send('Error al intentar eliminar la premio.');
	      }else{ 
	         res.send('Premio eliminada correctamente.');
	      }
	   });
	};

	PremioModel.getByRoom = function(req, res){
		PremioModel.find({sala: req.params.sala} ,function(error, premios){
			if(error){
				res.send('Ha surgido un error ('+error+')');
			}else{
				res.json(premios);
			}	
		})
	}
};