'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, $location) {
		$scope.search = function(zip) {
			$location.path('map/' + zip);
		}
	}

}

angular.module('pumperpalApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
