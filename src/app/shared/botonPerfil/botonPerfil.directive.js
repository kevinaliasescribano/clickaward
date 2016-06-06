(function() {
    'use strict';

   angular.module('app')

	.directive('dirBotonPerfil', function(){
		return {
			restrict: 'EA',
			replace: true,
			controller: 'botonPerfilController',
			templateUrl: 'shared/botonPerfil/botonPerfil.html'
		};
	});
}());