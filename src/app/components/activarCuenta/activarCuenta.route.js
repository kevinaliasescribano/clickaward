(function(){

	function activarCuentaRoute($stateProvider){
		$stateProvider
			.state('activarCuenta', {
				url: '/usuario/activacion',
				views: {
					'main': {
						templateUrl: 'components/activarCuenta/activarCuenta.html',
						controller: 'activarCuentaController',
						controllerAs: 'activarCuenta'
					}
				}
			});
	}

	angular.module('app').config(activarCuentaRoute);

}());