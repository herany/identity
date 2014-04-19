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
						$scope.gotoId();
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

			$scope.gotoId = function (e) {
				if (e) {
					e.preventDefault();
				}

				$location.path("/id/" + $scope.barcode).replace();
			};
		}])
		.controller("IdController", ["$scope", "$log", "$routeParams", "$identityFactory", function ($scope, $log, $routeParams, $identityFactory) {
			$log.info("IdController", arguments);

			$identityFactory.fetch($routeParams.id, function(success, identity) {
				$log.info("IdController :: $identityResponse.fetch", success, identity);

				$scope.identity = identity;

				// if(identityResponse.success) {
				// 	$scanDispatcher.scan(identityResponse.content);
				// }
			});
		}])
		.controller("CreateController", ["$scope", "$log", function ($scope, $log) {
			$log.info("CreateController", arguments);
		}])
		.controller("CheckinController", ["$scope", "$log", function ($scope, $log) {
			$log.info("CheckinController", arguments);
		}])
		.controller("LoginController", ["$scope", "$log", "$http", "UserService", "AccessLevel", function ($scope, $log, $http, UserService, AccessLevel) {
			$log.info("LoginController", arguments);

			$scope.success = true;
			$scope.error = "";
			$scope.username = ""; // load from local storage?
			$scope.password = "";

			$scope.login = function () {
				var config = {
					url: "http://localhost:1212/v1/auth/login",
					params: {
						username: $scope.username,
						password: $scope.password
					},
					method: "POST"
				};

				$http(config)
					.success(function (data, status, headers, config) {
						$scope.success = true;
						$scope.error = "";
						UserService.state = AccessLevel.PRIVATE;
						UserService.username = data.username;
					})
					.error(function (data, status, headers, config) {
						$scope.success = true;
						$scope.error = "";
						UserService.state = AccessLevel.PUBLIC;
						UserService.username = "";
					})
					// .done(function () {
					// 	// fire event
					// })
				;
			};
		}])
		.controller("ShopController", ["$scope", "$log", function ($scope, $log) {
			$log.info("ShopController", arguments);
		}])
		.controller("SettingsController", ["$scope", "$log", function ($scope, $log) {
			$log.info("SettingsController", arguments);
		}])
		;
})("sprtidApp", angular);
