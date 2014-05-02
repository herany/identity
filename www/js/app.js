;(function (APP_NAME, angular, cordova, undefined) {
	"use strict";

	angular
		.module(APP_NAME, [
			"ngRoute",
			"ngTouch",
			"http-auth-interceptor",
			"facebook",
			"monospaced.qrcode",
			APP_NAME + ".filters",
			APP_NAME + ".services",
			APP_NAME + ".factories",
			APP_NAME + ".directives",
			APP_NAME + ".controllers"
		])
		/* RoutingAccess: home-made services are not available in the config stage,
		   but thankfully it's just a class and is globally accessible */
		.config(["$locationProvider", "$routeProvider", "$httpProvider", "FacebookProvider", function ($locationProvider, $routeProvider, $httpProvider, FacebookProvider) {
			$locationProvider.html5Mode(false).hashPrefix('!');

			function addBoilerplateRoute (name, urlTokens) {
				var url = "/" + name;
				if(urlTokens && urlTokens.length) {
					url += "/" + urlTokens.join("/");
				}

				$routeProvider.when(url, {
					templateUrl: "partials/" + name + ".html",
					controller: name.charAt(0).toUpperCase() + name.slice(1) + "Controller",
					bodyClassname: name + "-screen"
				});
			}

			addBoilerplateRoute("home");
			addBoilerplateRoute("login");
			addBoilerplateRoute("scan");
			addBoilerplateRoute("user", [":id"]);
			addBoilerplateRoute("create");
			addBoilerplateRoute("shop");
			addBoilerplateRoute("signup");
			addBoilerplateRoute("logout");
			addBoilerplateRoute("checkin");
			addBoilerplateRoute("settings");

			$routeProvider.otherwise({
				redirectTo: "/home"
			});

			FacebookProvider.init("326477510810744");
		}])
		.run(["$window", "$location", "$rootScope", "$log", function ($window, $location, $rootScope, $log) {
			$rootScope.$on("$locationChangeStart", function () {
				$log.debug("$locationChangeStart", arguments);
			});

			$rootScope.$on("event:auth-loginRequired", function () {
				$location.path("/login");
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

