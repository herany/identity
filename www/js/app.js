;(function (APP_NAME, angular, cordova, undefined) {
	"use strict";

	angular
		.module(APP_NAME, [
			"ngRoute",
			"ngTouch",
			APP_NAME + ".filters",
			APP_NAME + ".services",
			APP_NAME + ".factories",
			APP_NAME + ".directives",
			APP_NAME + ".controllers"
		])
		/* RoutingAccess: home-made services are not available in the config stage,
		   but thankfully it's just a class and is globally accessible */
		.config(["$locationProvider", "$routeProvider", /*"RoutingAccess",*/ function ($locationProvider, $routeProvider/*, RoutingAccess*/) {
			$locationProvider.html5Mode(false).hashPrefix('!');

			function addBoilerplateRoute (name, access, urlTokens) {
				access = access || RoutingAccess.PUBLIC;

				var url = "/" + name;
				if(urlTokens && urlTokens.length) {
					url += "/" + urlTokens.join("/");
				}

				$routeProvider.when(url, {
					templateUrl: "partials/" + name + ".html",
					controller: name.charAt(0).toUpperCase() + name.slice(1) + "Controller",
					access: access,
					bodyClassname: name + "-screen"
				});
			}

			addBoilerplateRoute("home");
			addBoilerplateRoute("login");
			addBoilerplateRoute("scan");
			addBoilerplateRoute("id", RoutingAccess.PUBLIC, [":id"]);
			addBoilerplateRoute("create");
			addBoilerplateRoute("shop");
			addBoilerplateRoute("signup");
			addBoilerplateRoute("logout");
			addBoilerplateRoute("checkin", RoutingAccess.PRIVATE);
			addBoilerplateRoute("settings", RoutingAccess.PRIVATE);

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
		.run(["$location", "$rootScope", "$log", "UserService", "RoutingAccess", function ($location, $rootScope, $log, UserService, RoutingAccess) {
			$rootScope.$on("$locationChangeStart", function () {
				$log.debug("$locationChangeStart", arguments);
			});

			$rootScope.$on("$routeChangeStart", function (event, current, previous) {
				var access = current && current.$$route ? current.$$route.access : RoutingAccess.PUBLIC;
				if (!UserService.canAccess(access)) {
					$location.path('/login').replace();
				}
			});

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

	console.log("angular setup complete");
	document.addEventListener("deviceready", function () {
		console.log("deviceready: angular setup complete");
	}, false);
	// var bootstrap = function () {
	// 	console.log("bootstrapping!");
	//	angular.bootstrap(document, [APP_NAME]);
	// };
	// if (cordova) {
	// 	if (cordova.logger) {
	// 		cordova.logger.__onDeviceReady();
	// 	}
	// 	alert("have cordova. going to wait for device ready");
	// 	document.addEventListener('deviceready', bootstrap, false);
	// } else {
	// 	alert("no cordova. let's rock.");
	// 	bootstrap();
	// }
})("sprtidApp", angular, window.cordova);

