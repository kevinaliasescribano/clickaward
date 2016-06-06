(function(){
  'use strict';

  function rangeSliderController($scope){

    $scope.$watch('rangeInfo.valueMin', function() {
      if($scope.rangeInfo.valueMin >= $scope.rangeInfo.valueMax ){
        $scope.rangeInfo.valueMin = parseInt($scope.rangeInfo.valueMax) -1;
      }
    });

    $scope.$watch('rangeInfo.valueMax', function() {
      if($scope.rangeInfo.valueMax <= $scope.rangeInfo.valueMin ){
        $scope.rangeInfo.valueMax = parseInt($scope.rangeInfo.valueMin) +1;
      }
    });

    $scope.ajustarRango = function(valor){
      if(valor == 'min'){
        $scope.rangeInfo.valueMin = jQuery(".sld1 .md-thumb-container .md-sign span").html();
      }else if(valor == 'max'){
        $scope.rangeInfo.valueMax = jQuery(".sld2 .md-thumb-container .md-sign span").html();
      }
    };
  }
  
  angular.module('app')
    .controller('rangeSliderController', rangeSliderController);
}());