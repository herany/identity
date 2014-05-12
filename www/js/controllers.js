;(function (APP_NAME, angular, undefined) {
	"use strict";

	angular.module(APP_NAME + ".controllers", [])
		.controller("AppController", [
			"$scope",
			"$log",
			"UserService",
			function ($scope, $log, UserService) {
				"use strict";
				$log.info("CheckinController", arguments);

				// if user has children, prompt for who is checking in

				UserService.user().then(function (data, status, headers, config) {
					console.log("CheckinController::login (success!)", data);
					$scope.user = data;
				}, function (data, status, headers, config) {
					console.log("CheckinController::login (error)", data, status);
				});
			}
		])
		.controller("HomeController", ["$scope", "$log", function ($scope, $log) {
			$log.info("HomeController", arguments);
		}])
		.controller("ScanController", ScanControllerDefinition)
		.controller("UserController", UserControllerDefinition)
		.controller("CreateController", ["$scope", "$log", function ($scope, $log) {
			$log.info("CreateController", arguments);
		}])
		.controller("CheckinController", CheckinControllerDefinition)
		.controller("AuthController", AuthControllerDefinition)
		.controller("LoginController", LoginAuthControllerDefinition)
		.controller("SignupController", SignupAuthControllerDefinition)
		.controller("FacebookController", FacebookAuthControllerDefinition)
		.controller("ShopController", ["$scope", "$log", function ($scope, $log) {
			$log.info("ShopController", arguments);
		}])
		.controller("SettingsController", ["$scope", "$log", function ($scope, $log) {
			$log.info("SettingsController", arguments);
		}])
		;
})("sprtidApp", angular);
