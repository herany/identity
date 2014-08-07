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
			function ($scope, $log, $window, $ionicNavBarDelegate, $state, $cordovaNetwork, $cordovaSplashscreen, UserService) {
				$scope.debug = function () {
					$log.log($scope);
				};

				$scope.hasErrorMessage = function () {
					return !!$scope.getErrorMessage();
				};
				$scope.setErrorMessage = function (errorMessage) {
					$scope.errorMessage = errorMessage;
				};
				$scope.getErrorMessage = function () {
					return $scope.errorMessage;
				};
				$scope.clearErrorMessage = function () {
					$scope.errorMessage = null;
				};

				$scope.indicators = {
					offline: false,
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

				// current user will often be equal to logged in user, unless the logged in user is editing a dependant
				$scope.current = $scope.current || {};
				$scope.setCurrentUser = function (user) {
					$scope.current.user = user;
				};
				$scope.getCurrentUser = function () {
					return $scope.current.user || $scope.getLoggedInUser();
				};
				$scope.clearCurrentUser = function () {
					$scope.current.user = null;
				};

				$scope.getPreviousTitle = function() {
					return $ionicNavBarDelegate.getPreviousTitle();
				};

				function indicateOffline () {
					if (navigator.connection) {
						$scope.indicators.offline = $cordovaNetwork.isOffline();
					} else { // probably in an in-browser emulator
						$scope.indicators.offline = !navigator.onLine;
					}
				}
				indicateOffline();
				var toggleOfflineIndicator = function () {
					$scope.$apply(indicateOffline);
				};

				function gotoCheckin () {
					switch ($window.orientation) {
						case 90:
						case -90:
							$state.go("app.checkin");
							break;
						case 0:
						case 180:
							$state.go("app.home");
							break;
					}
				}
				function cleanUp () {
					$window.removeEventListener("online", toggleOfflineIndicator, false);
					$window.removeEventListener("offline", toggleOfflineIndicator, false);
					$window.removeEventListener("orientationchange", gotoCheckin, false);
				}

				$window.addEventListener("online", toggleOfflineIndicator, false);
				$window.addEventListener("offline", toggleOfflineIndicator, false);
				$window.addEventListener("orientationchange", gotoCheckin, false);

				var letsBeSmarterAboutThisSize = 0.75 * Math.min($window.innerWidth, $window.innerHeight);
				$scope.getBarcodeSize = function () {
					return letsBeSmarterAboutThisSize;
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
			}
		];
	};
})(window.SprtId);
