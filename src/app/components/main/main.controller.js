(function(){
	function mainController($scope, $mdDialog, $http){
    $scope.rangeInfo = {
      valueMin:0,
      valueMax:100
    };

    $http({
      method: 'GET',
      url: '/sala'
    }).success(function(data){
      $scope.data = data;
      for(i=0;i<$scope.data.length;i++){
        if($scope.data[i].estado == "Activa"){
          $scope.data[i].porcentaje = $scope.data[i].clicksActuales * 100 / $scope.data[i].objetivoClicks;
        }
      }
    }).error(function(data){
      console.log(data);
    });

    $scope.relevance = {};
    
    $scope.showDialog = function(nombre) {
      for(i=0;i<$scope.data.length;i++){
        if($scope.data[i].nombre == nombre){
          salaSelected = $scope.data[i];
        }
      }
      $mdDialog.show({
        templateUrl: 'shared/detailBox/detailBoxView.html',
        locals: {selected: salaSelected},
        controller: 'detailBoxController',
        parent: angular.element( document.querySelector('.content div[ui-view]')),
        clickOutsideToClose: true,
        disableParentScroll: false,
        fullscreen: true
      });
    };

    $scope.speedDial = {mode:'md-fling', direction:'right', open:false};
    $scope.setRelevance = function(num){
      $scope.relevance = {importancia : num};
    };

	}

	angular.module('app')
		.controller('mainController', mainController);
}());
