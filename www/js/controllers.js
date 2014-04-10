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

			$scope.onSuccess = function (scanRespose) {
				$log.info("ScanController :: ~ctor (success)", scanRespose);

				if (scanRespose) {
					$scope.$apply(function() {
						$scope.title = "Success";
						$scope.response = JSON.stringify(scanRespose);

						$location.path(scanRespose.text.replace(/^https?:\/\/[^\/]+([^?#]*)/i, "$1")).replace();
					});
				} else {
					// todo: handle error
				}
			};

			$scope.onError = function (scanRespose) {
				$log.info("ScanController :: ~ctor (error)", scanRespose);

				$scope.$apply(function() {
					$scope.title = "Failure";
					$scope.response = JSON.stringify(scanRespose);
				});
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
		.controller("AuthController", ["$scope", "$log", function ($scope, $log) {
			$log.info("CheckinController", arguments);
		}])
		.controller("ShopController", ["$scope", "$log", function ($scope, $log) {
			$log.info("ShopController", arguments);
		}])
		.controller("SettingsController", ["$scope", "$log", function ($scope, $log) {
			$log.info("SettingsController", arguments);
		}])
		;
})("sprtidApp", angular);
