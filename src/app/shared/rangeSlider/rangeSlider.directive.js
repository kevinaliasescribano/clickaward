(function() {
    'use strict';

   angular.module('app')

	.directive('dirRangeSlider', function(){
		return {
			restrict: 'EA',
			replace: true,
			controller: 'rangeSliderController',
			templateUrl: 'shared/rangeSlider/rangeSliderView.html'
		};
	});
}());