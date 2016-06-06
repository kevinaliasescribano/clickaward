(function(){
	function accesoController($scope, $stateParams, $http, $ocLazyLoad, $location, $window){
		$scope.tipoAcceso = "login" ;
        $scope.error = '';
        $scope.login = {
            email: "",
            contrasenya: ""
        };

        $scope.registro = {
            alias: "",
            email: "",
            fechaNacimiento: null,
            contrasenya: ""
        };

		$ocLazyLoad.load('js/canvas-min.js',{cache:false});

        function mover(){
            moverGato();
            $( "#fondoMovimiento" ).animate({
                left: "800"
            }, 5000, function() {
                pararGato();
            });
        }

		$scope.irRegistro = function(){           
            $scope.tipoAcceso = "registro" ;
            $scope.error = '';
		};

		$scope.irInicioSesion = function(){
            $scope.tipoAcceso = "login" ;
            $scope.error = '';
		};

		$scope.registrarse = function(){
            $scope.error = '';
            $http({
                method: "POST",
                url: 'usuario',
                data: $scope.registro
            }).success(function(data, status, headers, config) {
                $scope.msg = data;
            }).error(function(data, status, headers, config) {
                $scope.error = data;
            });
        };

		$scope.iniciarSesion = function(){
            $scope.error = '';
            $http({
                method: "POST",
                url: 'sesion',
                data: $scope.login
            }).success(function(data, status, headers, config) {
                sessionStorage.hashUsuario = data.hashUsuario;
                $location.url("/perfil");
                $window.location.reload();
            }).error(function(data, status, headers, config) {
                $scope.error = data;
            });	
		};

        $scope.existeSesion = function(){
            return sessionStorage.getItem("hashUsuario") !== null;
        };

        if( $scope.existeSesion() ){
            $location.url("/perfil");
        }
    }

	angular.module('app')
		.controller('accesoController', accesoController);
}());
