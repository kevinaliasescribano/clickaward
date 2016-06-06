(function(){
  'use strict';

  function cambiarContrasenyaController($scope, $http, $mdDialog){
    
    $scope.cancel = function() {
	    $mdDialog.cancel();
	 };

   $scope.msg = '';

    $scope.cambiarContrasenya = function(){
      $scope.msg = '';

      $http({
        method: "PUT",
        url: 'usuario/contrasenya/'+sessionStorage.hashUsuario,
        data: $scope.contrasenya
      }).success(function(data, status, headers, config) {
          $scope.msg = data.msg;
      }).error(function(data, status, headers, config) {
          $scope.msg = data.msg;
      }); 
    };

  }
  
  angular.module('app')
    .controller('cambiarContrasenyaController', cambiarContrasenyaController);
}());