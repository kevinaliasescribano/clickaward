'use strict';

//File: persistencia/salaDAO.js
module.exports = function(SalaModel) {

	SalaModel.findAll = function(req, res){
		SalaModel.find({},function(error, salas){
			if(error){
				res.send('Ha surgido un error('+error+')');
			}else{
				res.json(salas);
			}	
		})
	};

	SalaModel.new = function(req, res){
		var salaModel = new SalaModel({
			nombre: req.body.nombre,
			descripcion: req.body.descripcion,
			objetivoClicks: req.body.objetivoClicks,
			clicksActuales: req.body.clicksActuales,
			fechaCreacion: req.body.fechaCreacion,
			estado: req.body.estado,
			importancia: req.body.importancia,
			imagen: req.body.imagen
		});

		salaModel.save(function(error, documento){
			if(error){
				res.json(error);
			}else{
				res.send("Sala "+req.body.alias+" creada correctamente");
			}
		});
	};


	SalaModel.update = function(req, res){
		SalaModel.findById( req.params.id ,function(error, sala){
			if(error){
				res.send('Ha surgido un error ('+error+')');
			}else{
				sala.nombre 			= req.body.nombre;
				sala.descripcion 			= req.body.descripcion;
				sala.objetivoClicks 	= req.body.objetivoClicks;
				sala.clicksActuales 	= req.body.clicksActuales;
				Sala.fechaCreacion 			= req.body.fechaCreacion;
				Sala.estado = req.body.estado;
				sala.importancia 	= req.body.importancia;
				sala.imagen 	= req.body.imagen;

				sala.save(function(error, documento){
					if(error){
						res.send("Error al intentar guardar la sala ("+error+")");
					}else{
						res.send("Sala "+req.body.alias+" editada correctamente");
					}
				});
			}	
		});
	};

	SalaModel.updatePointsByName = function(req, res){
		SalaModel.find( {nombre: req.params.name}, function(error, sala){
			if(error){
				res.send('Ha surgido un error ('+error+')');
			}else{
				sala = sala[0];
				sala.clicksActuales += req.body.numeroClicks;
				if(req.body.estado != undefined){
					sala.estado = req.body.estado;
				}
				sala.save(function(error, documento){
					if(error){
						res.send("Error al intentar guardar la sala ("+error+")");
					}else{
						res.send("Sala actualizada correctamente");
					}
				});
			}	
		});
	};

	SalaModel.findOneByName = function(req, res){
		SalaModel.find({nombre: req.params.name} ,function(error, sala){
			if(error){
				res.send('Ha surgido un error ('+error+')');
			}else{
				res.json(sala);
			}	
		})
	};


	SalaModel.findOneById = function(req, res){
		SalaModel.findById(req.params.id ,function(error, sala){
			if(error){
				res.send('Ha surgido un error ('+error+')');
			}else{
				res.json(sala);
			}	
		})
	};

	SalaModel.delete = function(req, res){
	   SalaModel.remove({_id: req.params.id}, function(error){
	      if(error){
	         res.send('Error al intentar eliminar la sala.');
	      }else{ 
	         res.send('Sala eliminada correctamente.');
	      }
	   });
	};
};