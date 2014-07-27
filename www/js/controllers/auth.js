;(function (SprtId) { "use strict";
	var Self = SprtId.Controllers.Auth = function () {
		return [
			"$scope",
			"$log",
			function ($scope, $log) {
				$scope.success = null;
				$scope.error = "";
				$scope.view = "signup";
			}
		];
	};
})(window.SprtId);

;(function (SprtId) { "use strict";
	var Self = SprtId.Controllers.LoginAuth = function () {
		return [
			"$rootScope",
			"$scope",
			"$log",
			"$state",
			"UserService",
			function ($rootScope, $scope, $log, $state, UserService) {
				$scope.auth = {
					username: "",
					password: ""
				};

				$scope.login = function () {
					$scope.ajaxing();
					UserService.login($scope.auth)
						.then(function (user) {
							$scope.success = true;
							$scope.setLoggedInUser(user);
							$state.go("app.home", {}, {"location": "replace"});
						}, function () {
							$scope.success = false;
							$scope.error = "Login Failed";
							$scope.setLoggedInUser(null);
						})
						.finally(function () {
							$scope.ajaxing(true);
						});
				};
			}
		];
	};
})(window.SprtId);

;(function (SprtId) { "use strict";
	var Self = SprtId.Controllers.LogoutAuth = function () {
		return [
			"$rootScope",
			"$scope",
			"$log",
			"$state",
			"UserService",
			function ($rootScope, $scope, $log, $state, UserService) {
				$scope.ajaxing();
				UserService.logout()
					.then(function () {
						$scope.setLoggedInUser(null);
						$state.go("app.home", {}, {"location": "replace"});
					}, function () {
						$scope.setLoggedInUser(null);
						$state.go("app.home", {}, {"location": "replace"});
					})
					.finally(function () {
						$scope.ajaxing(true);
					});
			}
		];
	};
})(window.SprtId);

;(function (SprtId) { "use strict";
	var Self = SprtId.Controllers.SignupAuth = function () {
		return [
			"$rootScope",
			"$scope",
			"$log",
			"$state",
			"UserService",
			function ($rootScope, $scope, $log, $state, UserService) {
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
					UserService.signup($scope.auth)
						.then(function () {
							$scope.success = true;
							$scope.setLoggedInUser(user);
							$state.go("app.home", {}, {"location": "replace"});
						}, function (message) {
							$scope.error = message;
							$scope.setLoggedInUser(null);
						})
						.finally(function () {
							$scope.ajaxing(true);
						});
				};
			}
		];
	};
})(window.SprtId);
