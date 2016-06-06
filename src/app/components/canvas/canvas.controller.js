(function(){
	function canvasController($scope, $ocLazyLoad, $stateParams, $http){

		$ocLazyLoad.load('js/canvas-min.js',{cache:false});
		var socket = io.connect();

		socket.emit('joinRoom', $stateParams.sala);

		socket.on('almacenarJugada', function(puntos, sala){
			$http({
				method: 'POST',
				url: '/jugada',
				data: {sala: sala, jugador: 'asd', fechaJugada: new Date(), numeroClicks: puntos}
			}).success(function(res){
				console.log(res);
			}).error(function(res){
				console.log(res);
			});

			$http({
				method: 'PUT',
				url: '/sala/updatePointsByName/'+sala,
				data: {numeroClicks: puntos}
			}).success(function(res){
				console.log(res);
			}).error(function(res){
				console.log(res);
			});
		});

		socket.on('endGame', function(id, sala){
			$http({
				method: 'GET',
				url: '/sala/findOneByName/'+sala
			}).success(function(res){
				console.log(res);
				sala = res.data[0];
				var puntosFinales = sala.objetivoClicks - sala.clicksActuales;

				$http({
					method: 'POST',
					url: '/jugada',
					data: {sala: sala.nombre, jugador: 'asd', fechaJugada: new Date(), numeroClicks: puntosFinales}
				}).success(function(res){
					console.log(res);
				}).error(function(res){
					console.log(res);
				});

				$http({
					method: 'PUT',
					url: '/sala/updatePointsByName/'+sala.nombre,
					data: {numeroClicks: puntosFinales, estado: "Finalizada"}
				}).success(function(res){
					console.log(res);
				}).error(function(res){
					console.log(res);
				});

			}).error(function(res){
				console.log(res);
			});
		});
	
	}

	angular.module('app')
		.controller('canvasController', canvasController);
}());
