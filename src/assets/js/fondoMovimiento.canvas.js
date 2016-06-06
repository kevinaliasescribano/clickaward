$(function() {
	if(canvasExiste('#fondoMovimiento')){

		$("#fondoMovimiento").css("z-index", 3);
		var fondoMovimiento   = new Canvas('fondoMovimiento'),
			imgGatoMovimiento = new Image(),
			imgGatoSentado    = new Image(),
			gatoEnMovimiento  = false;
		
		imgGatoMovimiento.src = 'media/img/gato-movimiento-sprt.png';
		imgGatoSentado.src = 'media/img/gato-sentado.png';

		var gatoMovimiento = Sprite({
				context: fondoMovimiento.context,
				width:1346,
				height:120,
				image:imgGatoMovimiento,
				loop: 1,
				ticksPerFrame: 4,
				numberOfFrames: 8
			}),

			gatoSentado = Sprite({
				context: fondoMovimiento.context,
				width:164,
				height:120,
				image:imgGatoSentado,
				loop: 1,
				ticksPerFrame: 3,
				numberOfFrames: 1
			});

		moverGato = function(){
			if( gatoEnMovimiento === false ){
				gatoMovimiento.gameLoop();
				gatoEnMovimiento = true;
			}
		};

		pararGato = function(){
			gatoMovimiento.parar();
			gatoSentado.pintar();
		};
		
		imgGatoSentado.onload = function(){
				gatoSentado.pintar();
		};

	}
});