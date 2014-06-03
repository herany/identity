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
		$log.info("LoginAuthController", arguments);

		$scope.auth = {
			username: "",
			password: ""
		};

		// broadcast login event
		$scope.login = function () {
			UserService.login($scope.auth.username, $scope.auth.password).then(function (user) {
				$log.log("LoginController::login ($q.resolve)", arguments);
				$scope.success = true;
				$scope.setUser(user);
			}, function () {
				$log.log("LoginController::login ($q.reject)", arguments);
				$scope.success = false;
				$scope.setUser(null);
			}, function () {
				$log.log("LoginController::login ($q.notify)", arguments);
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
				$log.log("SignupController::signup ($q.resolve)", arguments);
				$scope.success = true;
				$scope.setUser(user);
				$scope.$digest();
			}, function (message) {
				$log.log("SignupController::signup ($q.reject)", arguments);
				$scope.error = message;
				$scope.setUser(null);
				$scope.$digest();
			}, function () {
				$log.log("SignupController::signup ($q.notify)", arguments);
			});
		};
	}
];
