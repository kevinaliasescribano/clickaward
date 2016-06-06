(function() {
    'use strict';

   angular.module('app')

	.directive('dirDetailBox', function(){
		return {
			restrict: 'EA',
			replace: true,
			controller: 'detailBoxController',
			templateUrl: 'shared/detailBox/detailBoxView.html'
		};
	});
}());