'use strict';

//File: model/commons/utils.js
	var Utils = function(){
		this.generarEntero = function(minimo, maximo){
			return Math.floor(Math.random() * (maximo - minimo) + minimo);
		};

		this.generarString = function(longitud){
			var string 	= "",
				valores	= [	'a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p',
							'q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G',
							'H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W',
							'X','Y','Z','1','2','3','4','5','6','7','8','9','0','-','Ç','_','='];

			for(var i=0; i<longitud; i++){
				string += valores[ utils.generarEntero(0,valores.length) ];
			}
			return string;
		};

		this.prepararRespuesta = function(res, contenido, codigo, formatoJson){
			if(formatoJson){
				res.status(codigo).json(contenido);
			}else{
				res.status(codigo).send(contenido);
			}
		};
	}

	var utils = new Utils();

module.exports = utils;