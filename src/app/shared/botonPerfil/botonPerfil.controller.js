(function(){
  'use strict';

  function botonPerfilController($scope){
  	$scope.sesionActiva = false;

  	$scope.existeSesion = function(){
  		$scope.sesionActiva = sessionStorage.getItem("hashUsuario") !== null;
  	};

  	$scope.existeSesion();

  }
  
  angular.module('app')
    .controller('botonPerfilController', botonPerfilController);
}());