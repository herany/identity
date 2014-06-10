var AppControllerDefinition = [
	"$scope",
	"$log",
	"$window",
	"$ionicNavBarDelegate",
	"$state",
	"UserService",
	"ModelState",
	function ($scope, $log, $window, $ionicNavBarDelegate, $state, UserService, ModelState) {
		"use strict";
		$log.info("CheckinController", arguments);

		$scope.editable = false;
		$scope.modelState = ModelState.read;

		$scope.setTitle = function (title) {
			$scope.title = title || "sprt~id";
		};
		$scope.setTitle();

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

		function gotoScanner () {
			$state.go("app.scan");
		}
		function cleanUp () {
			$window.removeEventListener("orientationchange", gotoScanner, false);
		}

		$window.addEventListener("orientationchange", gotoScanner, false);
	}
];
