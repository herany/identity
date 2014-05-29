var AppControllerDefinition = [
	"$scope",
	"$log",
	"UserService",
	function ($scope, $log, UserService) {
		"use strict";
		$log.info("CheckinController", arguments);

		$scope.setUser = function (user) {
			$scope._loggedInUser = user;
		};
		$scope.getUser = function (user) {
			return $scope._loggedInUser;
		};

		UserService.user().then(function (data, status, headers, config) {
			console.log("AppController::user (success!)", data);
			$scope.setUser(data);
		}, function (data, status, headers, config) {
			console.log("AppController::user (error)", data, status);
			$scope.setUser(null);
		});
	}
];
