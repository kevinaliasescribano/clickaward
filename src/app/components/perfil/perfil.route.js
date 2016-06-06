(function(){

	function perfilRoute($stateProvider){
		$stateProvider
			.state('perfil', {
				url: '/perfil',
				views: {
					'main': {
						templateUrl: 'components/perfil/perfil.html',
						controller: 'perfilController',
						controllerAs: 'perfil'
					}
				}
			});
	}

	angular.module('app').config(perfilRoute);

}());