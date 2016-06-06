(function(){
	function adminController($scope, $http, $state){
		$http({
			method: "GET",
			url: "/estadistica"
		}).success(function(data){
			$scope.estadisticas = data;
		}).error(function(data){
			console.log(data);
		});

		$http({
			method: "GET",
			url: "/jugada"
		}).success(function(data){
			$scope.jugadas = data;
		}).error(function(data){
			console.log(data);
		});

		$http({
			method: "GET",
			url: "/premio"
		}).success(function(data){
			$scope.premios = data;
		}).error(function(data){
			console.log(data);
		});

		$http({
			method: "GET",
			url: "/sala"
		}).success(function(data){
			$scope.salas = data;
		}).error(function(data){
			console.log(data);
		});

		$http({
			method: "GET",
			url: "/sesion"
		}).success(function(data){
			$scope.sesions = data;
		}).error(function(data){
			console.log(data);
		});

		$http({
			method: "GET",
			url: "/usuario"
		}).success(function(data){
			$scope.usuarios = data;
		}).error(function(data){
			console.log(data);
		});

		$scope.removeEstadistica = function(id){
			$http({
				method: "DELETE",
				url: "/estadistica/"+id
			}).success(function(data){
				console.log(data);
				callStateReload();
			}).error(function(data){
				console.log(data);
			});
		};

		$scope.insertarEstadistica = function(){
			$http({
				method: "POST",
				url: "/estadistica",
				data: $scope.nuevaEstadistica
			}).success(function(data){
				console.log(data);
				callStateReload();
			}).error(function(data){
				console.log(data);
			});
		};

		$scope.removeJugada = function(id){
			$http({
				method: "DELETE",
				url: "/jugada/"+id
			}).success(function(data){
				console.log(data);
				callStateReload();
			}).error(function(data){
				console.log(data);
			});
		};

		$scope.insertarJugada = function(){
			$http({
				method: "POST",
				url: "/jugada",
				data: $scope.nuevaJugada
			}).success(function(data){
				console.log(data);
				callStateReload();
			}).error(function(data){
				console.log(data);
			});
		};

		$scope.removePremio = function(id){
			$http({
				method: "DELETE",
				url: "/premio/"+id
			}).success(function(data){
				console.log(data);
				callStateReload();
			}).error(function(data){
				console.log(data);
			});
		};

		$scope.insertarPremio = function(){
			$http({
				method: "POST",
				url: "/premio",
				data: $scope.nuevoPremio
			}).success(function(data){
				console.log(data);
				callStateReload();
			}).error(function(data){
				console.log(data);
			});
		};

		$scope.removeSala = function(id){
			$http({
				method: "DELETE",
				url: "/sala/"+id
			}).success(function(data){
				console.log(data);
				callStateReload();
			}).error(function(data){
				console.log(data);
			});
		};

		$scope.insertarSala = function(){
			$http({
				method: "POST",
				url: "/sala",
				data: $scope.nuevaSala
			}).success(function(data){
				console.log(data);
				callStateReload();
			}).error(function(data){
				console.log(data);
			});
		};

		$scope.removeUsuario = function(id){
			$http({
				method: "DELETE",
				url: "/usuario/"+id
			}).success(function(data){
				console.log(data);
				callStateReload();
			}).error(function(data){
				console.log(data);
			});
		};

		$scope.insertarUsuario = function(){
			$http({
				method: "POST",
				url: "/usuario",
				data: $scope.nuevoUsuario
			}).success(function(data){
				console.log(data);
				callStateReload();
			}).error(function(data){
				console.log(data);
			});
		};

		callStateReload = function(){
			$state.go($state.current, {}, {reload: true});
		}
	}

	angular.module('app')
		.controller('adminController', adminController);

}());
