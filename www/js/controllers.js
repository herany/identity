;(function (appName, angular, undefined) {
	"use strict";

	angular.module(appName + ".controllers", [])
		.controller("AppController", SprtId.Controllers.App())

		.controller("AuthController", SprtId.Controllers.Auth())
		.controller("BarcodeUserController", SprtId.Controllers.BarcodeUser())
		.controller("CameraController", SprtId.Controllers.Camera())
		.controller("CheckinController", SprtId.Controllers.Checkin())
		// .controller("DatabitController", SprtId.Controllers.Databit())
		// .controller("FacebookController", SprtId.Controllers.FacebookAuth())
		.controller("HomeController", SprtId.Controllers.Home())
		.controller("LoginController", SprtId.Controllers.LoginAuth())
		.controller("LogoutController", SprtId.Controllers.LogoutAuth())
		.controller("MembershipsController", SprtId.Controllers.Memberships())
		.controller("PreregisterController", SprtId.Controllers.Preregister())
		.controller("ScanController", SprtId.Controllers.Scan())
		.controller("SettingsController", ["$scope", "$log", function ($scope, $log) {
			$log.info("SettingsController", arguments);
		}])
		// .controller("ShopController", ["$scope", "$log", function ($scope, $log) {
		// 	$log.info("ShopController", arguments);
		// }])
		.controller("SignupController", SprtId.Controllers.SignupAuth())
		.controller("UserController", SprtId.Controllers.User())
	;
})(SprtId.AppName, angular);
