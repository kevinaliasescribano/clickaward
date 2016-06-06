(function(){

	function mainRoute($stateProvider){
		$stateProvider
			.state('main', {
				url: '/',
				views: {
					'main': {
						templateUrl: 'components/main/main.html',
						controller: 'mainController',
						controllerAs: 'main'
					}
				}
			});
	}

	angular.module('app').config(mainRoute);

	function otherWise($urlRouterProvider){
		$urlRouterProvider.otherwise('/');
	}

	angular.module('app').config(otherWise);

}());