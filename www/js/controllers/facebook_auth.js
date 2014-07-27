// never got this working

;(function (SprtId) { "use strict";
	var Self = SprtId.Controllers.FacebookAuth = function () {
		return [
			"$rootScope",
			"$scope",
			"$log",
			"Facebook",
			function ($rootScope, $scope, $log, Facebook) {
				// Here, usually you should watch for when Facebook is ready and loaded
				$scope.$watch(function() {
					return Facebook.isReady(); // This is for convenience, to notify if Facebook is loaded and ready to go.
				}, function(newVal) {
					if (newVal) {
						$scope.facebookReady = true; // You might want to use this to disable/show/hide buttons and else
					}
				});

				/**
				 * IntentLogin
				 */
				$scope.IntentLogin = function() {
					Facebook.getLoginStatus(function(response) {
						if (response.status === "connected") {
							$scope.logged = true;
							$scope.me();
						}
						else {
							$scope.login();
						}
					});
				};

				/**
				 * Login
				 */
				 $scope.login = function() {
					 Facebook.login(function(response) {
						if (response.status === "connected") {
							$scope.logged = true;
							$scope.me();
						}
					});
				 };

				 /**
					* me
					*/
				$scope.me = function() {
					Facebook.api("/me", function(response) {
						/**
						 * Using $scope.$apply since this happens outside angular framework.
						 */
						$scope.$apply(function() {
							$scope.user = response;
						});

					});
				};

				/**
				 * Logout
				 */
				$scope.logout = function() {
					Facebook.logout(function() {
						$scope.$apply(function() {
							$scope.user   = {};
							$scope.logged = false;
						});
					});
				};

				/**
				 * Taking approach of Events :D
				 */
				$scope.$on("Facebook:statusChange", function(ev, data) {
					console.log("Status: ", data);
					if (data.status === "connected") {
						$scope.$apply(function() {
							$scope.salutation = true;
							$scope.byebye     = false;
						});
					} else {
						$scope.$apply(function() {
							$scope.salutation = false;
							$scope.byebye     = true;

							// Dismiss byebye message after two seconds
							$timeout(function() {
								$scope.byebye = false;
							}, 2000);
						});
					}
				});
			}
		];
	};
})(window.SprtId);
