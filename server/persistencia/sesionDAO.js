'use strict';

//File: persistencia/sesionDAO.js
module.exports = function(SesionModel, UsuarioModel, utils) {

	SesionModel.findAll = function(req, res){
		SesionModel.find({},function(error, sesiones){
			if(error){
				utils.prepararRespuesta(res, error, 500, true);
			}else{
				utils.prepararRespuesta(res, sesiones, 200, true);
			}	
		})
	};

	SesionModel.new = function(req, res){
		var loginEmail 		 = req.body.email,
			loginContrasenya = req.body.contrasenya;

		UsuarioModel.find({email: loginEmail} ,function(error, usuario){
			usuario = usuario[0];

			if(error){
				utils.prepararRespuesta(res, error, 500, true);
			}else{

				if( (usuario != undefined) && (usuario.contrasenya == loginContrasenya) ){

					SesionModel.find({idUsuario: usuario._id} ,function(error, sesion){
						if(error){
							utils.prepararRespuesta(res, error, 500, true);
						}else{
							sesion = sesion[0]
							if(sesion != undefined){
								sesion.validez = new Date();
								sesion.save(function(error, documento){
									if(error){
										utils.prepararRespuesta(res, error, 500, true);
									}else{
										utils.prepararRespuesta(res, {'hashUsuario':sesion.hashUsuario}, 200, true);
									}
								});
							}else{
								var hash = utils.generarString( 25 );

								var sesionModel = new SesionModel({
									idUsuario	: usuario._id,
									hashUsuario	: hash,
									validez		: new Date()
								});

								sesionModel.save(function(error, documento){
									if(error){
										utils.prepararRespuesta(res, error, 500, true);
									}else{
										utils.prepararRespuesta(res, {'hashUsuario':hash}, 200, true);
									}
								});
							}
						}
					});
				}else{
					utils.prepararRespuesta(res, {'error':'El email o contraseña introducidos no son correctos.'}, 401, true);
				}
			}
		});
	};

	SesionModel.findOneByHash = function(req, res){
		console.log("c");
	};

	SesionModel.delete = function(req, res){
	   SesionModel.remove({hashUsuario: req.params.hashUsuario}, function(error){
	      if(error){
			utils.prepararRespuesta(res, error, 500, true);
	      }else{ 
	      	utils.prepararRespuesta(res, 'Sesion eliminada correctamente.', 200, false);
	      }
	   });
	};

};