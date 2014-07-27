;(function (SprtId) { "use strict";
	var Self = SprtId.Controllers.App = function () {
		return [
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
				$scope.debug = function () {
					$log.log($scope);
				};
				$scope.indicators = {
					ajaxing: 0
				};

				$scope.ajaxing = function (done) {
					if (done) {
						$scope.indicators.ajaxing = Math.max(0, $scope.indicators.ajaxing - 1);
					} else {
						$scope.indicators.ajaxing++;
					}
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
					$scope.title = title || "<em class='wordmark'>SPRTID</em>";
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

				$scope.ajaxing();
				UserService.user()
					.then(function (user) {
						$scope.setLoggedInUser(user);
					}, function (error) {
						$scope.setLoggedInUser(null);
					})
					.finally(function () {
						$scope.ajaxing(true);
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
	};
})(window.SprtId);
