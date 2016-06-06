'use strict';

//File: persistencia/usuarioDAO.js
module.exports = function(UsuarioModel, SesionModel, utils) {

	UsuarioModel.findAll = function(req, res){
		UsuarioModel.find({},function(error, usuarios){
			if(error){
				utils.prepararRespuesta(res, error, 500, true);
			}else{
				utils.prepararRespuesta(res, usuarios, 200, true);
			}	
		})
	};

	UsuarioModel.activar = function(req, res){
		UsuarioModel.find({urlActivacion:req.params.url}, function(error, usuarios){
			var usuario = usuarios[0];

			if(usuario != undefined){
				usuario.cuentaActiva = true;
				usuario.urlActivacion = null;
				
				usuario.save(function(error, documento){
					if(error){
						utils.prepararRespuesta(res, error, 500, true);
					}else{
						utils.prepararRespuesta(res, {msg: "Hola "+usuario.alias+" , tu cuenta ha sido activada."}, 200, true);
					}
				});
			}else{
				utils.prepararRespuesta(res, {msg: "Ups!, la cuenta ya ha sido activada o no existe."}, 404, true);
			}
		});
	};

	UsuarioModel.cambiarContrasenya = function(req, res){
		SesionModel.find({hashUsuario: req.params.hash}, function(error, sesion){
			if(error){
				utils.prepararRespuesta(res, error, 500, true);
			}else{
				UsuarioModel.findById( sesion[0].idUsuario ,function(error, usuario){
					if(error){
						utils.prepararRespuesta(res, error, 500, true);
					}else{
						if(usuario.contrasenya == req.body.actual){
							usuario.contrasenya = req.body.nueva;

							usuario.save(function(error, documento){
								if(error){
									utils.prepararRespuesta(res, error, 500, true);
								}else{
									utils.prepararRespuesta(res, {msg: "Contraseña cambiada correctamente"}, 200, true);
								}
							});
						}else{
							utils.prepararRespuesta(res, {msg: "La contraseña actual no es correcta."}, 401, true);
						}
					}	
				});
			}
		});
	};

	UsuarioModel.new = function(req, res){

		var usuarioModel = new UsuarioModel({
			alias: req.body.alias,
			email: req.body.email,
			contrasenya: req.body.contrasenya,
			icono: null,
			fechaNacimiento: req.body.fechaNacimiento,
			fechaRegistro: new Date(),
			urlActivacion: utils.generarString( 25 ),
			cuentaActiva: false
		});

		usuarioModel.save(function(error, documento){
			if(error){
				utils.prepararRespuesta(res, error, 500, true);
			}else{
				utils.prepararRespuesta(res, {msg: "Usuario "+req.body.alias+" creado correctamente"}, 200, true);
			}
		});
	};


	UsuarioModel.update = function(req, res){
		SesionModel.find({hashUsuario: req.params.hash}, function(error, sesion){
			if(error){
				utils.prepararRespuesta(res, error, 500, true);
			}else{
				UsuarioModel.findById( sesion[0].idUsuario ,function(error, usuario){
					if(error){
						utils.prepararRespuesta(res, error, 500, true);
					}else{
						usuario.alias 			= req.body.alias;
						usuario.email 			= req.body.email;
						//usuario.icono 			= req.body.icono;

						usuario.save(function(error, documento){
							if(error){
								utils.prepararRespuesta(res, error, 500, true);
							}else{
								utils.prepararRespuesta(res, {msg: "Usuario modificado correctamente"}, 200, true);
							}
						});
					}	
				});
			}
		});

	};

	UsuarioModel.findOneByHash = function(req, res){
		SesionModel.find({hashUsuario: req.params.hash}, function(error, sesion){
			if(error){
				utils.prepararRespuesta(res, error, 500, true);
			}else{
				if(sesion != undefined){
					var id = sesion[0].idUsuario;
			
					UsuarioModel.findById(id ,function(error, usuario){
						if(error){
							utils.prepararRespuesta(res, error, 500, true);
						}else{
							utils.prepararRespuesta(res, usuario, 200, true);
						}	
					});
				}
			}	
		});
	};

	UsuarioModel.delete = function(req, res){
	   UsuarioModel.remove({_id: req.params.id}, function(error){
	      if(error){
			utils.prepararRespuesta(res, error, 500, true);
	      }else{ 
	      	utils.prepararRespuesta(res, {msg: 'Usuario eliminado correctamente.'}, 500, true);
	      }
	   });
	};
};