;(function (APP_NAME, angular, undefined) {
	"use strict";

	angular.module(APP_NAME + ".controllers", [])
		.controller("HomeController", ["$scope", "$log", "CordovaService", function($scope, $log, CordovaService) {
			// CordovaService.ready.then(function () {
				$log.info("HomeController", arguments);
			// });
		}])
		.controller("ScanController", ["$scope", "$log", "$location", function($scope, $log, $location) {
			$log.info("ScanController", arguments);

			$scope.title = "Scanning";
			$scope.response = "";
			$scope.success = null;
			$scope.barcode = null;

			$scope.onSuccess = function (scanRespose) {
				$log.info("ScanController :: ~ctor (success)", scanRespose);

				$scope.success = !!scanRespose;
				if ($scope.success) {
					$scope.$apply(function() {
						$scope.title = "Success";
						$scope.response = JSON.stringify(scanRespose);

						$scope.barcode = scanRespose.text.replace(/^.*\/([^?#]+).*/i, "$1");
						$scope.gotoUser();
					});
				} else {
					// todo: handle error
				}
			};

			$scope.onError = function (scanRespose) {
				$log.info("ScanController :: ~ctor (error)", scanRespose);

				$scope.success = false;
				$scope.$apply(function() {
					$scope.title = "Failure";
					$scope.response = JSON.stringify(scanRespose);
				});
			};

			$scope.gotoUser = function (e) {
				if (e) {
					e.preventDefault();
				}

				$location.path("/user/" + $scope.barcode).replace();
			};
		}])
		.controller("UserController", ["$scope", "$log", "$routeParams", "$scanFactory", function ($scope, $log, $routeParams, $scanFactory) {
			$log.info("UserController", arguments);

			$scanFactory.fetchByBarcode($routeParams.id).success(function(data, status, headers, config) {
				$log.info("UserController :: $scanResponse.fetchByBarcode", data, status);

				$scope.user = data;

				// if(identityResponse.success) {
				// 	$scanDispatcher.scan(identityResponse.content);
				// }
			});
		}])
		.controller("CreateController", ["$scope", "$log", function ($scope, $log) {
			$log.info("CreateController", arguments);
		}])
		.controller("CheckinController", ["$scope", "$q", "$log", "UserService", function ($scope, $q, $log, UserService) {
			$log.info("CheckinController", arguments);

			UserService.user().success(function (data, status, headers, config) {
				console.log("CheckinController::login (success!)", data);
				$scope.user = data;
			}).error(function (data, status, headers, config) {
				console.log("CheckinController::login (error)", data, status);
			});
		}])
		.controller("LoginController", ["$scope", "$rootScope", "$q", "$log", "authService", "UserService", function ($scope, $rootScope, $q, $log, authService, UserService) {
			$log.info("LoginController", arguments);

			$scope.success = true;
			$scope.error = "";
			$scope.username = ""; // load from local storage?
			$scope.password = "";

			// broadcast login event
			$scope.login = function () {
				$q.when(UserService.login($scope.username, $scope.password)).then(function () {
					console.log("LoginController::login ($q.resolve)", arguments);
					authService.loginConfirmed();
				}, function () {
					console.log("LoginController::login ($q.reject)", arguments);
					authService.loginCancelled();
				}, function () {
					console.log("LoginController::login ($q.notify)", arguments);
				});
			};
		}])
		.controller("FacebookAuthController", ["$rootScope", "$scope", "$log", "Facebook", function ($rootScope, $scope, $log, Facebook) {
			$log.info("FacebookAuthController", arguments);

			// Here, usually you should watch for when Facebook is ready and loaded
			$scope.$watch(function() {
				return Facebook.isReady(); // This is for convenience, to notify if Facebook is loaded and ready to go.
			}, function(newVal) {
				if (newVal) {
					$scope.facebookReady = true; // You might want to use this to disable/show/hide buttons and else
				}
			});

			/**
			 * IntentLogin
			 */
			$scope.IntentLogin = function() {
				Facebook.getLoginStatus(function(response) {
					if (response.status === "connected") {
						$scope.logged = true;
						$scope.me();
					}
					else {
						$scope.login();
					}
				});
			};

			/**
			 * Login
			 */
			 $scope.login = function() {
				 Facebook.login(function(response) {
					if (response.status === "connected") {
						$scope.logged = true;
						$scope.me();
					}
				});
			 };

			 /**
				* me
				*/
			$scope.me = function() {
				Facebook.api("/me", function(response) {
					/**
					 * Using $scope.$apply since this happens outside angular framework.
					 */
					$scope.$apply(function() {
						$scope.user = response;
					});

				});
			};

			/**
			 * Logout
			 */
			$scope.logout = function() {
				Facebook.logout(function() {
					$scope.$apply(function() {
						$scope.user   = {};
						$scope.logged = false;
					});
				});
			};

			/**
			 * Taking approach of Events :D
			 */
			$scope.$on("Facebook:statusChange", function(ev, data) {
				console.log("Status: ", data);
				if (data.status === "connected") {
					$scope.$apply(function() {
						$scope.salutation = true;
						$scope.byebye     = false;
					});
				} else {
					$scope.$apply(function() {
						$scope.salutation = false;
						$scope.byebye     = true;

						// Dismiss byebye message after two seconds
						$timeout(function() {
							$scope.byebye = false;
						}, 2000);
					});
				}
			});
		}])
		.controller("ShopController", ["$scope", "$log", function ($scope, $log) {
			$log.info("ShopController", arguments);
		}])
		.controller("SettingsController", ["$scope", "$log", function ($scope, $log) {
			$log.info("SettingsController", arguments);
		}])
		;
})("sprtidApp", angular);
