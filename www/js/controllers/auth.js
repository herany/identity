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
			UserService.login($scope.auth).then(function (user) {
				$log.log("LoginController::login ($q.resolve)", arguments);
				$scope.success = true;
				$scope.setLoggedInUser(user);
				$state.go("home");
			}, function () {
				$log.log("LoginController::login ($q.reject)", arguments);
				$scope.success = false;
				$scope.error = "Login Failed";
				$scope.setLoggedInUser(null);
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

		$scope.auth = {
			email: "",
			firstName: "",
			lastName: "",
			username: "",
			password: "",
			passwordConfirmation: ""
		};

		// broadcast login event
		$scope.signup = function () {
			UserService.signup($scope.auth).then(function () {
				$log.log("SignupController::signup ($q.resolve)", arguments);
				$scope.success = true;
				$scope.setLoggedInUser(user);
				$state.go("home");
			}, function (message) {
				$log.log("SignupController::signup ($q.reject)", arguments);
				$scope.error = message;
				$scope.setLoggedInUser(null);
			}, function () {
				$log.log("SignupController::signup ($q.notify)", arguments);
			});
		};
	}
];
