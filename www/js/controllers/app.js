var AppControllerDefinition = [
	"$scope",
	"$log",
	"$ionicNavBarDelegate",
	"UserService",
	function ($scope, $log, $ionicNavBarDelegate, UserService) {
		"use strict";
		$log.info("CheckinController", arguments);

		$scope.setLoggedInUser = function (user) {
			$scope._loggedInUser = user;
		};
		$scope.getLoggedInUser = function (user) {
			return $scope._loggedInUser;
		};
		$scope.loggedIn = function () {
			return $scope._loggedInUser && $scope._loggedInUser.id;
		};

		$scope.getPreviousTitle = function() {
			return $ionicNavBarDelegate.getPreviousTitle();
		};

		UserService.user().then(function (user) {
			console.log("AppController::user (success!)", arguments);
			$scope.setLoggedInUser(user);
		}, function (error) {
			console.log("AppController::user (error)", arguments);
			$scope.setLoggedInUser(null);
		});
	}
];
