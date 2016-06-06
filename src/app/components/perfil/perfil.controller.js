(function(){
	function perfilController($scope, $http, $location, $window, $mdDialog){
        $scope.obtenerUsuario = function(){
            $http({
                method: "GET",
                url: 'usuario/'+sessionStorage.hashUsuario
            }).success(function(data, status, headers, config) {
                $scope.credenciales = data;

                if($scope.credenciales.logo === undefined){
                    $scope.credenciales.logo = "/media/img/iconoUsuarioPorDefecto.png";
                }

            }).error(function(data, status, headers, config) {
                $scope.error = data;
            }); 
        };

        $scope.msg = '';


        $scope.actualizarUsuario = function(){
            $scope.msg = '';

            $http({
                method: "PUT",
                url: 'usuario/'+sessionStorage.hashUsuario,
                data: $scope.credenciales
            }).success(function(data, status, headers, config) {
                $scope.msg = data.msg;
                $scope.noEditable = true;
            }).error(function(data, status, headers, config) {
                $scope.error = data;
            }); 
        };

        $scope.mostrarOpcionesContrasenya = function() {
          $mdDialog.show({
            templateUrl: 'shared/cambiarContrasenya/cambiarContrasenya.html',
            controller: 'cambiarContrasenyaController',
            clickOutsideToClose: false,
            disableParentScroll: false,
            fullscreen: true
          });
        };

        $scope.obtenerUsuario();

        $scope.noEditable = true;

        $scope.permitirEdicion = function(){
            $scope.noEditable = false;
        };

        $scope.cerrarSesion = function(){
            $http({
                method: "DELETE",
                url: 'sesion/'+sessionStorage.hashUsuario
            }).success(function(data, status, headers, config) {
                $scope.success = data;
                $location.url("/");
                sessionStorage.clear(); 
                $window.location.reload();
            }).error(function(data, status, headers, config) {
                $scope.error = data;
            }); 
        };

        $scope.existeSesion = function(){
            return sessionStorage.getItem("hashUsuario") !== null;
        };

        if( !$scope.existeSesion() ){
                $location.url("/acceso");
        }
    }

	angular.module('app')
		.controller('perfilController', perfilController);
}());
