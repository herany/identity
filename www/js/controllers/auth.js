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
	"$state",
	"UserService",
	function ($rootScope, $scope, $log, $state, UserService) {
		"use strict";
		$log.info("LoginAuthController", arguments);

		$scope.auth = {
			username: "",
			password: ""
		};

		$scope.login = function () {
			$scope.ajaxing();
			UserService.login($scope.auth).then(function (user) {
				$log.log("LoginController::login ($q.resolve)", arguments);
				$scope.success = true;
				$scope.setLoggedInUser(user);
				$state.go("app.home", {}, {"location": "replace"});
				$scope.ajaxing(true);
			}, function () {
				$log.log("LoginController::login ($q.reject)", arguments);
				$scope.success = false;
				$scope.error = "Login Failed";
				$scope.setLoggedInUser(null);
				$scope.ajaxing(true);
			}, function () {
				$log.log("LoginController::login ($q.notify)", arguments);
			});
		};
	}
];

var LogoutAuthControllerDefinition = [
	"$rootScope",
	"$scope",
	"$log",
	"$state",
	"UserService",
	function ($rootScope, $scope, $log, $state, UserService) {
		"use strict";
		$log.info("LoginAuthController", arguments);

		$scope.ajaxing();
		UserService.logout().then(function () {
			$log.log("LoginController::logout ($q.resolve)", arguments);
			$scope.setLoggedInUser(null);
			$state.go("app.home", {}, {"location": "replace"});
			$scope.ajaxing(true);
		}, function () {
			$log.log("LoginController::logout ($q.reject)", arguments);
			$scope.setLoggedInUser(null);
			$state.go("app.home", {}, {"location": "replace"});
			$scope.ajaxing(true);
		}, function () {
			$log.log("LoginController::logout ($q.notify)", arguments);
		});
	}
];

var SignupAuthControllerDefinition = [
	"$rootScope",
	"$scope",
	"$log",
	"$state",
	"UserService",
	function ($rootScope, $scope, $log, $state, UserService) {
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

		$scope.signup = function () {
			$scope.ajaxing();
			UserService.signup($scope.auth).then(function () {
				$log.log("SignupController::signup ($q.resolve)", arguments);
				$scope.success = true;
				$scope.setLoggedInUser(user);
				$state.go("app.home", {}, {"location": "replace"});
				$scope.ajaxing(true);
			}, function (message) {
				$log.log("SignupController::signup ($q.reject)", arguments);
				$scope.error = message;
				$scope.setLoggedInUser(null);
				$scope.ajaxing(true);
			}, function () {
				$log.log("SignupController::signup ($q.notify)", arguments);
			});
		};
	}
];
