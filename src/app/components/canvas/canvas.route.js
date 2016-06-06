(function(){

	function canvasRoute($stateProvider){
		$stateProvider
			.state('canvas', {
				url: '/canvas/:sala',
				views: {
					'main': {
						templateUrl: 'components/canvas/canvas.html',
						controller: 'canvasController',
						controllerAs: 'canvas'
					}
				}
			});
	}

	angular.module('app').config(canvasRoute);
}());