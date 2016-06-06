(function(){

	function adminRoute($stateProvider){
		$stateProvider
			.state('admin', {
				url: '/admin',
				views: {
					'main': {
						templateUrl: 'components/admin/admin.html',
						controller: 'adminController'
					}
				}
			});
	}

	angular.module('app').config(adminRoute);

}());