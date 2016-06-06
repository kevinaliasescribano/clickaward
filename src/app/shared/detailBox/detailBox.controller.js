(function(){
  'use strict';

  function detailBoxController($scope, $http, selected){

    $scope.selected = selected;
    $scope.ocultarPremios = true;

    $scope.masInfo = function(){
      $scope.ocultarPremios = false;
      $http({
        method: 'GET',
        url: '/premiosPorSala/'+$scope.selected.nombre
      }).success(function(data){
        $scope.premios = data.data;
      }).error(function(data){
        alert(data);
      });
    };

  }
  
  angular.module('app')
    .controller('detailBoxController', detailBoxController);
}());