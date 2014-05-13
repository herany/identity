var AuthControllerDefinition = [
	"$scope",
	"$log",
	function ($scope, $log) {
		"use strict";
		$log.info("AuthController", arguments);

		$scope.success = null;
		$scope.error = "";
		$scope.view = "signup";
	}
];

var LoginAuthControllerDefinition = [
	"$rootScope",
	"$scope",
	"$log",
	"UserService",
	function ($rootScope, $scope, $log, UserService) {
		"use strict";
		$log.info("AuthController", arguments);

		$scope.username = "";
		$scope.password = "";

		// broadcast login event
		$scope.login = function () {
			UserService.login($scope.username, $scope.password).then(function () {
				$log.log("AuthController::login ($q.resolve)", arguments);
				$scope.success = true;
				$rootScope.back();
			}, function () {
				$log.log("AuthController::login ($q.reject)", arguments);
				$scope.success = false;
			}, function () {
				$log.log("AuthController::login ($q.notify)", arguments);
			});
		};
	}
];

var SignupAuthControllerDefinition = [
	"$rootScope",
	"$scope",
	"$log",
	"UserService",
	function ($rootScope, $scope, $log, UserService) {
		"use strict";
		$log.info("SignupAuthController", arguments);

		$scope.email = "";
		$scope.firstName = "";
		$scope.lastName = "";
		$scope.username = "";
		$scope.password = "";
		$scope.passwordConfirmation = "";

		// broadcast login event
		$scope.signup = function (user) {
			UserService.signup($scope.username, $scope.password, $scope.passwordConfirmation, $scope.email, $scope.firstName, $scope.lastName).then(function () {
				$log.log("AuthController::login ($q.resolve)", arguments);

				$rootScope.back();
			}, function (message) {
				$log.log("AuthController::login ($q.reject)", arguments);

				$scope.error = message;
			}, function () {
				$log.log("AuthController::login ($q.notify)", arguments);
			});
		};
	}
];
