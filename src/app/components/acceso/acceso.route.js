(function(){

	function accesoRoute($stateProvider){
		$stateProvider
			.state('acceso', {
				url: '/acceso',
				views: {
					'main': {
						templateUrl: 'components/acceso/acceso.html',
						controller: 'accesoController',
						controllerAs: 'acceso'
					}
				}
			});
	}

	angular.module('app').config(accesoRoute);

}());