$(function() {

	if( canvasExiste('#juego') ){

	    juego    = new Canvas('juego');
	    marcador = new Canvas('marcador');

		var socket = io.connect();
		var tiempo = 20; //Medido en segundos
		var tiempoRestante = tiempo;
		var iniciado = false;
		var puntuacionPersonal = 0;
	  
	    pintarPunto = function(){
	        juego.context.beginPath();
	        juego.context.arc(punto.posX, punto.posY, punto.radio, 0, 2 * Math.PI, false);
	        juego.context.fillStyle = 'black';
	        juego.context.fill();                     
	        juego.context.lineWidth = 1;              
	        juego.context.stroke();   
	    };

	    reducirPunto = function(){

	        if( punto.radio<punto.maximo ){
	            juego.limpiarCanvas();
	            punto.radio += punto.reduccion;
	            
	            if(punto.puntos > 1){
	                punto.puntos--;
	            }

	            pintarPunto();

	            requestAnimFrame(function() {
	                reducirPunto();
	            });
	        }
	    };

	    pintarJuego = function(){
	        punto = new Punto();
	        pintarPunto();
	        reducirPunto();
	    };

	    sumarPuntos = function (numero){
	        puntuacionPersonal += numero;
	        pintarPuntuacionPersonal( puntuacionPersonal );
	    };

	    puntoPulsado = function(numero){
	        sumarPuntos(numero);
	        juego.limpiarCanvas(); //Limpiamos el canvas

	        pintarJuego();
	    };

	    pintarPuntuacionPersonal = function( puntuacion ){
	        marcador.context.clearRect( 250, 0 ,marcador.ancho , 30 ); 
	        marcador.context.textAlign = 'right';
	        marcador.context.fillStyle = '#FFFFFF';         
	        marcador.context.fillText( puntuacion, marcador.ancho -70 , marcador.alto/4 ); 
	    };

	    pintarPuntuacionSala = function( puntuacion ){
	        marcador.context.clearRect( 250,43 ,marcador.ancho , 60); 
	        marcador.context.textAlign = 'right';
	        marcador.context.fillStyle = '#FFFFFF';         
	        marcador.context.fillText( puntuacion, marcador.ancho -70 , marcador.alto/2); 
	    };

	    pintarTiempoRestante = function( tiempo ){
	        marcador.context.clearRect( 250,60 ,marcador.ancho ,marcador.alto );  
	        marcador.context.textAlign = 'right';

	        if(tiempo <= 15){
	            marcador.context.fillStyle = 'red';         
	        }

	        marcador.context.fillText( tiempo, marcador.ancho -70 , (marcador.alto/4*3) ); 
	    };

	    pintarMarcador = function(){
	        marcador.context.font = '20px Calibri';          
	        marcador.context.fillStyle = '#FFFFFF';         
	        marcador.context.textAlign = 'left';
	        marcador.context.fillText('Puntuacion personal', 50, marcador.alto/4 );
	        marcador.context.fillText(':', marcador.ancho/2 -60 , marcador.alto/4 );
	        marcador.context.fillText('Puntuacion de la sala', 50, marcador.alto/2);
	        marcador.context.fillText(':', marcador.ancho/2 -60 , marcador.alto/2);
	        marcador.context.fillText('Tiempo restante', 50, (marcador.alto/4*3) );
	        marcador.context.fillText(':', marcador.ancho/2 -60 , (marcador.alto/4*3) );

	        pintarPuntuacionPersonal( puntuacionPersonal );
	        pintarPuntuacionSala(0);
	        pintarTiempoRestante("???");
	    };

	    pintarJuego();
	    pintarMarcador();

		iniciarContador = function(){
			var fechaInicial = new Date().getTime();
			iniciado = true;
			reducirTiempo(fechaInicial);
		};

		reducirTiempo = function(fechaInicial){
			var fechaActual = new Date().getTime();

			tiempoRestante = parseInt ( tiempo - ( (fechaActual-fechaInicial) / 1000) ) ;

			pintarTiempoRestante( tiempoRestante );

			if(tiempoRestante > 0){
				requestAnimFrame(function() {
					if(tiempoRestante > 0){
		        		reducirTiempo(fechaInicial);
					}
		    	});
			} else {
				socket.emit('finJugada', puntuacionPersonal);
			}

		};

		getCordenadaClick = function(evento){
			var puntoClick = {
				x : 0,
				y : 0
			};	

			if ( evento.pageX || evento.pageY ) { 
				  puntoClick.x = evento.pageX;
				  puntoClick.y = evento.pageY;
			} else { 
			  puntoClick.x = evento.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
			  puntoClick.y = evento.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
			}

			puntoClick.x -= juego.canvas.offsetLeft;
			puntoClick.y -= juego.canvas.offsetTop;

			return puntoClick;
		};

		clickSobreElPunto = function(puntoClick){
			return ( (puntoClick.x >= punto.posX - punto.radio) && (puntoClick.x <= punto.posX + punto.radio) ) && ( (puntoClick.y >= punto.posY - punto.radio) && (puntoClick.y <= punto.posY + punto.radio) );
		};

		fadeInWinner = function(jugador, alpha){
			requestAnimFrame(function(){
				if(alpha < 1){
					juego.context.fillStyle = "rgba(255,0,0,"+alpha+")";
					juego.context.fillText(jugador, juego.ancho/1.3, juego.alto/2);
					alpha = alpha + 0.0001;
					fadeInWinner(jugador, alpha);
				}
			});
		}

		$("#juego").click(function(e){
			if(tiempoRestante > 0){
				if(iniciado === false){
					iniciarContador();
				}

				var puntoClick = getCordenadaClick( e );
			
				if( clickSobreElPunto(puntoClick) ){
					socket.emit('clicked',  punto.puntos );
					puntoPulsado( punto.puntos );
				}
			}

		});

		socket.on('endGame', function(jugador, sala){
			tiempoRestante = 0;
			pintarTiempoRestante(tiempoRestante);
			juego.limpiarCanvas();
			juego.context.fillText("El ganador es ...", juego.ancho/1.5, juego.alto/2.5);
			fadeInWinner(jugador, 0);
		});

	}

});