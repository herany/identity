var AccessLevel = {
	PUBLIC: 0x1,
	PROTECTED: 0x2,
	PRIVATE: 0x4
};

setTimeout(function() {
alert("c'mon!!");
;(function (angular, undefined) {
	"use strict";

	// Declare app level module which depends on filters, and services
	angular
		.module("sprtidApp", [
			"ngRoute",
			"ngTouch",
			"sprtidApp.factories",
			"sprtidApp.filters",
			"sprtidApp.services",
			"sprtidApp.directives",
			"sprtidApp.controllers"
		])
		.config(["$locationProvider", "$routeProvider", function($locationProvider, $routeProvider) {
			$locationProvider.html5Mode(false).hashPrefix('!');

			function addBoilerplateRoute (name, access, urlTokens) {
				access = access || AccessLevel.PUBLIC;

				var url = "/" + name;
				if(urlTokens && urlTokens.length) {
					url += "/" + urlTokens.join("/");
				}

				$routeProvider.when(url, {
					templateUrl: "/partials/" + name + ".html",
					controller: name.charAt(0).toUpperCase() + name.slice(1) + "Controller",
					access: access,
					bodyClassname: name + "-screen"
				});
			}

			addBoilerplateRoute("home");
			addBoilerplateRoute("login");
			addBoilerplateRoute("scan");
			addBoilerplateRoute("id", AccessLevel.PUBLIC, [":id"]);
			addBoilerplateRoute("create");
			addBoilerplateRoute("shop");
			addBoilerplateRoute("settings", AccessLevel.PRIVATE);

			$routeProvider.otherwise({
				redirectTo: "/home"
			});

			// $httpProvider.responseInterceptors.push(['$q', '$location', function ($q, $location) {
			// 	var success = function (response) {
			// 		return response;
			// 	};

			// 	var error = function (response) {
			// 		if (response.status === 401) {
			// 			$location.path('/login');

			// 			return $q.reject(response);
			// 		}
			// 		else {
			// 			return $q.reject(response);
			// 		}
			// 	};

			// 	return function (promise) {
			// 		return promise.then(success, error);
			// 	};
			// }]);
		}])
		// .run(["$location", "$rootScope", "$log", "UserService", function ($location, $rootScope, $log, UserService) {
		.run(["$location", "$rootScope", "$log", function ($location, $rootScope, $log) {
			$rootScope.$on("$locationChangeStart", function () {
				$log.debug("$locationChangeStart", arguments);
			});

			// $rootScope.$on("$routeChangeStart", function (event, current, previous) {
			// 	if (current.$$route !== AccessLevel.PUBLIC && !UserService.isLoggedIn()) {
			// 		// redirect back to login
			// 		$location.path('/login');
			// 	}
			// });

			$rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
				if (current && current.$$route) {
					$rootScope.bodyClassname = current.$$route.bodyClassname;
				} else {
					$rootScope.bodyClassname = "";
				}
			});

			$rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
				$log.debug("failed to change routes", arguments);
			});
		}]);

	// var bootstrap = function () {
		angular.bootstrap(document, ["sprtidApp"]);
	// };
	// angular.element(document).ready(function() {
	// 	if (window.cordova) {
	// 		document.addEventListener('deviceready', bootstrap, false);
	// 	} else {
	// 		bootstrap();
	// 	}
	// });
})(angular);

}, 5000);
