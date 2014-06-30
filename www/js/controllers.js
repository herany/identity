;(function (APP_NAME, angular, undefined) {
	"use strict";

	angular.module(APP_NAME + ".controllers", [])
		.controller("AppController", AppControllerDefinition)

		.controller("CheckinController", CheckinControllerDefinition)
		.controller("HomeController", HomeControllerDefinition)
		.controller("ScanController", ScanControllerDefinition)
		.controller("UserController", UserControllerDefinition)
		.controller("BarcodeUserController", BarcodeUserControllerDefinition)
		// .controller("DatabitController", DatabitControllerDefinition)
		.controller("CreateController", ["$scope", "$log", function ($scope, $log) {
			$log.info("CreateController", arguments);
		}])
		.controller("CheckinController", CheckinControllerDefinition)
		.controller("AuthController", AuthControllerDefinition)
		.controller("LoginController", LoginAuthControllerDefinition)
		.controller("LogoutController", LogoutAuthControllerDefinition)
		.controller("SignupController", SignupAuthControllerDefinition)
		// .controller("FacebookController", FacebookAuthControllerDefinition)
		.controller("ShopController", ["$scope", "$log", function ($scope, $log) {
			$log.info("ShopController", arguments);
		}])
		.controller("SettingsController", ["$scope", "$log", function ($scope, $log) {
			$log.info("SettingsController", arguments);
		}])
		.controller("CameraController", CameraControllerDefinition)
	;
})("sprtidApp", angular);
