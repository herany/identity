var AppControllerDefinition = [
	"$scope",
	"$log",
	"$window",
	"$ionicNavBarDelegate",
	"$state",
	"$cordovaNetwork",
	"$cordovaSplashscreen",
	"UserService",
	"ModelState",
	function ($scope, $log, $window, $ionicNavBarDelegate, $state, $cordovaNetwork, $cordovaSplashscreen, UserService, ModelState) {
		"use strict";
		$log.info("CheckinController", arguments);


		$scope.debug = function () {
			$log.log($scope);
		};


		if (navigator.splashscreen) {
			$log.info("Showing Splash Screen", arguments);
			$cordovaSplashscreen.show();

			setTimeout(function () {
				$log.info("Hiding Splash Screen", arguments);
				$cordovaSplashscreen.hide();
			}, 2000);
		} else {
			$log.debug("navigator.splashscreen is undefined");
		}

		$scope.editable = false;
		$scope.modelState = ModelState.read;

		if (navigator.connection) {
			$scope.isOffline = $cordovaNetwork.isOffline();
			var toggleOfflineIndicator = function () {
				$scope.$apply(function () {
					$scope.isOffline = $cordovaNetwork.isOffline();
				});
			};
			document.addEventListener("online", toggleOfflineIndicator, false);
			document.addEventListener("offline", toggleOfflineIndicator, false);
		} else {
			$log.debug("navigator.connection is undefined");
		}

		$scope.setTitle = function (title) {
			$scope.title = title || "sprt·id";
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

		var letsBeSmarterAboutThisSize = 0.75 * Math.min($window.innerWidth, $window.innerHeight);
		$scope.getBarcodeSize = function () {
			return letsBeSmarterAboutThisSize;
		};
	}
];
