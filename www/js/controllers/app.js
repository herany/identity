var AppControllerDefinition = [
	"$scope",
	"$log",
	"$ionicNavBarDelegate",
	"UserService",
	function ($scope, $log, $ionicNavBarDelegate, UserService) {
		"use strict";
		$log.info("CheckinController", arguments);

		$scope.setUser = function (user) {
			$scope._loggedInUser = user;
		};
		$scope.getUser = function (user) {
			return $scope._loggedInUser;
		};
		$scope.loggedIn = function () {
			return $scope._loggedInUser && $scope._loggedInUser.id;
		};

		$scope.getPreviousTitle = function() {
			return $ionicNavBarDelegate.getPreviousTitle();
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
