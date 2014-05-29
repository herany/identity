;(function (APP_NAME, angular, undefined) {
	"use strict";

	angular.module(APP_NAME + ".controllers", [])
		.controller("AppController", AppControllerDefinition)
		.controller('PlaylistsCtrl', function($scope) {
			$scope.playlists = [
				{ title: 'Reggae', id: 1 },
				{ title: 'Chill', id: 2 },
				{ title: 'Dubstep', id: 3 },
				{ title: 'Indie', id: 4 },
				{ title: 'Rap', id: 5 },
				{ title: 'Cowbell', id: 6 }
			];
		})

		.controller("CheckinController", CheckinControllerDefinition)
		.controller("HomeController", ["$scope", "$log", function ($scope, $log) {
			$log.info("HomeController", arguments);
		}])
		.controller("ScanController", ScanControllerDefinition)
		.controller("UserController", UserControllerDefinition)
		// .controller("DatabitController", DatabitControllerDefinition)
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
