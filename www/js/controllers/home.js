var HomeControllerDefinition = ["$scope", "$log", function ($scope, $log) {
	"use strict";

	$log.info("Home Controller Definition", arguments);

	$scope.$parent.$watch("_loggedInUser", function(value){
		$scope.user = $scope.getLoggedInUser();
	});
	$scope.user = $scope.getLoggedInUser();
}];