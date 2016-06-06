(function(){
	angular.module('app')
		.filter('rangeFilter', function() {
		    return function( elements, rangeInfo ) {
		        var elementsFiltered = [];
		        var min = parseInt(rangeInfo.valueMin);
		        var max = parseInt(rangeInfo.valueMax);

		        angular.forEach(elements, function(element) {
		            if( element.porcentaje >= min && element.porcentaje <= max ) {
		                elementsFiltered.push(element);
		            }
		        });
		        return elementsFiltered;
		    };
		});
}());