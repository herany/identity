;(function (APP_NAME, angular, undefined) {
	"use strict";

	angular.module(APP_NAME + ".controllers", [])
		.controller("AppController", AppControllerDefinition)

		.controller("AuthController", AuthControllerDefinition)
		.controller("BarcodeUserController", BarcodeUserControllerDefinition)
		.controller("CameraController", SprtId.Controllers.Camera())
		.controller("CheckinController", CheckinControllerDefinition)
		.controller("CreateController", ["$scope", "$log", function ($scope, $log) {
			$log.info("CreateController", arguments);
		}])
		// .controller("DatabitController", DatabitControllerDefinition)
		// .controller("FacebookController", FacebookAuthControllerDefinition)
		.controller("HomeController", HomeControllerDefinition)
		.controller("LoginController", LoginAuthControllerDefinition)
		.controller("LogoutController", LogoutAuthControllerDefinition)
		.controller("ScanController", ScanControllerDefinition)
		.controller("SettingsController", ["$scope", "$log", function ($scope, $log) {
			$log.info("SettingsController", arguments);
		}])
		.controller("ShopController", ["$scope", "$log", function ($scope, $log) {
			$log.info("ShopController", arguments);
		}])
		.controller("SignupController", SignupAuthControllerDefinition)
		.controller("UserController", UserControllerDefinition)
	;
})("sprtidApp", angular);
